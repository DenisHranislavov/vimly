import React from "react";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const ProfileMenu = () => {
  const { data: session } = useSession();

  return (
    <div className="relative">
      {/* Profile picture and toggle button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center cursor-pointer">
            <img
              src={session?.user?.image || "/dui.jpg"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <ChevronDown className="ml-2 transition-transform duration-200" />
          </div>
        </DropdownMenuTrigger>

        {/* Dropdown Menu */}
        <DropdownMenuContent className="mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {session?.user?.isAdmin && (
            <Link
              href="/admin"
              className="flex items-center hover:bg-gray-100 transition-colors duration-150"
            >
              <DropdownMenuItem className="">
                <User className="w-5 h-5 mr-2 text-gray-700" />
                <span className="text-sm font-semibold">Dashboard</span>
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuItem
            className="flex items-center p-2 text-red-500 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span className="text-sm font-semibold">Logout</span>
          </DropdownMenuItem>

          {/* Protected by Nebula Dev */}
          <div className="px-4 py-2 border-t border-gray-200 text-center text-xs text-gray-500">
            <span>Protected by Nebula Dev</span>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileMenu;
