"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser, useLogout } from "@/services/users/users";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { data, isLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  const user = data?.user;

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== "admin") {
        router.push("/");
      }
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold text-indigo-600 cursor-pointer" onClick={() => router.push('/dashboard')}>ERP Pro</div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium">
            {user ? `Hi, ${user.name}` : "Loading..."}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
