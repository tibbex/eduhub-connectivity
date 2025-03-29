
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  BookOpen, 
  Download, 
  Star, 
  FileBox, 
  Save, 
  Filter 
} from "lucide-react";

const BooksPage = () => {
  // Mock resources
  const books = [
    { id: "1", title: "Mathematics: Algebra Fundamentals", author: "Dr. Johnson", level: "Grade 9-10", rating: 4.5, downloads: 1250, category: "Mathematics" },
    { id: "2", title: "Biology: Understanding Ecosystems", author: "Prof. Smith", level: "Grade 11-12", rating: 4.7, downloads: 980, category: "Biology" },
    { id: "3", title: "World History: Ancient Civilizations", author: "Dr. Parker", level: "Grade 8-9", rating: 4.2, downloads: 1560, category: "History" },
    { id: "4", title: "English Literature Classics", author: "Jane Wilson", level: "Grade 10-12", rating: 4.8, downloads: 2100, category: "English" },
  ];

  const worksheets = [
    { id: "1", title: "Quadratic Equations Practice", author: "Ms. Thompson", level: "Grade 10", rating: 4.6, downloads: 750, category: "Mathematics" },
    { id: "2", title: "Cell Biology Diagrams", author: "Mr. Roberts", level: "Grade 11", rating: 4.3, downloads: 680, category: "Biology" },
    { id: "3", title: "Grammar Exercises Pack", author: "Dr. Williams", level: "Grade 8", rating: 4.5, downloads: 920, category: "English" },
    { id: "4", title: "Chemical Reactions Lab", author: "Prof. Martin", level: "Grade 9", rating: 4.7, downloads: 810, category: "Chemistry" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Books & Worksheets</h1>
        <p className="text-muted-foreground">Educational resources for students and teachers</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
        <div className="flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for books, worksheets or topics..." className="pl-9 pr-24" />
            <Button size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
              Search
            </Button>
          </div>
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="books">
        <TabsList className="mb-6">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="worksheets">Worksheets</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="books">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <ResourceCard 
                key={book.id}
                title={book.title}
                author={book.author}
                level={book.level}
                rating={book.rating}
                downloads={book.downloads}
                category={book.category}
                type="book"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="worksheets">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {worksheets.map((worksheet) => (
              <ResourceCard 
                key={worksheet.id}
                title={worksheet.title}
                author={worksheet.author}
                level={worksheet.level}
                rating={worksheet.rating}
                downloads={worksheet.downloads}
                category={worksheet.category}
                type="worksheet"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
              <p className="text-muted-foreground mb-2">No saved resources yet</p>
              <p className="text-center text-sm text-muted-foreground">
                Resources you save will appear here for easy access
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  author: string;
  level: string;
  rating: number;
  downloads: number;
  category: string;
  type: "book" | "worksheet";
}

const ResourceCard = ({ 
  title, 
  author, 
  level, 
  rating, 
  downloads, 
  category,
  type
}: ResourceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2">
            {category}
          </Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Save className="h-4 w-4" />
          </Button>
        </div>
        <CardTitle className="text-base line-clamp-2">{title}</CardTitle>
        <CardDescription>by {author}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="text-muted-foreground">Level:</span>
          <span>{level}</span>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <Download className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {downloads > 1000 ? `${(downloads / 1000).toFixed(1)}k` : downloads}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full" variant="outline">
          {type === "book" ? <BookOpen className="mr-2 h-4 w-4" /> : <FileBox className="mr-2 h-4 w-4" />}
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BooksPage;
