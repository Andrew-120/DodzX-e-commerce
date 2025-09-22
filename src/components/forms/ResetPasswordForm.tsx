"use client";

import React from "react";
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
import { LoaderCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ResetPasswordSchema } from "@/schema/resetPassword.schema";

type ResetPasswordFormProps = {
  form: UseFormReturn<ResetPasswordSchema>;
  formAction: (payload: FormData) => void;
  action: {
    success: boolean;
    error: {
      email?: string[];
      newPassword?: string[];
      confirmPassword?: string[];
    };
    message: string | null;
  };
  isPending: boolean;
};

export default function ResetPasswordForm({
  form,
  formAction,
  action,
  isPending,
}: ResetPasswordFormProps) {
  return (
    <>
      <h1 className="font-bold text-3xl mb-8">Reset Password</h1>
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
                  <Input placeholder="username@domain.com" {...field} />
                </FormControl>
                <FormMessage>{action.error?.email?.[0]}</FormMessage>
              </FormItem>
            )}
          />

          {/* New Password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage>{action.error?.newPassword?.[0]}</FormMessage>
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage>{action.error?.confirmPassword?.[0]}</FormMessage>
              </FormItem>
            )}
          />

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
