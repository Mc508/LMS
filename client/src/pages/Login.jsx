import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  const [login, setLogin] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignup({ ...signup, [name]: value });
    } else {
      setLogin({ ...login, [name]: value });
    }
  };

  const handleSignup = async (type) => {
    const inputData = type === "signup" ? signup : login;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup Successfully");
    }
    if (registerError) {
      toast.error(registerError.message || "Signup failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login Successfully");
    }
    if (loginError) {
      toast.error(loginError.message || "Login failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
    loginIsSuccess,
    registerIsSuccess,
  ]);

  return (
    <div className="flex items-center justify-center w-full">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create your account get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => handleChange(e, "signup")}
                  name="name"
                  value={signup.name}
                  placeholder="Pedro Duarte"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Username</Label>
                <Input
                  onChange={(e) => handleChange(e, "signup")}
                  name="email"
                  value={signup.email}
                  placeholder="email@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => handleChange(e, "signup")}
                  name="password"
                  value={signup.password}
                  type="password"
                  placeholder="password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleSignup("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Username</Label>
                <Input
                  onChange={(e) => handleChange(e, "login")}
                  name="email"
                  value={login.email}
                  placeholder="email@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => handleChange(e, "login")}
                  name="password"
                  value={login.password}
                  type="password"
                  placeholder="password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleSignup("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
