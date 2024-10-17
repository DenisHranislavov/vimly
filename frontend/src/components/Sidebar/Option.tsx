import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Option({
  Icon,
  title,
  setSelected,
  open,
  route,
}: {
  Icon: React.ComponentType;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  route: string;
}) {
  const pathname = usePathname();

  return (
    <Link href={route}>
      <motion.button
        layout
        onClick={() => setSelected(title)}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
          pathname === route
            ? "bg-indigo-100 text-black"
            : "text-slate-500 hover:bg-slate-100"
        }`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-sm font-semibold"
          >
            {title}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
}
