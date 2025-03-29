
import { ReactNode } from "react";
import Header from "./Header";
import MobileMenu from "./MobileMenu";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFD]">
      <Header />
      <MobileMenu />
      <main className="flex-1 container py-6 px-4 md:py-8 lg:px-6 animate-fade-in">
        {children}
      </main>
      <footer className="border-t py-6 md:py-4">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} EduHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:underline hover:text-primary transition-colors duration-200">Terms</a>
            <a href="#" className="hover:underline hover:text-primary transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:underline hover:text-primary transition-colors duration-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
