import { Plus } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PageActions, PageContainer, PageContent, PageHeader, PageHeaderContent, PageHeaderDescription, PageTitle } from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

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
                    <Button><Plus />Adicioanr médico</Button>
                </PageActions>
            </PageHeader>
            <PageContent>
                Médicos
            </PageContent>
        </PageContainer>
    );
}

export default DoctorsPage;