"use client";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/user-menu";

const AdminHeader = ({ children, session }) => {
  // const session = useSession();
  const user = session.user;

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          {children} {/* Nav element */}
        </SheetContent>
      </Sheet>
      <div className="w-full flex justify-end">
        <UserMenu user={user} />
      </div>
    </header>
  );
};

export default AdminHeader;
