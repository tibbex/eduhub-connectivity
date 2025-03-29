
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, Send, PlusCircle } from "lucide-react";

const MessagingPage = () => {
  const isMobile = useIsMobile();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Mock conversations
  const conversations = [
    { id: "1", name: "John Smith", role: "Teacher", lastMessage: "Don't forget about the homework", unread: 2 },
    { id: "2", name: "Sarah Johnson", role: "Student", lastMessage: "Thanks for the feedback", unread: 0 },
    { id: "3", name: "Springfield High", role: "School", lastMessage: "Announcement: Parent-teacher meeting", unread: 1 },
    { id: "4", name: "Math Study Group", role: "Group", lastMessage: "Can someone explain question 5?", unread: 0 },
  ];

  // Mock messages for active chat
  const mockMessages = [
    { id: "1", sender: "them", text: "Hi there! How are you doing with the assignment?", time: "10:30 AM" },
    { id: "2", sender: "me", text: "I'm making progress, but I have a question about the third section.", time: "10:32 AM" },
    { id: "3", sender: "them", text: "Sure, what's your question?", time: "10:33 AM" },
    { id: "4", sender: "me", text: "I'm not sure how to approach the analysis portion. Could you point me to some resources?", time: "10:35 AM" },
    { id: "5", sender: "them", text: "Of course! I'd recommend checking chapter 7 in your textbook, and I've also shared some helpful links in the class forum.", time: "10:38 AM" },
    { id: "6", sender: "them", text: "Let me know if you need more help after reviewing those resources.", time: "10:38 AM" },
    { id: "7", sender: "me", text: "Perfect, thank you! I'll take a look at those and get back to you if I have more questions.", time: "10:40 AM" },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send the message to Firebase
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)]">
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Connect with students, teachers, and schools</p>
        </div>

        <Card className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {/* Conversation List - Hidden on mobile when chat is active */}
            {(!isMobile || !activeChat) && (
              <div className="w-full md:w-80 border-r">
                <CardHeader className="px-4 py-3">
                  <div className="flex items-center gap-2 relative">
                    <Input 
                      placeholder="Search messages" 
                      className="pl-8"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <Tabs defaultValue="all">
                  <div className="px-4">
                    <TabsList className="w-full">
                      <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                      <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="all" className="m-0">
                    <ScrollArea className="h-[calc(100vh-14rem)] md:h-[calc(100vh-16rem)]">
                      {conversations.map((convo) => (
                        <div 
                          key={convo.id}
                          className={`
                            p-3 cursor-pointer hover:bg-muted/50 border-b 
                            ${activeChat === convo.id ? 'bg-muted' : ''}
                          `}
                          onClick={() => setActiveChat(convo.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{getInitials(convo.name)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-medium text-sm truncate">{convo.name}</h3>
                                {convo.unread > 0 && (
                                  <span className="inline-flex items-center justify-center h-5 w-5 text-xs bg-primary text-primary-foreground rounded-full">
                                    {convo.unread}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground truncate">
                                {convo.lastMessage}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="unread" className="m-0">
                    <ScrollArea className="h-[calc(100vh-14rem)] md:h-[calc(100vh-16rem)]">
                      {conversations.filter(c => c.unread > 0).map((convo) => (
                        <div 
                          key={convo.id}
                          className={`
                            p-3 cursor-pointer hover:bg-muted/50 border-b 
                            ${activeChat === convo.id ? 'bg-muted' : ''}
                          `}
                          onClick={() => setActiveChat(convo.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{getInitials(convo.name)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-medium text-sm truncate">{convo.name}</h3>
                                <span className="inline-flex items-center justify-center h-5 w-5 text-xs bg-primary text-primary-foreground rounded-full">
                                  {convo.unread}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">
                                {convo.lastMessage}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Message Thread */}
            {(activeChat || !isMobile) && (
              <div className="flex-1 flex flex-col h-full">
                {activeChat ? (
                  <>
                    {/* Chat Header */}
                    <CardHeader className="flex-shrink-0 px-4 py-3 border-b">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          {isMobile && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setActiveChat(null)}
                              className="mr-1 p-0 h-8 w-8"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                              </svg>
                            </Button>
                          )}
                          <Avatar>
                            <AvatarFallback>
                              {getInitials(conversations.find(c => c.id === activeChat)?.name || "")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">
                              {conversations.find(c => c.id === activeChat)?.name}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground">
                              {conversations.find(c => c.id === activeChat)?.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {mockMessages.map((msg) => (
                          <div 
                            key={msg.id} 
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`
                                max-w-[80%] px-4 py-2 rounded-lg 
                                ${msg.sender === 'me' 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted'}
                              `}
                            >
                              <p className="text-sm mb-1">{msg.text}</p>
                              <p className="text-xs text-right opacity-70">{msg.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Message Input */}
                    <CardContent className="p-3 border-t">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="shrink-0">
                          <PlusCircle className="h-5 w-5" />
                        </Button>
                        <div className="relative flex-1">
                          <Input
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="pr-12"
                          />
                          <Button 
                            size="sm" 
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                            onClick={handleSendMessage}
                            disabled={!message.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-4">
                    <p className="text-muted-foreground mb-2">Select a conversation to start messaging</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MessagingPage;
