
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { 
  LogOut, 
  Settings, 
  User, 
  HelpCircle, 
  Clock, 
  Moon,
  Sun
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const UserMenu = () => {
  const { userProfile, logout, isDemo } = useAuth();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    toast.success(`Switched to ${newTheme} theme`, {
      icon: newTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />,
    });
  };

  const MotionLink = motion(Link);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button 
          className="flex items-center space-x-2 rounded-full hover:bg-accent p-1 focus:outline-none transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar className="h-8 w-8 ring-2 ring-primary/30 transition-all duration-200 hover:ring-primary">
            <AvatarImage src={userProfile?.photoURL || ""} alt={userProfile?.name || "User"} />
            <AvatarFallback className="bg-gradient-to-br from-eduPurple to-eduBlue text-white">
              {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block text-sm font-medium">
            {isDemo ? "Demo User" : userProfile?.name || "User"}
          </span>
          <span className="sr-only">Open user menu</span>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-semibold text-primary">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <MotionLink 
              to="/profile" 
              className="flex w-full cursor-pointer"
              whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--accent), 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <User className="mr-2 h-4 w-4 text-eduPurple" />
              <span>Profile</span>
            </MotionLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <MotionLink 
              to="/settings" 
              className="flex w-full cursor-pointer"
              whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--accent), 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings className="mr-2 h-4 w-4 text-eduBlue" />
              <span>Settings</span>
            </MotionLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={toggleTheme}
          className="cursor-pointer"
          asChild
        >
          <motion.div 
            className="flex w-full items-center"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--accent), 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            {theme === "light" ? (
              <>
                <Moon className="mr-2 h-4 w-4 text-indigo-400" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="mr-2 h-4 w-4 text-amber-400" />
                <span>Light Mode</span>
              </>
            )}
          </motion.div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <MotionLink 
            to="/help" 
            className="flex w-full cursor-pointer"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--accent), 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            <HelpCircle className="mr-2 h-4 w-4 text-teal-500" />
            <span>Help & Support</span>
          </MotionLink>
        </DropdownMenuItem>
        {isDemo && (
          <DropdownMenuItem className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400">
            <Clock className="mr-2 h-4 w-4" />
            <span>Demo Mode Active</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-900/20 dark:focus:text-red-400"
          asChild
        >
          <motion.div 
            className="flex w-full items-center"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--destructive), 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="mr-2 h-4 w-4 text-red-500" />
            <span>Log out</span>
          </motion.div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
