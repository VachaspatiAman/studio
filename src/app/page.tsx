import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <GraduationCap className="h-10 w-10 text-primary-foreground" />
            </div>
            <CardTitle className="font-headline text-4xl">LearnVerse</CardTitle>
            <CardDescription>
              Your gateway to limitless learning.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-center text-sm text-muted-foreground">
              Select your role to continue
            </p>
            <Link href="/student/dashboard" className="w-full">
              <Button className="w-full" size="lg">
                Login as Student
              </Button>
            </Link>
            <Link href="/mentor/dashboard" className="w-full">
              <Button className="w-full" variant="secondary" size="lg">
                Login as Mentor
              </Button>
            </Link>
            <Link href="/admin/dashboard" className="w-full">
              <Button className="w-full" variant="outline" size="lg">
                Login as Admin
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
