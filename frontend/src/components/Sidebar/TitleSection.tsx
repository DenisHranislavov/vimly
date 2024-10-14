import React from "react";
import Logo from "./Logo";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TitleSection({ open }: { open: boolean }) {
  return (
    <div className="mb-3 border-b border-slate-400 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md tranistion-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Link href="/">
            {" "}
            <Logo />
          </Link>
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <h1 className="text-2xl font-bold">Vimly</h1>
              <h4 className="block text-xs text-slate-500">Admin page</h4>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
