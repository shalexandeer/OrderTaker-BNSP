import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useLogin } from "@/services/auth/mutations";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AxiosError } from "axios";
import { ApiResponse } from "@/lib/types/api";
import { useSearchParams } from "react-router-dom";
import { ListOrdered } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
  password: z.string().min(3, "Password harus diisi minimal 8 karakter"),
});

type FormValues = z.infer<typeof formSchema>;

function Login() {
  const [params] = useSearchParams();
  const redirect = params.get("redirect");

  const loginMutation = useLogin();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: FormValues) => {
    loginMutation.mutateAsync(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (_) => {
          toast.success("Berhasil Login");
          window.location.href = redirect || "/orders";
        },
        onError: (error: AxiosError<ApiResponse<boolean>>) => {
          toast.error(error.response?.data.message);
        },
      }
    );
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      window.location.href = redirect || "/orders";
      return;
    }
  }, [redirect]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ListOrdered className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-4 text-3xl font-display font-bold tracking-tight">
            Order Taker
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Your Order Taker Admin Dashboard
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Masuk ke dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan email"
                          type="email"
                          {...field}
                        />
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
                      <FormLabel>
                        Password <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  className="w-full mt-4 transition-all duration-300"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2023 Waste Master. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
