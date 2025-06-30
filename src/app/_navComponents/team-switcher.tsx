"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()  
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTeam = JSON.parse(sessionStorage.getItem("activeTeam") as string)
      if (storedTeam && storedTeam.name !== activeTeam.name) {
        const foundTeam = teams.find(team => team.name === storedTeam.name)
        if (foundTeam) {
          setActiveTeam(foundTeam)
        }
      }
    }
  }, [activeTeam, teams])
  if (!activeTeam) {
    return null
  }

  

  function handleTeamChange(nteam:{name:string, logo:React.ElementType, plan:string}) {
    const storedTeam = JSON.parse(sessionStorage.getItem("activeTeam") as string)
    if (storedTeam) {
      //set session storage to the active team
      const foundTeam = teams.find(team => team.name === nteam.name)
      if (foundTeam) {
        sessionStorage.setItem(
          "activeTeam",
          JSON.stringify(foundTeam)
        )
        setActiveTeam(foundTeam)
        window.location.reload()
      }
    } else {
      sessionStorage.setItem(
        "activeTeam",
        JSON.stringify(nteam)
      )
      setActiveTeam(nteam)

    }
  }

  

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-600 text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Characters
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => handleTeamChange(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border bg-primary">
                  <team.logo className="size-4 shrink-0 text-white" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
