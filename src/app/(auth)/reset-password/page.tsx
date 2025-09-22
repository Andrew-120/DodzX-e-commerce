"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";
import {
  formState,
  ResetPasswordFormSchema,
  ResetPasswordSchema,
} from "@/schema/resetPassword.schema";
import { handleResetPassword } from "@/services/resetPassword.service";
import { useRouter } from "next/navigation";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

export default function ResetPasswordPage() {
  const [action, formAction, isPending] = useActionState(
    handleResetPassword,
    formState
  );
  const router = useRouter();

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, { position: "top-center" });
      }

      if (action.success && action.message) {
        toast.success(action.message, { position: "top-center" });
        router.push("/login");
      }
    }
  }, [action, router]);

  return (
    <section className="py-20">
      <div className="max-w-md mx-auto">
        <ResetPasswordForm
          form={form}
          formAction={formAction}
          action={action}
          isPending={isPending}
        />
      </div>
    </section>
  );
}
