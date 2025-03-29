
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CreatePostDialog from "@/components/post/CreatePostDialog";
import AppNavigation from "./AppNavigation";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <header className="w-full bg-background border-b sticky top-0 z-50">
      <div className="container flex h-16 items-center px-4 sm:justify-between sm:space-x-0 lg:px-6">
        <div className="flex gap-4 md:gap-6 lg:gap-10">
          <Link to="/home" className="flex items-center space-x-2">
            <img src={logo} alt="EduHub Logo" className="h-8 w-8" />
            <span className="hidden md:inline-block font-bold text-xl">EduHub</span>
          </Link>
          
          <div className="hidden md:flex">
            <AppNavigation />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            onClick={() => setIsCreatePostOpen(true)} 
            variant="ghost" 
            size="sm"
            className="hidden sm:flex"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Post
          </Button>
          
          <Button
            onClick={() => setIsCreatePostOpen(true)}
            variant="ghost"
            size="icon"
            className="sm:hidden"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
          
          <UserMenu />
        </div>
      </div>
      
      <CreatePostDialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen} />
    </header>
  );
};

export default Header;
