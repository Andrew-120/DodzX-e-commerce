"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormPayload, LoginFormSchema } from "@/schema/login.schema";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
   const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormPayload>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  });

 

  async function onSubmit(values: LoginFormPayload) {
    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
          callbackUrl: "/",
        });

        console.log(res);

        if (res?.ok) {
          toast.success("Login successful", {
            position: "top-center",
          });

          router.push("/");
        } else {
          toast.error(res?.error || "Failed to login", {
            position: "top-center",
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-bold text-3xl mb-8">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/************************** Email Field **************************/}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="username@domain.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/************************** Password Field **************************/}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*************"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit">{isPending ? <LoaderCircle className="animate-spin" /> : "Login"}</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
