"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Sidebar/Logo";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";
import { fetchItems } from "@/lib/getItems";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  fetchItems();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Videos", href: "/videos" },
    { name: "Articles", href: "/articles" },
    { name: "Tools", href: "/tools" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full h-24 px-2 py-4 bg-white">
      <nav className="max-w-[1240px] h-full flex justify-between items-center mx-auto border-zinc-400 border rounded-xl shadow-xl px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Nav Links - Desktop */}
        <ul className="hidden space-x-4 md:flex">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <Button variant="ghost">{item.name}</Button>
              </Link>
            </li>
          ))}
        </ul>

        {/* Sign In Button - Desktop */}
        <div className="md:block hidden">
          {session ? (
            <ProfileMenu />
          ) : (
            <Button variant="default" onClick={() => signIn()}>
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 px-4 py-6 space-y-4 bg-white shadow-lg md:hidden top-24 rounded-b-xl">
            {navItems.map((item, index) => (
              <Link href={item.href} key={index} passHref>
                <Button
                  variant="ghost"
                  className="w-full text-left flex items-center justify-center"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            {session ? (
              <ProfileMenu />
            ) : (
              <Button variant="default" onClick={() => signIn()}>
                Sign In
              </Button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
