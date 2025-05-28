import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageActions, PageContainer, PageContent, PageHeader, PageHeaderContent, PageHeaderDescription, PageTitle } from "@/components/ui/page-container";

const DoctorsPage = () => {
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