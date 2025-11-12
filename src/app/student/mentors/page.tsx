import { DashboardLayout } from "@/components/dashboard-layout";

export default function Page() {
  return (
    <DashboardLayout role="student">
      <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed">
        <h1 className="font-headline text-4xl font-bold">Mentors</h1>
        <p className="text-muted-foreground">Find and book sessions with mentors.</p>
      </div>
    </DashboardLayout>
  )
}
