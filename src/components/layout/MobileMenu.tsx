
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Book, Home, LogOut, MessageSquare, Settings, User, Video } from "lucide-react";
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

const menuItems = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/video", label: "Video", icon: Video },
  { path: "/messaging", label: "Messaging", icon: MessageSquare },
  { path: "/books", label: "Books & Worksheets", icon: Book },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/settings", label: "Settings", icon: Settings },
];

const MobileMenu = () => {
  const location = useLocation();
  const { userProfile, logout, isDemo } = useAuth();

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="w-full md:hidden">
        <Sidebar>
          <SidebarHeader className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={logo} alt="EduHub" className="h-8 w-8" />
              <h2 className="text-lg font-bold">EduHub</h2>
            </div>
            <SidebarTrigger />
          </SidebarHeader>
          
          <SidebarContent>
            <div className="mb-4 px-4">
              <div className="flex items-center space-x-3 p-2 border-b pb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userProfile?.photoURL || ""} alt={userProfile?.displayName || "User"} />
                  <AvatarFallback>
                    {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {isDemo ? "Demo User" : userProfile?.displayName || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {userProfile?.email || "demo@example.com"}
                  </p>
                </div>
              </div>
            </div>
            
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4">
            <Button 
              variant="outline" 
              className="w-full flex gap-2 items-center justify-center"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
            {isDemo && (
              <p className="text-xs text-center mt-2 text-muted-foreground">
                Demo mode: 10 minutes access
              </p>
            )}
          </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
};

export default MobileMenu;
