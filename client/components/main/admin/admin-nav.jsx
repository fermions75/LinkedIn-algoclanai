"use client";

import {
  Airplay,
  AtomIcon,
  Blocks,
  GalleryVerticalIcon,
  Home,
  ListIcon,
  NetworkIcon,
  SettingsIcon,
  TrainTrack,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const dashboardLinks = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Personas", href: `/dashboard/personas`, icon: Blocks },
  { name: "Prompts", href: `/dashboard/prompts`, icon: Airplay },
  { name: "Add Persona", href: "/dashboard/personas/create", icon: ListIcon },
  { name: "Tracking", href: "/dashboard/tracking", icon: TrainTrack },
  { name: "Reddit", href: "/dashboard/reddit", icon: NetworkIcon },
  { name: "AI Playground", href: "/dashboard/playground", icon: AtomIcon },
  {
    name: "Subscription",
    href: "/dashboard/subscription",
    icon: GalleryVerticalIcon,
  },
  // { name: "Account Settings", href: "/auth/settings", icon: SettingsIcon },
];

const portalLinks = [
  { name: "Portal", href: "/admin", icon: Home },
  { name: "Restaurants", href: "/admin/playground", icon: ListIcon },
  // { name: "Account Settings", href: "/auth/settings", icon: SettingsIcon },
];

const AdminNav = ({ admin }) => {
  const path = usePathname();
  const links = admin ? portalLinks : dashboardLinks;
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {links.map((link, index) => {
        let isActive = link.href === path;

        return (
          <Link
            key={index}
            href={link.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary
                ${
                  isActive ? "bg-muted text-primary" : "text-muted-foreground "
                }`}
          >
            <link.icon className="h-4 w-4" />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default AdminNav;
