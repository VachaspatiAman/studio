"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.endsWith('.admin@gmail.com')) {
      router.push('/admin/dashboard');
    } else if (email.endsWith('.mentor@gmail.com')) {
      router.push('/mentor/dashboard');
    } else {
      router.push('/student/dashboard');
    }
  };

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
          <CardContent>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Login
              </Button>
            </form>
             <p className="mt-4 text-center text-xs text-muted-foreground">
                Use an email ending in <code className="font-semibold text-foreground">.mentor@gmail.com</code> for a mentor, <code className="font-semibold text-foreground">.admin@gmail.com</code> for an admin, or any other email for a student.
              </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
