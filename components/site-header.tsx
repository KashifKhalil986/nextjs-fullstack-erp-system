import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-(--header-height) w-full max-w-7xl items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="mx-2 h-4" />

        <h1 className="text-muted-foreground">Contact Messages Details</h1>
      </div>
    </header>
  );
}
