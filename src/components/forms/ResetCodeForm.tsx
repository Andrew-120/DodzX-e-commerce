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
import { ResetCodeSchema } from "@/schema/resetCode.schema";

type ResetCodeFormProps = {
  form: UseFormReturn<ResetCodeSchema>;
  formAction: (formData: FormData) => void;
  action: {
    success: boolean;
    error?: { resetCode?: string[] };
    message: string | null;
  };
  isPending: boolean;
};

export default function ResetCodeForm({
  form,
  formAction,
  action,
  isPending,
}: ResetCodeFormProps) {
  return (
    <>
      <h1 className="font-bold text-3xl mb-8">Verify Reset Code</h1>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          {/* Reset Code */}
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reset Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter 6-digit code" {...field} />
                </FormControl>
                <FormMessage>{action.error?.resetCode?.[0]}</FormMessage>
              </FormItem>
            )}
          />

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Verify Code"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
