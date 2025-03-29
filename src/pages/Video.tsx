
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

const VideoPage = () => {
  // Animation variants
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
    <div className="max-w-5xl mx-auto">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-eduPurple to-eduBlue mb-2">Educational Videos</h1>
        <p className="text-muted-foreground text-lg">Discover and share video resources</p>
      </motion.div>

      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="mb-6 bg-muted/50 p-1 rounded-lg">
          <TabsTrigger 
            value="trending" 
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Trending
          </TabsTrigger>
          <TabsTrigger 
            value="recommended" 
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Recommended
          </TabsTrigger>
          <TabsTrigger 
            value="your-videos" 
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Your Videos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <Suspense key={i} fallback={<VideoCardSkeleton />}>
                <motion.div variants={itemVariants}>
                  <VideoCard 
                    title={`Sample Educational Video ${i + 1}`}
                    author={`Teacher ${i + 1}`}
                    views={`${Math.floor(Math.random() * 1000) + 100} views`}
                    thumbnail={`https://picsum.photos/seed/${i + 1}/640/360`}
                  />
                </motion.div>
              </Suspense>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="recommended">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <Suspense key={i} fallback={<VideoCardSkeleton />}>
                <motion.div variants={itemVariants}>
                  <VideoCard 
                    title={`Recommended Video ${i + 1}`}
                    author={`Content Creator ${i + 1}`}
                    views={`${Math.floor(Math.random() * 1000) + 100} views`}
                    thumbnail={`https://picsum.photos/seed/${i + 10}/640/360`}
                  />
                </motion.div>
              </Suspense>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="your-videos">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants}>
              <Card className="ls-card">
                <CardContent className="p-8 flex flex-col items-center justify-center min-h-[200px]">
                  <p className="text-xl font-medium text-primary mb-2">No videos yet</p>
                  <p className="text-center text-muted-foreground">
                    Videos you upload will appear here
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface VideoCardProps {
  title: string;
  author: string;
  views: string;
  thumbnail: string;
}

const VideoCard = ({ title, author, views, thumbnail }: VideoCardProps) => {
  return (
    <Card className="ls-card overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full aspect-video object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/30 transition-opacity">
          <motion.div 
            className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Play className="h-6 w-6 text-eduBlue" />
          </motion.div>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base line-clamp-2">{title}</CardTitle>
        <CardDescription className="flex justify-between">
          <span>{author}</span>
          <span className="text-xs px-2 py-0.5 bg-muted rounded-full">{views}</span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

const VideoCardSkeleton = () => {
  return (
    <Card className="ls-card overflow-hidden">
      <Skeleton className="w-full h-40" />
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
    </Card>
  );
};

export default VideoPage;
