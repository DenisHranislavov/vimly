"use client";

import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";
import { fetchItems } from "@/lib/getItems";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  fetchItems();
  if (session?.user?.isAdmin) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-5">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black">403</h1>
        <h2 className="mt-4 text-2xl font-semibold text-black">
          Access Denied
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          You do not have permission to view this page.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 text-white bg-black rounded hover:bg-gray-800"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
