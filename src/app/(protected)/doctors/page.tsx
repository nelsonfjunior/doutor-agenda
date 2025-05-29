import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageHeader, PageHeaderContent, PageHeaderDescription, PageTitle } from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import AddDoctorButton from "./_components/add-doctor-buttom";

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
                Médicos
            </PageContent>
        </PageContainer>
    );
}

export default DoctorsPage;