export const PageContainer = ({ children }: { children: React.ReactNode }) => {
    return <div className="p-6 space-y-6 w-full">{children}</div>
}

export const PageHeader = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex items-center justify-between w-full">{children}</div>
}

export const PageHeaderContent = ({ children }: { children: React.ReactNode }) => {
    return <div className="text 2xl font-bold w-full">{children}</div>
}

export const PageTitle = ({ children }: { children: React.ReactNode }) => {
    return <h1 className="text-2xl font-bold">{children}</h1>
}

export const PageHeaderDescription = ({ children }: { children: React.ReactNode }) => {
    return <p className="text-sm text-muted-foreground">{children}</p>
}

export const PageActions = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex items-center gap-2">{children}</div>
}

export const PageContent = ({ children }: { children: React.ReactNode }) => {
    return <div className="space-y-6">{children}</div>
}