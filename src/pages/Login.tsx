
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/lib/firebase";
import { loginSchema, LoginFormValues } from "@/lib/validations";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, LogIn } from "lucide-react";

import logo from "@/assets/logo.svg";
import SignupForm from "@/components/auth/SignupForm";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { startDemo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Login form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handle login form submission
  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      await loginUser(values.email, values.password, values.rememberMe);
      toast({
        title: "Login successful",
        description: "Welcome back to EduHub!",
      });
      navigate("/home");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle demo mode
  const handleDemoLogin = (role: "student" | "teacher" | "school") => {
    startDemo(role);
    toast({
      title: "Demo mode activated",
      description: `You're now browsing as a demo ${role}. You have 10 minutes to explore.`,
    });
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-eduBlue/10 to-eduPurple/10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 mb-2 bg-gradient-to-r from-eduPurple to-eduBlue rounded-lg flex items-center justify-center text-white text-xl font-bold">
              E
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">EduHub</h1>
          <p className="text-muted-foreground">Connect, Learn, Grow</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Remember me
                            </FormLabel>
                            <FormDescription>
                              Stay logged in on this device
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or try demo mode
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 w-full">
                  <Button 
                    variant="outline" 
                    onClick={() => handleDemoLogin("student")}
                    className="text-xs"
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    Student
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDemoLogin("teacher")}
                    className="text-xs"
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    Teacher
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDemoLogin("school")}
                    className="text-xs"
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    School
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
