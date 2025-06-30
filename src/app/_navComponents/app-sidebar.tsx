"use client"

import * as React from "react"
import {
  BowArrow,
  Brain,
  Earth,
  Funnel,
  LandPlot,
  Search,
  Shield,
  Spade,
  Sword,
  Target,
} from "lucide-react"

import { NavMain } from './nav-main'
// import { NavProjects } from './nav-projects'
import { NavUser } from './nav-user'
import {TeamSwitcher}  from './team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useUser } from "@clerk/nextjs"
import { NavProjects } from "./nav-projects"

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {user } = useUser()
    const data = {
        user: {
          name: user?.fullName || user?.firstName || "Anonymous Mayan",
          email: user?.emailAddresses[0]?.emailAddress || " ",
          avatar: user?.imageUrl || "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-login-interface-abstract-blue-icon-png-image_3917504.jpg",
        },
        teams: [
          {
            name: "Prabhakar",
            logo: Shield,
            plan: "Manushya",
          },
          {
            name: "Nairavi",
            logo: Target,
            plan: "Garud",
          },
          {
            name: "Dangsa",
            logo: BowArrow,
            plan: "Vaanar",
          },
          {
            name: "Khazir",
            logo: Brain,
            plan: "Naag",
          }
        ],
        navMain: [
          {
            title: "Your Deck",
            url: "/deck",
            icon: Spade,
            items: [
              {
                title: "General",
                url: "#",
              },
              {
                title: "Team",
                url: "#",
              },
              {
                title: "Billing",
                url: "#",
              },
              {
                title: "Limits",
                url: "#",
              },
            ],
          },
          {
            title: "Action Cards",
            url: "/cards/action",
            icon: Sword,
            isActive: false,
            items: [
              {
                title: "All Cards",
                url: "#",
              },
              {
                title: "Filter",
                url: "#",
              },
              {
                title: "Settings",
                url: "#",
              },
            ],
          },
          {
            title: "Item Cards",
            url: "/cards/item",
            icon: Earth,
            items: [
              {
                title: "Genesis",
                url: "#",
              },
              {
                title: "Explorer",
                url: "#",
              },
              {
                title: "Quantum",
                url: "#",
              },
            ],
          },
          {
            title: "Arena Cards",
            url: "/cards/arena",
            icon: LandPlot,
            items: [
              {
                title: "General",
                url: "#",
              },
              {
                title: "Team",
                url: "#",
              },
              {
                title: "Billing",
                url: "#",
              },
              {
                title: "Limits",
                url: "#",
              },
            ],
          },

        ],
        projects: [
          {
            name: "Filter Cards",
            url: "/cards/filter",
            icon: Funnel,
          },
          {
            name: "Search",
            url: "/cards/search",
            icon: Search,
          },
        ],
      }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
