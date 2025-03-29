
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Book, Home, MessageSquare, Settings, User, Video, LogOut, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import { motion } from "framer-motion";
import { useState } from "react";

const primaryMenuItems = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/video", label: "Video", icon: Video },
  { path: "/messaging", label: "Messaging", icon: MessageSquare },
];

const secondaryMenuItems = [
  { path: "/books", label: "Books & Worksheets", icon: Book },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/settings", label: "Settings", icon: Settings },
];

const MobileMenu = () => {
  const location = useLocation();
  const { userProfile, logout, isDemo } = useAuth();
  const [activeMenuSet, setActiveMenuSet] = useState<'primary' | 'secondary'>('primary');

  const toggleMenuSet = () => {
    setActiveMenuSet(activeMenuSet === 'primary' ? 'secondary' : 'primary');
  };

  const activeMenuItems = activeMenuSet === 'primary' ? primaryMenuItems : secondaryMenuItems;

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="w-full md:hidden">
        <Sidebar>
          <SidebarHeader className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <motion.img 
                src={logo} 
                alt="EduHub" 
                className="h-8 w-8" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
              <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-eduPurple to-eduBlue">EduHub</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={toggleMenuSet}
                  variant="outline"
                  size="sm"
                  className="mr-2 ls-button"
                >
                  {activeMenuSet === 'primary' ? 'More' : 'Main Menu'}
                </Button>
              </motion.div>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <div className="mb-6 px-4">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5 border-primary/10 border">
                <Avatar className="h-10 w-10 ring-2 ring-primary/30 transition-all duration-200 hover:ring-primary">
                  <AvatarImage src={userProfile?.photoURL || ""} alt={userProfile?.name || "User"} />
                  <AvatarFallback className="bg-gradient-to-br from-eduPurple to-eduBlue text-white">
                    {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {isDemo ? "Demo User" : userProfile?.name || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {userProfile?.email || "demo@example.com"}
                  </p>
                </div>
              </div>
            </div>
            
            <SidebarMenu>
              <motion.div
                key={activeMenuSet}
                initial={{ opacity: 0, x: activeMenuSet === 'primary' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeMenuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link 
                          to={item.path} 
                          className={`group ls-nav-item ${isActive ? 'ls-nav-item-active' : 'ls-nav-item-inactive'} ls-slide-up ls-stagger-${index + 1}`}
                        >
                          <motion.div
                            className="flex items-center gap-3 w-full"
                            whileTap={{ scale: 0.95 }}
                          >
                            <item.icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'group-hover:text-primary/70'}`} />
                            <span>{item.label}</span>
                            {isActive && (
                              <motion.div
                                className="ml-auto h-2 w-2 rounded-full bg-primary"
                                layoutId="mobileActiveIndicator"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              />
                            )}
                          </motion.div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </motion.div>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4">
            <Button 
              variant="outline" 
              className="w-full flex gap-2 items-center justify-center hover:bg-primary/10 transition-colors duration-200 ls-button"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
            {isDemo && (
              <div className="mt-2 px-2 py-1 rounded-md bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
                <p className="text-xs text-center text-amber-800 dark:text-amber-400">
                  Demo mode: 10 minutes access
                </p>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
};

export default MobileMenu;
