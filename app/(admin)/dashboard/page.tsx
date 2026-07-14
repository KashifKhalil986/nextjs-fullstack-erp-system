import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/app/lib/db";
import {
  MailIcon,
  UsersIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ view?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { view } = await searchParams;
  const showMessages = view === "messages";

  // Always fetch stats for the welcome view; only fetch list for the messages view
  const [totalContacts, latestContact] = await Promise.all([
    prisma.contact.count(),
    prisma.contact.findFirst({ orderBy: { createdAt: "desc" } }),
  ]);

  const contacts = showMessages
    ? await prisma.contact.findMany({ orderBy: { createdAt: "desc" } })
    : [];

  const serializedContacts = contacts.map((contact) => ({
    ...contact,
    createdAt: contact.createdAt.toISOString(),
  }));

  const latestDate = latestContact
    ? new Date(latestContact.createdAt).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="w-full">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                {showMessages ? (
                  /* ── Message Table View ── */
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-4 lg:px-6">
                      <h1 className="text-2xl font-bold tracking-tight">
                        Contact Submissions
                      </h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Manage and review all messages sent through the contact
                        form.
                      </p>
                    </div>
                    <DataTable data={serializedContacts} />
                  </div>
                ) : (
                  /* ── Welcome View ── */
                  <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-6 lg:p-8">
                    {/* Hero Banner */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-primary/70 p-8 text-primary-foreground shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy)] via-[#0b244d] to-[var(--blue-dark)]" />
                      <div className="relative z-10">
                        <p className="text-sm font-medium uppercase  opacity-80 mb-2">
                          Admin Panel
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
                          Welcome back, Admin!
                        </h1>
                        <p className="text-primary-foreground/80 max-w-lg text-base">
                          Here's what's happening with Alphabuilt today. Manage
                          your contact submissions and keep track of incoming
                          messages.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <Link
                            href="/dashboard?view=messages"
                            className="inline-flex items-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 text-sm transition-all duration-200 border border-white/20 hover:border-white/40"
                          >
                            <MailIcon className="size-4" />
                            View Messages
                            <ArrowRightIcon className="size-3.5" />
                          </Link>
                        </div>
                      </div>
                      {/* decorative circles */}
                      <div className="absolute -right-16 -top-16 size-64 rounded-full bg-white/5 blur-2xl" />
                      <div className="absolute -bottom-10 -right-8 size-48 rounded-full bg-white/5 blur-xl" />
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {/* Total Submissions */}
                      <Card className="transition-shadow hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Submissions
                          </CardTitle>
                          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                            <MailIcon className="size-4 text-primary" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl text-slate-800 tracking-tight">
                            {totalContacts}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Contact form messages received
                          </p>
                        </CardContent>
                      </Card>

                      {/* Latest Submission */}
                      <Card className="transition-shadow hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Latest Submission
                          </CardTitle>
                          <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10">
                            <CalendarIcon className="size-4 text-amber-600 dark:text-amber-400" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          {latestContact ? (
                            <>
                              <div className="text-lg text-slate-800 tracking-tight truncate">
                                {latestContact.name}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {latestDate}
                              </p>
                            </>
                          ) : (
                            <>
                              <div className="text-lg font-bold text-muted-foreground">
                                No submissions yet
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Awaiting first contact message
                              </p>
                            </>
                          )}
                        </CardContent>
                      </Card>

                      {/* Quick Action */}
                      <Card className="transition-shadow hover:shadow-md sm:col-span-2 lg:col-span-1">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Quick Actions
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                          <Link
                            href="/dashboard?view=messages"
                            className="group flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3 hover:bg-muted transition-colors text-sm font-medium"
                          >
                            <span className="flex items-center gap-2">
                              <MailIcon className="size-4 text-muted-foreground" />
                              Browse all messages
                            </span>
                            <ArrowRightIcon className="size-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                          <Link
                            href="/"
                            target="_blank"
                            className="group flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3 hover:bg-muted transition-colors text-sm font-medium"
                          >
                            <span className="flex items-center gap-2">
                              <UsersIcon className="size-4 text-muted-foreground" />
                              Visit public site
                            </span>
                            <ArrowRightIcon className="size-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
