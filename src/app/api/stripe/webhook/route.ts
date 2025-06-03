import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Stripe secret key not found");
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    throw new Error("Stripe signature not found");
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );
  console.log("Event type:", event.type);
  console.log("Event data object:", JSON.stringify(event.data.object, null, 2));
  
  switch (event.type) {
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      
      console.log("Invoice parent:", invoice.parent);
      
      // Verificar se é um invoice de subscription
      if (!invoice.parent || invoice.parent.type !== "subscription_details") {
        console.log("Invoice is not from a subscription, skipping...");
        break;
      }
      
      const subscriptionDetails = invoice.parent.subscription_details;
      if (!subscriptionDetails) {
        throw new Error("Subscription details not found");
      }
      
      const userId = subscriptionDetails.metadata?.userId;
      if (!userId) {
        throw new Error("User ID not found in subscription metadata");
      }
      
      const subscriptionId = subscriptionDetails.subscription;
      if (!subscriptionId) {
        throw new Error("Subscription ID not found");
      }
      
      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: subscriptionId as string,
          stripeCustomerId: invoice.customer as string,
          plan: "essential",
        })
        .where(eq(usersTable.id, userId));
      break;
    }
    
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      
      if (!subscription.id) {
        throw new Error("Subscription ID not found");
      }
      
      const userId = subscription.metadata.userId;
      if (!userId) {
        throw new Error("User ID not found in subscription metadata");
      }
      
      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: null,
          stripeCustomerId: null,
          plan: null,
        })
        .where(eq(usersTable.id, userId));
      break;
    }
  }
  
  return NextResponse.json({
    received: true,
  });
};