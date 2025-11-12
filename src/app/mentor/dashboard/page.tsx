import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code2, Users, Star, PlusCircle, Edit, Trash2 } from "lucide-react";
import Link from 'next/link';

const statCards = [
  { title: "Courses Created", value: "12", icon: <BookOpen className="h-6 w-6 text-muted-foreground" /> },
  { title: "Problems Added", value: "45", icon: <Code2 className="h-6 w-6 text-muted-foreground" /> },
  { title: "Total Students", value: "1,204", icon: <Users className="h-6 w-6 text-muted-foreground" /> },
  { title: "Overall Rating", value: "4.8", icon: <Star className="h-6 w-6 text-muted-foreground" /> },
];

const recentCourses = [
  { title: "Advanced React Patterns", students: 152, status: "Published" },
  { title: "Python for Data Science", students: 320, status: "Published" },
  { title: "Full-Stack Web Development", students: 88, status: "Draft" },
  { title: "Introduction to Docker", students: 210, status: "Published" },
];

export default function MentorDashboardPage() {
  return (
    <DashboardLayout role="mentor">
      <div className="space-y-8">
        <header>
          <h1 className="font-headline text-4xl font-bold tracking-tight">Welcome, Dr. Smith!</h1>
          <p className="text-muted-foreground">Manage your content and track your impact.</p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map(card => (
            <Card key={card.title} className="shadow-md transition-transform hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-2xl">My Courses</CardTitle>
                <CardDescription>Here's a list of your recent courses.</CardDescription>
              </div>
              <Button asChild>
                <Link href="#">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Course
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Title</TableHead>
                    <TableHead className="hidden md:table-cell">Students</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCourses.map(course => (
                    <TableRow key={course.title} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell className="hidden md:table-cell">{course.students}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>{course.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" aria-label="Edit course"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive" aria-label="Delete course"><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
