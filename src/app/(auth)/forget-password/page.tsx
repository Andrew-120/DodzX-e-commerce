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
import { toast } from "sonner";
import { useActionState, useEffect, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import {
  formState,
  ForgetPasswordFormSchema,
  ForgetPasswordSchema,
} from "@/schema/forgetPassword.schema";
import { handleForgetPassword } from "@/services/forgetPassword.service";

export default function ForgetPasswordPage() {
  const [action, formAction] = useActionState(
    handleForgetPassword,
    formState
  );
  const [isPending] = useTransition();

  const form = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(ForgetPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, { position: "top-center" });
      }

      if (action.success && action.message) {
        toast.success(action.message, { position: "top-center" });
      }
    }
  }, [action]);

  return (
    <section className="py-20">
      <div className="max-w-md mx-auto">
        <h1 className="font-bold text-3xl mb-8">Forgot Password</h1>
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username@domain.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage>{action.error?.email?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit">
              {isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
