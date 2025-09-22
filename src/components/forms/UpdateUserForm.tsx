"use client";

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
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { UpdateUserSchema } from "@/schema/updateUser.schema";

interface UpdateUserFormProps {
  form: UseFormReturn<UpdateUserSchema>;
  formAction: (formData: FormData) => void;
  action: {
    error?: {
      name?: string[];
      email?: string[];
      phone?: string[];
    };
  };
  isPending: boolean;
}

export default function UpdateUserForm({
  form,
  formAction,
  action,
  isPending,
}: UpdateUserFormProps) {
  return (
    <>
      <h1 className="font-bold text-3xl mb-8">Update Profile</h1>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage>{action?.error?.name?.[0]}</FormMessage>
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage>{action?.error?.email?.[0]}</FormMessage>
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage>{action?.error?.phone?.[0]}</FormMessage>
              </FormItem>
            )}
          />

          <Button disabled={isPending} type="submit">
            {isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Update Profile"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
