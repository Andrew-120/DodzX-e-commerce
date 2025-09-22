"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useActionState, useEffect, useTransition } from "react";
import {
  formState,
  ResetCodeFormSchema,
  ResetCodeSchema,
} from "@/schema/resetCode.schema";
import { handleVerifyResetCode } from "@/services/resetCode.service";
import { useRouter } from "next/navigation";
import ResetCodeForm from "@/components/forms/ResetCodeForm";

export default function ResetCodePage() {
  const [action, formAction] = useActionState(
    handleVerifyResetCode,
    formState
  );
  const [isPending] = useTransition();
  const router = useRouter();

  const form = useForm<ResetCodeSchema>({
    resolver: zodResolver(ResetCodeFormSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, { position: "top-center" });
      }

      if (action.success && action.message) {
        toast.success(action.message, { position: "top-center" });
        router.push("/reset-password");
      }
    }
  }, [action, router]);

  return (
    <section className="py-20">
      <div className="max-w-md mx-auto">
       <ResetCodeForm form={form} formAction={formAction} action={action} isPending={isPending} />
      </div>
    </section>
  );
}
