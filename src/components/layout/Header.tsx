
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { PlusCircle, Menu } from "lucide-react";
import { useState } from "react";
import CreatePostDialog from "@/components/post/CreatePostDialog";
import AppNavigation from "./AppNavigation";
import UserMenu from "./UserMenu";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'main' | 'secondary' | null>('main');

  const toggleMenu = () => {
    setActiveMenu(activeMenu === 'main' ? 'secondary' : 'main');
  };

  return (
    <header className="w-full bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container flex h-16 items-center px-4 sm:justify-between sm:space-x-0 lg:px-6">
        <div className="flex gap-4 md:gap-6 lg:gap-10">
          <Link to="/home" className="flex items-center space-x-2">
            <motion.img 
              src={logo} 
              alt="EduHub Logo" 
              className="h-8 w-8" 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.span 
              className="hidden md:inline-block font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-eduPurple to-eduBlue"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              EduHub
            </motion.span>
          </Link>
          
          <div className="hidden md:flex">
            <AnimatePresence mode="wait">
              {activeMenu === 'main' && (
                <motion.div
                  key="main-menu"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <AppNavigation />
                </motion.div>
              )}
              {activeMenu === 'secondary' && (
                <motion.div
                  key="secondary-menu"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-4"
                >
                  <Link to="/settings" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Settings</Link>
                  <Link to="/help" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Help</Link>
                  <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:block hidden"
          >
            <Button 
              onClick={() => setIsCreatePostOpen(true)} 
              variant="default" 
              size="sm"
              className="hidden sm:flex ls-button bg-gradient-to-r from-eduPurple to-eduBlue hover:opacity-90 transition-all duration-200"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="sm:hidden"
          >
            <Button
              onClick={() => setIsCreatePostOpen(true)}
              variant="default"
              size="icon"
              className="ls-button bg-gradient-to-r from-eduPurple to-eduBlue hover:opacity-90"
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Button 
              onClick={toggleMenu} 
              variant="outline" 
              size="icon"
              className="ls-button"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </motion.div>
          
          <UserMenu />
        </div>
      </div>
      
      <CreatePostDialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen} />
    </header>
  );
};

export default Header;
