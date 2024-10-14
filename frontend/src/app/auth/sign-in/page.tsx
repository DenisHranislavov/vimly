"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login into Vimly
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Button
            className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 text-black hover:bg-gray-100"
            onClick={() => signIn("google")}
          >
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            <span>Sign in via Google</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
