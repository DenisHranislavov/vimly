"use client";

import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import Logo from "@/components/Sidebar/Logo";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 py-10 px-5">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-4 max-w-[400px]">
          <Logo />
          <p className="text-sm leading-relaxed text-gray-700">
            Vimly is your platform to explore, create, and stay updated with the
            latest content in a wide variety of themes. Whether you're looking
            for tools, videos, or articles, Vimly has you covered.
          </p>
          <Badge variant="outline" className="self-start text-gray-900">
            Branding Since 2024
          </Badge>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold text-gray-800">
            Quick Navigation
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="/videos" className="hover:underline text-gray-700">
                Videos
              </a>
            </li>
            <li>
              <a href="/articles" className="hover:underline text-gray-700">
                Articles
              </a>
            </li>
            <li>
              <a href="/tools" className="hover:underline text-gray-700">
                Tools
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline text-gray-700">
                About Us
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold text-gray-800">Useful Links</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/privacy"
                className="hover:underline text-gray-700"
                target="_blank"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/tos"
                className="hover:underline text-gray-700"
                target="_blank"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 max-w-[300px]">
          <h4 className="text-lg font-semibold text-gray-800">
            Subscribe to Our Newsletter
          </h4>
          <p className="text-sm text-gray-700">
            Stay updated with the latest content and exclusive offers from
            Vimly.
          </p>
          <div className="flex gap-2">
            <Input placeholder="Enter your email" className="border-gray-300" />
            <Button variant="default" className="bg-gray-900 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-8 bg-gray-300" />

      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Vimly. All rights reserved.</p>
        <p className="mt-4 md:mt-0">
          Designed & Built by{" "}
          <a
            href="https://discord.gg/jkgBzeUKhD"
            className="underline text-gray-700"
            target="_blank"
          >
            Denis Hranislavov - Nebula Dev
          </a>
        </p>
      </div>
    </footer>
  );
}
