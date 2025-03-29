
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { logoutUser } from "@/lib/firebase";

import {
  Home,
  Video,
  MessageSquare,
  BookOpen,
  UserCog,
  Menu,
  LogOut,
  Clock,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CreatePostDialog from "@/components/post/CreatePostDialog";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { userProfile, isDemo, demoTimeLeft, endDemo } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Format demo time left as MM:SS
  const formatDemoTime = () => {
    const minutes = Math.floor(demoTimeLeft / 60);
    const seconds = demoTimeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Navigation items
  const navItems = [
    { name: "Home", icon: Home, path: "/home" },
    { name: "Video", icon: Video, path: "/video" },
    { name: "Messaging", icon: MessageSquare, path: "/messaging" },
    { name: "Books & Worksheets", icon: BookOpen, path: "/books" },
    { name: "Profile Settings", icon: UserCog, path: "/profile" },
  ];

  // Handle logout
  const handleLogout = async () => {
    try {
      if (isDemo) {
        endDemo();
      } else {
        await logoutUser();
      }
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message,
      });
    }
  };

  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!userProfile?.name) return "U";
    return userProfile.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Desktop Navigation
  const DesktopNav = () => (
    <div className="flex flex-col h-full w-64 border-r bg-sidebar">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-r from-eduPurple to-eduBlue flex items-center justify-center text-white font-bold">
            E
          </div>
          <h1 className="font-bold text-lg">EduHub</h1>
        </div>
      </div>

      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <Button
          variant="default"
          className="w-full mb-4 social-gradient"
          onClick={() => setIsCreatePostOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Post
        </Button>

        {isDemo && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Demo Mode</span>
              <span>{formatDemoTime()}</span>
            </div>
            <Progress value={(demoTimeLeft / 600) * 100} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium truncate max-w-[120px]">
                {userProfile?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {userProfile?.role || "User"}
              </p>
            </div>
          </div>
          <Button size="icon" variant="ghost" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Mobile Navigation
  const MobileNav = () => (
    <div className="h-16 border-b flex items-center justify-between px-4 bg-white">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-gradient-to-r from-eduPurple to-eduBlue flex items-center justify-center text-white font-bold">
          E
        </div>
        <h1 className="font-bold text-lg">EduHub</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full"
          onClick={() => setIsCreatePostOpen(true)}
        >
          <PlusCircle className="h-5 w-5" />
        </Button>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{userProfile?.name || "User"}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {userProfile?.role || "User"}
                  </p>
                </div>
              </div>

              <div className="flex-1 p-4">
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleNavigation(item.path)}
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </Button>
                  ))}
                </nav>
              </div>

              <div className="p-4 border-t">
                {isDemo && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        Demo Mode
                      </span>
                      <span>{formatDemoTime()}</span>
                    </div>
                    <Progress value={(demoTimeLeft / 600) * 100} className="h-2" />
                  </div>
                )}

                <Button 
                  variant="outline" 
                  className="w-full justify-start text-destructive" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );

  // Mobile Footer Navigation
  const MobileFooter = () => (
    <div className="h-16 border-t flex items-center justify-around px-2 bg-white fixed bottom-0 left-0 right-0">
      {navItems.slice(0, 5).map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={() => handleNavigation(item.path)}
        >
          <item.icon className="h-5 w-5" />
          <span className="sr-only">{item.name}</span>
        </Button>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen">
      {!isMobile && <DesktopNav />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {isMobile && <MobileNav />}
        
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          {children}
        </main>
        
        {isMobile && <MobileFooter />}
      </div>

      <CreatePostDialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen} />
    </div>
  );
};

export default MainLayout;
