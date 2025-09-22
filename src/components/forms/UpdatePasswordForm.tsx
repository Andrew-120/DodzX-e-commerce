"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
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
import { UpdatePasswordSchema } from "@/schema/updatePassword.schema";

interface UpdatePasswordFormProps {
  form: UseFormReturn<UpdatePasswordSchema>;
  formAction: (formData: FormData) => void;
  action: {
    error?: {
      currentPassword?: string[];
      password?: string[];
      rePassword?: string[];
    };
  };
  isPending: boolean;
}

export default function UpdatePasswordForm({
  form,
  formAction,
  action,
  isPending,
}: UpdatePasswordFormProps) {
  return (
    <>
      <h1 className="font-bold text-3xl mb-8">Update Password</h1>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          {/* Current Password */}
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*************"
                    {...field}
                    type="password"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage>{action?.error?.currentPassword?.[0]}</FormMessage>
              </FormItem>
            )}
          />

          {/* New Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*************"
                    {...field}
                    type="password"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage>{action?.error?.password?.[0]}</FormMessage>
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*************"
                    {...field}
                    type="password"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage>{action?.error?.rePassword?.[0]}</FormMessage>
              </FormItem>
            )}
          />

          <Button disabled={isPending} type="submit">
            {isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
