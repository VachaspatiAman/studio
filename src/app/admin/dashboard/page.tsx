
'use client';

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Code2, Video, UserCog, PlusCircle } from "lucide-react";
import { UserSignupChart } from "@/components/user-signup-chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const initialRecentUsers = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", role: "Student", status: "Active" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", role: "Student", status: "Active" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", role: "Mentor", status: "Active" },
  { name: "William Kim", email: "will@email.com", role: "Student", status: "Inactive" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", role: "Mentor", status: "Pending" },
];

const platformStats = [
  { title: "Total Users", value: "1,482", icon: <Users className="h-6 w-6 text-muted-foreground" /> },
  { title: "Total Courses", value: "89", icon: <BookOpen className="h-6 w-6 text-muted-foreground" /> },
  { title: "Total Problems", value: "215", icon: <Code2 className="h-6 w-6 text-muted-foreground" /> },
  { title: "Active Users", value: "350", icon: <Video className="h-6 w-6 text-muted-foreground" /> },
];

export default function AdminDashboardPage() {
  const [recentUsers, setRecentUsers] = useState(initialRecentUsers);
  const [newMentorName, setNewMentorName] = useState("");
  const [newMentorEmail, setNewMentorEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMentorName && newMentorEmail) {
      if (!newMentorEmail.endsWith('.mentor@gmail.com')) {
         toast({
          variant: "destructive",
          title: "Invalid Email",
          description: "Mentor email must end with .mentor@gmail.com",
        });
        return;
      }

      const newUser = {
        name: newMentorName,
        email: newMentorEmail,
        role: "Mentor",
        status: "Pending",
      };
      setRecentUsers([newUser, ...recentUsers]);
      setNewMentorName("");
      setNewMentorEmail("");
      setIsDialogOpen(false);
      toast({
        title: "Mentor Added",
        description: `${newUser.name} has been added as a mentor.`,
      });
    }
  };


  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <header>
          <h1 className="font-headline text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Oversee and manage the LearnVerse platform.</p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {platformStats.map(card => (
            <Card key={card.title} className="shadow-md">
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-full lg:col-span-4 shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">User Sign-ups</CardTitle>
              <CardDescription>New user registrations over the last 7 months.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <UserSignupChart />
            </CardContent>
          </Card>
          <Card className="col-span-full lg:col-span-3 shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Recent Users</CardTitle>
              <CardDescription>The latest users to join the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.slice(0, 5).map(user => (
                  <div key={user.email} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} alt="Avatar" />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Badge variant={user.role === 'Mentor' ? 'default' : 'secondary'}>{user.role}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline text-2xl">User Management</CardTitle>
                <CardDescription>View and manage all users on the platform.</CardDescription>
            </div>
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Mentor
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Mentor</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new mentor. Their status will be set to 'Pending'.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddMentor}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newMentorName}
                        onChange={(e) => setNewMentorName(e.target.value)}
                        className="col-span-3"
                        placeholder="e.g. Jane Doe"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={newMentorEmail}
                        onChange={(e) => setNewMentorEmail(e.target.value)}
                        className="col-span-3"
                        placeholder="e.g. mentor@example.com"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Mentor</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map(user => (
                  <TableRow key={user.email}>
                    <TableCell>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'Mentor' ? 'default' : 'secondary'}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                       <Badge 
                        variant={user.status === 'Active' ? 'outline' : user.status === 'Pending' ? 'secondary' : 'destructive'}
                        className={user.status === 'Active' ? 'border-green-500 text-green-500' : ''}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" aria-label="Manage Role">
                        <UserCog className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
