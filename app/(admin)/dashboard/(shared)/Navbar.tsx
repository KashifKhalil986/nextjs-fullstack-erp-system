"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { logout } from "@/app/(auth)/logout/logout";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navbar */}
      <header className="sticky top-4 z-50 mb-6">
        <div
          className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
            scrolled
              ? "border-zinc-200/50 bg-white/80 shadow-lg backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80"
              : "border-white/20 bg-white/60 backdrop-blur-lg dark:bg-zinc-950/60"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logo.png"
                alt="AlphaBuilt"
                width={160}
                height={40}
                className="h-10 w-auto"
                priority
              />

              <div className="hidden sm:block">
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Admin Dashboard
                </h2>

                <p className="text-xs text-slate-500">AlphaBuilt Studio</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-4 md:flex">
              <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                <LayoutDashboard size={18} />
                <span className="text-sm font-medium">Dashboard</span>
              </div>

              <form action={logout}>
                <Button
                  type="submit"
                  className="cursor-pointer rounded-full bg-red-500 px-5 text-black hover:bg-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </form>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 md:hidden dark:bg-zinc-800"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-80 bg-white shadow-2xl transition-transform duration-300 dark:bg-zinc-950 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b p-6 dark:border-zinc-800">
          <Image
            src="/assets/logo.png"
            alt="AlphaBuilt"
            width={150}
            height={40}
            className="h-10 w-auto"
          />

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-3 rounded-xl bg-zinc-100 p-4 dark:bg-zinc-800">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </div>

          <form action={logout}>
            <Button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-red-500 text-black hover:bg-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
