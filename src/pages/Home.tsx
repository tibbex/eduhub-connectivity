
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Share2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface Post {
  id: string;
  text: string;
  type: "text" | "file" | "video" | "audio";
  fileURL: string;
  fileName: string;
  fileType: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  createdAt: Timestamp;
  likes: number;
  comments: number;
  shares: number;
}

const Home = () => {
  const { userProfile } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          limit(20)
        );
        
        const querySnapshot = await getDocs(postsQuery);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Post));
        
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Get user initials for avatar fallback
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return "";
    
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  // Render file attachment based on type
  const renderFileAttachment = (post: Post) => {
    if (!post.fileURL) return null;

    switch (post.type) {
      case "video":
        return (
          <div className="mt-3 rounded-md overflow-hidden">
            <video 
              src={post.fileURL} 
              controls 
              className="w-full max-h-[400px]"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case "audio":
        return (
          <div className="mt-3">
            <audio 
              src={post.fileURL} 
              controls 
              className="w-full"
            >
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      case "file":
        return (
          <div className="mt-3">
            <a 
              href={post.fileURL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-muted rounded-md hover:bg-muted/80 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center mr-3">
                <span className="text-xs font-medium text-primary">
                  {post.fileName.split('.').pop()?.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{post.fileName}</p>
                <p className="text-xs text-muted-foreground">Click to view or download</p>
              </div>
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  // Welcome message based on user role
  const welcomeMessage = () => {
    if (!userProfile) return "";
    
    switch (userProfile.role) {
      case "student":
        return `Welcome back, ${userProfile.name}! Catch up on what's new in your learning journey.`;
      case "teacher":
        return `Welcome back, ${userProfile.name}! See what your students and colleagues are sharing.`;
      case "school":
        return `Welcome back, ${userProfile.name}! Stay updated with your school community.`;
      default:
        return `Welcome to EduHub!`;
    }
  };

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-eduPurple to-eduBlue mb-2">Home</h1>
        <p className="text-muted-foreground text-lg">{welcomeMessage()}</p>
      </motion.div>

      {/* Post skeleton while loading */}
      {loading && (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="ls-card overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-4/6" />
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex space-x-2 w-full">
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Actual posts */}
      {!loading && (
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {posts.length === 0 ? (
            <motion.div variants={itemVariants}>
              <Card className="ls-card">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-xl font-medium text-primary mb-2">No posts yet</p>
                  <p className="text-center text-muted-foreground">
                    Be the first to share something with your educational network!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            posts.map((post, index) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Card className="ls-card hover:shadow-md transition-all duration-300 overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 ring-1 ring-primary/20 transition-all duration-200 hover:ring-primary/60">
                        <AvatarImage src={post.authorId ? `https://i.pravatar.cc/150?u=${post.authorId}` : undefined} alt={post.authorName} />
                        <AvatarFallback className="bg-gradient-to-br from-eduPurple to-eduBlue text-white">
                          {getUserInitials(post.authorName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <CardTitle className="text-base font-semibold">{post.authorName}</CardTitle>
                          <span className="text-xs text-muted-foreground capitalize px-2 py-0.5 bg-muted rounded-full">
                            {post.authorRole}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(post.createdAt)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="whitespace-pre-line">{post.text}</p>
                    {renderFileAttachment(post)}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex w-full divide-x">
                      <Button variant="ghost" className="flex-1 rounded-none hover:bg-primary/5 transition-colors duration-200">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        {post.likes > 0 ? post.likes : "Like"}
                      </Button>
                      <Button variant="ghost" className="flex-1 rounded-none hover:bg-primary/5 transition-colors duration-200">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        {post.comments > 0 ? post.comments : "Comment"}
                      </Button>
                      <Button variant="ghost" className="flex-1 rounded-none hover:bg-primary/5 transition-colors duration-200">
                        <Share2 className="mr-1 h-4 w-4" />
                        {post.shares > 0 ? post.shares : "Share"}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Home;
