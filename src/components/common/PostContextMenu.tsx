
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Share, Bookmark, Flag, Copy, Trash } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface PostContextMenuProps {
  children: React.ReactNode;
  postId: string;
  authorId: string;
  onDelete?: () => void;
}

const PostContextMenu = ({ 
  children, 
  postId, 
  authorId, 
  onDelete 
}: PostContextMenuProps) => {
  const { userProfile } = useAuth();
  const isOwner = userProfile?.uid === authorId;

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
    toast.success("Post link copied to clipboard");
  };

  const handleSave = () => {
    // Implementation for saving post
    toast.success("Post saved to your bookmarks");
  };

  const handleReport = () => {
    // Implementation for reporting post
    toast.success("Post reported. Thank you for helping keep EduHub safe.");
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      toast.success("Post deleted successfully");
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={handleShare}>
          <Share className="mr-2 h-4 w-4" />
          <span>Share</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleSave}>
          <Bookmark className="mr-2 h-4 w-4" />
          <span>Save</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => navigator.clipboard.writeText(postId)}>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy ID</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleReport}>
          <Flag className="mr-2 h-4 w-4" />
          <span>Report</span>
        </ContextMenuItem>
        {isOwner && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem 
              onClick={handleDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default PostContextMenu;
