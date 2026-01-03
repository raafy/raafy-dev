import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  index: number;
  color?: "blue" | "green" | "yellow" | "purple" | "red";
}

export function StatsCard({ title, value, icon: Icon, index, color = "blue" }: StatsCardProps) {
  const colorClasses = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-600",
    purple: "bg-purple-600",
    red: "bg-red-600",
  };

  const hoverColorClasses = {
    blue: "group-hover:bg-blue-700",
    green: "group-hover:bg-green-700",
    yellow: "group-hover:bg-yellow-700",
    purple: "group-hover:bg-purple-700",
    red: "group-hover:bg-red-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <div className={`relative rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all duration-300 hover:border-gray-700 hover:bg-gray-800 ${hoverColorClasses[color]}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 group-hover:text-gray-300 transition-colors">
              {title}
            </p>
            <p className="mt-2 text-3xl font-bold text-white group-hover:text-gray-100 transition-colors">
              {value}
            </p>
          </div>
          <div className={`relative rounded-lg ${colorClasses[color]} p-3 transition-all duration-300 group-hover:scale-110`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}
