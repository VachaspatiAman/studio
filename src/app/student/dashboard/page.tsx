import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BookOpen, Code2, Video, Users, ArrowRight, PlayCircle } from "lucide-react";
import Link from 'next/link';

export default function StudentDashboardPage() {
  const courses = PlaceHolderImages.filter(img => img.id.startsWith('course-')).slice(0, 2);
  
  return (
    <DashboardLayout role="student">
      <div className="grid gap-8">
        <header>
            <h1 className="font-headline text-4xl font-bold tracking-tight">Welcome, Alex!</h1>
            <p className="text-muted-foreground">Continue your learning journey and explore new skills.</p>
        </header>

        <section>
          <h2 className="font-headline text-2xl font-semibold mb-4">Continue Learning</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course, index) => (
              <Card key={course.id} className="overflow-hidden shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
                <div className="relative h-48 w-full">
                  <Image src={course.imageUrl} alt={course.description} fill className="object-cover" data-ai-hint={course.imageHint} />
                </div>
                <CardHeader>
                  <CardTitle>Web Development Fundamentals</CardTitle>
                  <CardDescription>By Dr. Angela Yu</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Progress value={index === 0 ? 65 : 30} className="h-2 flex-1" />
                    <span className="text-sm font-medium">{index === 0 ? 65 : 30}%</span>
                  </div>
                  <Button asChild variant="ghost" className="mt-4 w-full justify-start text-primary hover:bg-transparent">
                    <Link href="#">
                      <PlayCircle className="mr-2 h-4 w-4"/>
                      Resume Course
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-semibold mb-4">Explore</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Link href="/student/courses" className="block transition-transform hover:scale-105">
              <Card className="flex flex-col items-center justify-center p-6 text-center shadow-md transition-colors hover:bg-accent hover:text-accent-foreground h-full">
                <BookOpen className="mb-2 h-8 w-8"/>
                <span className="font-semibold">All Courses</span>
              </Card>
            </Link>
            <Link href="/student/practice" className="block transition-transform hover:scale-105">
              <Card className="flex flex-col items-center justify-center p-6 text-center shadow-md transition-colors hover:bg-accent hover:text-accent-foreground h-full">
                <Code2 className="mb-2 h-8 w-8"/>
                <span className="font-semibold">Practice</span>
              </Card>
            </Link>
            <Link href="/student/videos" className="block transition-transform hover:scale-105">
              <Card className="flex flex-col items-center justify-center p-6 text-center shadow-md transition-colors hover:bg-accent hover:text-accent-foreground h-full">
                <Video className="mb-2 h-8 w-8"/>
                <span className="font-semibold">Videos</span>
              </Card>
            </Link>
            <Link href="/student/mentors" className="block transition-transform hover:scale-105">
              <Card className="flex flex-col items-center justify-center p-6 text-center shadow-md transition-colors hover:bg-accent hover:text-accent-foreground h-full">
                <Users className="mb-2 h-8 w-8"/>
                <span className="font-semibold">Mentors</span>
              </Card>
            </Link>
          </div>
        </section>

        <section>
            <Card className="bg-primary text-primary-foreground shadow-xl">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Personalized Recommendations</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                        Get course and mentor suggestions tailored just for you by our AI.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild variant="secondary" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/student/recommendations">
                            Discover Now <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
