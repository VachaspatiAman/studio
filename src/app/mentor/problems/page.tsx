import { DashboardLayout } from "@/components/dashboard-layout";

export default function Page() {
  return (
    <DashboardLayout role="mentor">
      <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed">
        <h1 className="font-headline text-4xl font-bold">My Problems</h1>
        <p className="text-muted-foreground">Tools for managing your coding problems will be displayed here.</p>
      </div>
    </DashboardLayout>
  )
}
