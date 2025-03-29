
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { registerUser, db } from "@/lib/firebase";
import { 
  studentSchema, 
  teacherSchema, 
  schoolSchema,
  StudentFormValues,
  TeacherFormValues,
  SchoolFormValues
} from "@/lib/validations";
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"student" | "teacher" | "school">("student");
  const [isLoading, setIsLoading] = useState(false);

  // Student form
  const studentForm = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      role: "student",
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      location: "",
      age: undefined,
      grade: "",
      schoolName: "",
    },
  });

  // Teacher form
  const teacherForm = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      role: "teacher",
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      location: "",
      teachingGrades: [],
      teachingSchool: "",
    },
  });

  // School form
  const schoolForm = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      role: "school",
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      location: "",
      ceoName: "",
    },
  });

  // Handle student form submission
  const onStudentSubmit = async (values: StudentFormValues) => {
    setIsLoading(true);
    try {
      const userCredential = await registerUser(values.email, values.password);
      const uid = userCredential.user.uid;
      
      // Save user profile to Firestore
      await setDoc(doc(db, "users", uid), {
        ...values,
        uid,
      });
      
      toast({
        title: "Account created",
        description: "You can now login with your new account",
      });
      
      navigate("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "There was a problem creating your account.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle teacher form submission
  const onTeacherSubmit = async (values: TeacherFormValues) => {
    setIsLoading(true);
    try {
      const userCredential = await registerUser(values.email, values.password);
      const uid = userCredential.user.uid;
      
      // Save user profile to Firestore
      await setDoc(doc(db, "users", uid), {
        ...values,
        uid,
      });
      
      toast({
        title: "Account created",
        description: "You can now login with your new account",
      });
      
      navigate("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "There was a problem creating your account.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle school form submission
  const onSchoolSubmit = async (values: SchoolFormValues) => {
    setIsLoading(true);
    try {
      const userCredential = await registerUser(values.email, values.password);
      const uid = userCredential.user.uid;
      
      // Save user profile to Firestore
      await setDoc(doc(db, "users", uid), {
        ...values,
        uid,
      });
      
      toast({
        title: "Account created",
        description: "You can now login with your new account",
      });
      
      navigate("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "There was a problem creating your account.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Select your account type and fill in the required information
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={userType} onValueChange={(value) => setUserType(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
            <TabsTrigger value="school">School</TabsTrigger>
          </TabsList>

          <TabsContent value="student" className="px-6 py-4">
            <Form {...studentForm}>
              <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={studentForm.control}
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
                    control={studentForm.control}
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
                </div>

                <FormField
                  control={studentForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={studentForm.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="15" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={studentForm.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your grade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                              <SelectItem key={grade} value={grade.toString()}>
                                Grade {grade}
                              </SelectItem>
                            ))}
                            <SelectItem value="college">College</SelectItem>
                            <SelectItem value="university">University</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={studentForm.control}
                  name="schoolName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Springfield High School" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={studentForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Living Place</FormLabel>
                        <FormControl>
                          <Input placeholder="Springfield, IL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={studentForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Student Account"}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="teacher" className="px-6 py-4">
            <Form {...teacherForm}>
              <form onSubmit={teacherForm.handleSubmit(onTeacherSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={teacherForm.control}
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
                    control={teacherForm.control}
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
                </div>

                <FormField
                  control={teacherForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={teacherForm.control}
                  name="teachingSchool"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Springfield High School" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={teacherForm.control}
                  name="teachingGrades"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grades You Teach</FormLabel>
                      <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                          <FormItem key={grade} className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value.includes(grade.toString())}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, grade.toString()]);
                                  } else {
                                    field.onChange(
                                      field.value.filter((value) => value !== grade.toString())
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm">{grade}</FormLabel>
                          </FormItem>
                        ))}
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value.includes("college")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, "college"]);
                                } else {
                                  field.onChange(
                                    field.value.filter((value) => value !== "college")
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm">College</FormLabel>
                        </FormItem>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={teacherForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Living Place</FormLabel>
                        <FormControl>
                          <Input placeholder="Springfield, IL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={teacherForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Teacher Account"}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="school" className="px-6 py-4">
            <Form {...schoolForm}>
              <form onSubmit={schoolForm.handleSubmit(onSchoolSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={schoolForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="school@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={schoolForm.control}
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
                </div>

                <FormField
                  control={schoolForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Springfield High School" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={schoolForm.control}
                  name="ceoName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Principal/CEO Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Principal Skinner" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={schoolForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Springfield, IL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={schoolForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create School Account"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
