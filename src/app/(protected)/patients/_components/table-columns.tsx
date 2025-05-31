"use client"

import { ColumnDef } from "@tanstack/react-table";

import { patientsTable } from "@/db/schema";

import PatientsTableActions from "./table-actions";

type Patient = typeof patientsTable.$inferSelect;

export const patientsDataColumns: ColumnDef<Patient>[] = [
    {
        id: "name",
        accessorKey: "name",
        header: "Nema",
    },
    {
        id: "email",
        accessorKey: "email",
        header: "Email",
    },
    {
        id: "phoneNumber",
        accessorKey: "phoneNumber",
        header: "Telefone",
        cell: (params) => {
            const phone = params.row.original.phoneNumber;
            return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
    },
    {
        id: "sex",
        accessorKey: "sex",
        header: "Sexo",
        cell: (params) => {
            const patient = params.row.original;
            return patient.sex === "male" ? "Masculino" : "Feminino";;
        }
    },
    {
        id: "actions",
        cell: (params) => {
            const patient = params.row.original;
            return <PatientsTableActions patient={patient} />;
        }
    }
]