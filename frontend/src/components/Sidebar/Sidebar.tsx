"use client";

import React, { useState, useEffect } from "react";
import TitleSection from "./TitleSection";
import Option from "./Option";
import ToggleClose from "./ToggleClose";
import {
  Video,
  Newspaper,
  Boxes,
  CommandIcon,
  LayoutDashboard,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Videos");

  // Close sidebar automatically on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    handleResize(); // Set initial state based on current screen size

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.nav
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{ width: open ? "225px" : "fit-content" }}
      layout
    >
      <TitleSection open={open} />
      <div className="space-y-1">
        <Option
          Icon={LayoutDashboard}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
          route="/admin"
        />
        <Option
          Icon={Video}
          title="Videos"
          selected={selected}
          setSelected={setSelected}
          open={open}
          route="/admin/videos"
        />
        <Option
          Icon={Newspaper}
          title="Articles"
          selected={selected}
          setSelected={setSelected}
          open={open}
          route="/admin/articles"
        />
        <Option
          Icon={Boxes}
          title="Categories"
          selected={selected}
          setSelected={setSelected}
          open={open}
          route="/admin/categories"
        />
        <Option
          Icon={CommandIcon}
          title="Tools"
          selected={selected}
          setSelected={setSelected}
          open={open}
          route="/admin/tools"
        />
        {/* <Option
          Icon={UserCog2}
          title="Admins"
          selected={selected}
          setSelected={setSelected}
          open={open}
          route="/admin/managers"
        /> */}
      </div>
      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
}
