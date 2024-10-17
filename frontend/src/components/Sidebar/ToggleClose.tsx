import React from "react";
import { ArrowRightSquareIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function ToggleClose({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <ArrowRightSquareIcon
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span layout className="text-sm font-semibold">
            Close
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}
