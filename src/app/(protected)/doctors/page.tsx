import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageHeader, PageHeaderContent, PageHeaderDescription, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddDoctorButton from "./_components/add-doctor-buttom";
import DoctorCard from "./_components/doctor-card";

const DoctorsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        redirect("/authentication")
    }
    if (!session.user.clinic) {
        redirect("/clinic-form")
    }
    const doctors = await db.query.doctorsTable.findMany({
        where: eq(doctorsTable.clinicId, session.user.clinic.id),
    });
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Médicos</PageTitle>
                    <PageHeaderDescription>
                        Gerencie os médicos da sua clínica
                    </PageHeaderDescription>
                </PageHeaderContent>
                <PageActions>
                    <AddDoctorButton />
                </PageActions>
            </PageHeader>
            <PageContent>
                <div className="grid grid-cols-3 gap-6">
                    {doctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)}
                </div>
                
            </PageContent>
        </PageContainer>
    );
}

export default DoctorsPage;