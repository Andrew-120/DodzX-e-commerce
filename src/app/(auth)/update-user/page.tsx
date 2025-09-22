"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useActionState, useEffect, useTransition } from "react";
import {
  formState,
  UpdateUserFormSchema,
  UpdateUserSchema,
} from "@/schema/updateUser.schema";
import { handleUpdateUser } from "@/services/updateUser.service";
import UpdateUserForm from "@/components/forms/UpdateUserForm";

export default function UpdateUserPage() {
  const [action, formAction] = useActionState(handleUpdateUser, formState);
  const [isPending] = useTransition();

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(UpdateUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
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
        <UpdateUserForm
          form={form}
          formAction={formAction}
          action={action}
          isPending={isPending}
        />
      </div>
    </section>
  );
}
