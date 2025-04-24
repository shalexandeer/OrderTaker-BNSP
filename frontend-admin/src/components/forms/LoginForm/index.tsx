import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./schema";
import { useAuth } from "../../../provider/AuthProvider";
import { useLogin } from "@/services/Auth/Auth.query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { Link } from "react-router-dom";
import { PasswordInput } from "@/components/custom/password-input";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [isLoginDisable, setIsLoginDisable] = useState<boolean>(false);

  const loginMutation = useLogin({
    onSuccess: ({ data }: AuthResponse) => {
      toast({title: "Login Berhasil", style: {backgroundColor: 'green'}});
      setTimeout(() => {
        login(data);
      }, 1500);
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
       toast({ title: responseStatus, style: {backgroundColor: 'red'} });
      setTimeout(() => {
        setIsLoginDisable(false);
      }, 3000)
      },
  });

  const { mutate: doLogin, isPending} = loginMutation;

  const form = useForm<LoginBody>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<LoginBody> = (data) => {
    setIsLoginDisable(true);
    doLogin(data);
  };

  return (
    <Form {...form}>
      <form
        className="mt-5 w-full space-y-2 sm:mt-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Username..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <div className='flex items-center justify-between'>
                  <FormLabel>Password</FormLabel>
                  <Link
                    to='/forgot-password'
                    className='text-sm font-medium text-muted-foreground hover:opacity-75'
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput placeholder='********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-6" disabled={isPending || isLoginDisable} loading={isPending}>
            Login
          </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
