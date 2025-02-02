import { motion } from "framer-motion";
import { CircleUserRoundIcon } from "lucide-react";

function NavBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="bg-white w-full text-lg font-medium p-6 rounded-2xl flex gap-3 items-center"
    >
      <CircleUserRoundIcon />
      <h2>Guest User</h2>
    </motion.div>
  );
}

export default NavBar;
