
import { Link, useLocation } from "react-router-dom";
import { Book, Home, MessageSquare, User, Video } from "lucide-react";
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
  const userType = userProfile?.type || "student";

  return (
    <NavigationMenu className="max-w-full justify-start">
      <NavigationMenuList className="space-x-2">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            <Link to={item.path}>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "flex items-center gap-2",
                  location.pathname === item.path && "bg-accent/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}

        {userType === "teacher" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2">
              <span>Teacher Tools</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <Link 
                  to="/teacher/assignments"
                  className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Assignments</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Create and manage student assignments
                  </p>
                </Link>
                <Link 
                  to="/teacher/grades"
                  className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Grades</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Track and manage student grades
                  </p>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {userType === "school" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2">
              <span>School Admin</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <Link 
                  to="/school/teachers"
                  className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Manage Teachers</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    View and manage school teachers
                  </p>
                </Link>
                <Link 
                  to="/school/students"
                  className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Manage Students</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    View and manage school students
                  </p>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AppNavigation;
