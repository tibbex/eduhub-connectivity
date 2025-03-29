
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { db, storage } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, File, FileVideo, FileAudio, Loader2 } from "lucide-react";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreatePostDialog = ({ open, onOpenChange }: CreatePostDialogProps) => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const [postText, setPostText] = useState("");
  const [postType, setPostType] = useState<"text" | "file" | "video" | "audio">("text");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!userProfile) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You must be logged in to create a post.",
      });
      return;
    }

    if (postType === "text" && !postText.trim()) {
      toast({
        variant: "destructive",
        title: "Empty Post",
        description: "Please add some text to your post.",
      });
      return;
    }

    if (postType !== "text" && !selectedFile) {
      toast({
        variant: "destructive",
        title: "No File Selected",
        description: "Please select a file to upload.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let fileURL = "";
      
      // Upload file if selected
      if (selectedFile) {
        const storageRef = ref(storage, `posts/${userProfile.uid}/${Date.now()}_${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);
        fileURL = await getDownloadURL(storageRef);
      }

      // Create post in Firestore
      await addDoc(collection(db, "posts"), {
        text: postText,
        type: postType,
        fileURL,
        fileName: selectedFile?.name || "",
        fileType: selectedFile?.type || "",
        authorId: userProfile.uid,
        authorName: userProfile.name,
        authorRole: userProfile.role,
        createdAt: serverTimestamp(),
        likes: 0,
        comments: 0,
        shares: 0,
      });

      toast({
        title: "Post Created",
        description: "Your post has been published successfully.",
      });

      // Reset form and close dialog
      setPostText("");
      setSelectedFile(null);
      onOpenChange(false);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create post. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
          <DialogDescription>
            Share knowledge, resources, or updates with your educational network.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs
          defaultValue="text"
          value={postType}
          onValueChange={(value) => setPostType(value as any)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="mt-4">
            <Textarea
              placeholder="What would you like to share?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="min-h-[100px]"
            />
          </TabsContent>
          
          <TabsContent value="file" className="mt-4">
            <div className="space-y-4">
              <Textarea
                placeholder="Add a description for your file..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="min-h-[60px]"
              />
              
              <div className="border rounded-md p-4">
                <Label htmlFor="file-upload" className="block mb-2">Upload Document</Label>
                <div className="flex items-center gap-2">
                  <File className="h-5 w-5 text-muted-foreground" />
                  {selectedFile ? (
                    <span className="text-sm truncate max-w-[300px]">{selectedFile.name}</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">No file selected</span>
                  )}
                </div>
                <div className="mt-2">
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="mt-4">
            <div className="space-y-4">
              <Textarea
                placeholder="Add a description for your video..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="min-h-[60px]"
              />
              
              <div className="border rounded-md p-4">
                <Label htmlFor="video-upload" className="block mb-2">Upload Video</Label>
                <div className="flex items-center gap-2">
                  <FileVideo className="h-5 w-5 text-muted-foreground" />
                  {selectedFile ? (
                    <span className="text-sm truncate max-w-[300px]">{selectedFile.name}</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">No video selected</span>
                  )}
                </div>
                <div className="mt-2">
                  <Input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="audio" className="mt-4">
            <div className="space-y-4">
              <Textarea
                placeholder="Add a description for your audio..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="min-h-[60px]"
              />
              
              <div className="border rounded-md p-4">
                <Label htmlFor="audio-upload" className="block mb-2">Upload Audio</Label>
                <div className="flex items-center gap-2">
                  <FileAudio className="h-5 w-5 text-muted-foreground" />
                  {selectedFile ? (
                    <span className="text-sm truncate max-w-[300px]">{selectedFile.name}</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">No audio selected</span>
                  )}
                </div>
                <div className="mt-2">
                  <Input
                    id="audio-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Post
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
