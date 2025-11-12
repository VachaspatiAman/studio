import { DashboardLayout } from "@/components/dashboard-layout";

export default function Page() {
  // A bit of a hack to show a relevant sidebar, defaults to student.
  // In a real app, you'd get the role from session.
  return (
    <DashboardLayout role="student">
      <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed">
        <h1 className="font-headline text-4xl font-bold">Settings</h1>
        <p className="text-muted-foreground">User settings and preferences will be managed here.</p>
      </div>
    </DashboardLayout>
  )
}
