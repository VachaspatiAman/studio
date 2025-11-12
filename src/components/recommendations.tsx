"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getPersonalizedRecommendations } from "@/ai/flows/personalized-recommendations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const recommendationsSchema = z.object({
  studentId: z.string().default("student-001"),
  learningHistory: z.string().min(20, { message: "Please describe your learning history in at least 20 characters." }),
  preferences: z.string().min(20, { message: "Please describe your preferences in at least 20 characters." }),
});

type RecommendationsForm = z.infer<typeof recommendationsSchema>;

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<{ recommendedCourses: string; recommendedMentors: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RecommendationsForm>({
    resolver: zodResolver(recommendationsSchema),
    defaultValues: {
      studentId: "student-001",
      learningHistory: "Completed courses on basic Python and data structures. Familiar with web development concepts like HTML, CSS, and basic JavaScript.",
      preferences: "Interested in machine learning, AI, and backend development. Prefer hands-on projects and video tutorials.",
    },
  });

  const onSubmit = async (data: RecommendationsForm) => {
    setIsLoading(true);
    setRecommendations(null);

    try {
      const result = await getPersonalizedRecommendations(data);
      setRecommendations(result);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get recommendations. Please try again later.",
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Your Learning Profile</CardTitle>
          <CardDescription>Fill in your details below to get tailored recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="learningHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning History</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Completed courses on Python, Web Development..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests & Preferences</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Interested in AI, prefer project-based learning..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles className="mr-2 h-4 w-4" /> Get Recommendations</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
        {isLoading && (
          <div className="flex flex-col items-center gap-4 text-muted-foreground animate-in fade-in-50">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="font-semibold">Our AI is crafting your recommendations...</p>
            <p className="text-sm text-center">This might take a moment.</p>
          </div>
        )}
        
        {recommendations && (
          <Card className="w-full shadow-lg animate-in fade-in-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sparkles className="text-accent"/> AI-Powered Suggestions</CardTitle>
              <CardDescription>Here are some recommendations based on your profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm">
              <div>
                <h3 className="font-headline text-lg font-semibold mb-2">Recommended Courses</h3>
                <div className="whitespace-pre-wrap rounded-md bg-muted/50 p-4 text-muted-foreground">{recommendations.recommendedCourses}</div>
              </div>
              <div>
                <h3 className="font-headline text-lg font-semibold mb-2">Recommended Mentors</h3>
                <div className="whitespace-pre-wrap rounded-md bg-muted/50 p-4 text-muted-foreground">{recommendations.recommendedMentors}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {!isLoading && !recommendations && (
           <div className="flex flex-col items-center gap-4 text-center text-muted-foreground">
             <Sparkles className="h-12 w-12" />
             <p className="font-semibold">Your recommendations will appear here.</p>
           </div>
        )}
      </div>
    </div>
  );
}
