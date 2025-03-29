
import { Link, useLocation } from "react-router-dom";
import { Book, Home, MessageSquare, User, Video, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const menuItems = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/video", label: "Video", icon: Video },
  { path: "/messaging", label: "Messaging", icon: MessageSquare },
  { path: "/books", label: "Books & Worksheets", icon: Book },
  { path: "/profile", label: "Profile", icon: User },
];

const AppNavigation = () => {
  const location = useLocation();
  const { userProfile } = useAuth();
  const userRole = userProfile?.role || "student";

  const MotionLink = motion(Link);

  return (
    <NavigationMenu className="max-w-full justify-start">
      <NavigationMenuList className="space-x-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavigationMenuItem key={item.path}>
              <MotionLink to={item.path} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex items-center gap-2 relative transition-all duration-200 group",
                    isActive 
                      ? "bg-primary/10 dark:bg-primary/20 text-primary font-medium" 
                      : "hover:text-primary/90"
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 transition-colors duration-200",
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground group-hover:text-primary/70"
                  )} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
                      layoutId="navIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </NavigationMenuLink>
              </MotionLink>
            </NavigationMenuItem>
          );
        })}

        {userRole === "teacher" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2 group">
              <span className="group-hover:text-primary/90 transition-colors duration-200">Teacher Tools</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary/70 transition-colors duration-200" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <MotionLink 
                  to="/teacher/assignments"
                  className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--accent), 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Assignments</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Create and manage student assignments
                  </p>
                </MotionLink>
                <MotionLink 
                  to="/teacher/grades"
                  className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--accent), 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Grades</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Track and manage student grades
                  </p>
                </MotionLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {userRole === "school" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2 group">
              <span className="group-hover:text-primary/90 transition-colors duration-200">School Admin</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary/70 transition-colors duration-200" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <MotionLink 
                  to="/school/teachers"
                  className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--accent), 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Manage Teachers</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    View and manage school teachers
                  </p>
                </MotionLink>
                <MotionLink 
                  to="/school/students"
                  className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--accent), 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Manage Students</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    View and manage school students
                  </p>
                </MotionLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AppNavigation;
