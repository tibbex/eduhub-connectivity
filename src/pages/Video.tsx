
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";

const VideoPage = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Educational Videos</h1>
        <p className="text-muted-foreground">Discover and share video resources</p>
      </div>

      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="your-videos">Your Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="trending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Suspense key={i} fallback={<VideoCardSkeleton />}>
                <VideoCard 
                  title={`Sample Educational Video ${i + 1}`}
                  author={`Teacher ${i + 1}`}
                  views={`${Math.floor(Math.random() * 1000) + 100} views`}
                  thumbnail={`https://picsum.photos/seed/${i + 1}/640/360`}
                />
              </Suspense>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Suspense key={i} fallback={<VideoCardSkeleton />}>
                <VideoCard 
                  title={`Recommended Video ${i + 1}`}
                  author={`Content Creator ${i + 1}`}
                  views={`${Math.floor(Math.random() * 1000) + 100} views`}
                  thumbnail={`https://picsum.photos/seed/${i + 10}/640/360`}
                />
              </Suspense>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="your-videos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                <p className="text-muted-foreground mb-2">No videos yet</p>
                <p className="text-center text-sm text-muted-foreground">
                  Videos you upload will appear here
                </p>
              </CardContent>
            </Card>
          </div>
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full aspect-video object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/30 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="h-6 w-6 text-eduBlue" />
          </div>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base line-clamp-2">{title}</CardTitle>
        <CardDescription className="flex justify-between">
          <span>{author}</span>
          <span>{views}</span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

const VideoCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-40" />
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
    </Card>
  );
};

export default VideoPage;
