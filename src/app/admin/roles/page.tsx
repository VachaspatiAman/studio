import { DashboardLayout } from "@/components/dashboard-layout";

export default function Page() {
  return (
    <DashboardLayout role="admin">
      <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed">
        <h1 className="font-headline text-4xl font-bold">Role Management</h1>
        <p className="text-muted-foreground">Tools for managing user roles will be displayed here.</p>
      </div>
    </DashboardLayout>
  )
}
