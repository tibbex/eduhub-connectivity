
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useState } from "react";

interface ContentMenuBarProps {
  onFilterChange?: (filter: string) => void;
  onSortChange?: (sort: string) => void;
  defaultFilter?: string;
  defaultSort?: string;
}

const ContentMenuBar = ({
  onFilterChange,
  onSortChange,
  defaultFilter = "all",
  defaultSort = "latest"
}: ContentMenuBarProps) => {
  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [activeSort, setActiveSort] = useState(defaultSort);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (onFilterChange) onFilterChange(filter);
  };

  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
    if (onSortChange) onSortChange(sort);
  };

  return (
    <Menubar className="rounded-lg border mb-4">
      <MenubarMenu>
        <MenubarTrigger className="font-medium">Filter</MenubarTrigger>
        <MenubarContent>
          <MenubarItem 
            onClick={() => handleFilterChange("all")}
            className={activeFilter === "all" ? "bg-accent" : ""}
          >
            All Posts
          </MenubarItem>
          <MenubarItem 
            onClick={() => handleFilterChange("my-posts")}
            className={activeFilter === "my-posts" ? "bg-accent" : ""}
          >
            My Posts
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem 
            onClick={() => handleFilterChange("photos")}
            className={activeFilter === "photos" ? "bg-accent" : ""}
          >
            Photos
          </MenubarItem>
          <MenubarItem 
            onClick={() => handleFilterChange("videos")}
            className={activeFilter === "videos" ? "bg-accent" : ""}
          >
            Videos
          </MenubarItem>
          <MenubarItem 
            onClick={() => handleFilterChange("documents")}
            className={activeFilter === "documents" ? "bg-accent" : ""}
          >
            Documents
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger className="font-medium">Sort</MenubarTrigger>
        <MenubarContent>
          <MenubarItem 
            onClick={() => handleSortChange("latest")}
            className={activeSort === "latest" ? "bg-accent" : ""}
          >
            Latest
            <MenubarShortcut>⌘1</MenubarShortcut>
          </MenubarItem>
          <MenubarItem 
            onClick={() => handleSortChange("popular")}
            className={activeSort === "popular" ? "bg-accent" : ""}
          >
            Most Popular
            <MenubarShortcut>⌘2</MenubarShortcut>
          </MenubarItem>
          <MenubarItem 
            onClick={() => handleSortChange("oldest")}
            className={activeSort === "oldest" ? "bg-accent" : ""}
          >
            Oldest
            <MenubarShortcut>⌘3</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger className="font-medium">View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Compact</MenubarItem>
          <MenubarItem>Comfortable</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ContentMenuBar;
