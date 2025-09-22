"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useActionState, useEffect, useTransition } from "react";
import {
  formState,
  UpdatePasswordFormSchema,
  UpdatePasswordSchema,
} from "@/schema/updatePassword.schema";
import { handleUpdatePassword } from "@/services/updatePassword.service";
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";

export default function UpdatePasswordPage() {
  const [action, formAction] = useActionState(handleUpdatePassword, formState);
  const [isPending] = useTransition();

  const form = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, { position: "top-center" });
      }

      if (action.success && action.message) {
        toast.success(action.message, { position: "top-center" });
        form.reset();
      }
    }
  }, [action, form]);

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <UpdatePasswordForm
          form={form}
          formAction={formAction}
          action={action}
          isPending={isPending}
        />
      </div>
    </section>
  );
}
