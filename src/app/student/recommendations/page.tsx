import { DashboardLayout } from "@/components/dashboard-layout";
import Recommendations from "@/components/recommendations";
import { Bot } from "lucide-react";

export default function RecommendationsPage() {
  return (
    <DashboardLayout role="student">
      <div className="flex flex-col gap-8">
        <header className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Bot className="h-10 w-10 text-primary" />
            </div>
            <div>
                <h1 className="font-headline text-4xl font-bold tracking-tight">AI Recommendations</h1>
                <p className="text-muted-foreground">Tell us about your interests to get personalized suggestions.</p>
            </div>
        </header>
        <Recommendations />
      </div>
    </DashboardLayout>
  );
}
