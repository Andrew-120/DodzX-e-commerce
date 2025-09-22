"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useActionState } from "react";

import UpdateUserForm from "@/components/forms/UpdateUserForm";
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";

import {
  formState as userFormState,
  UpdateUserFormSchema,
  UpdateUserSchema,
} from "@/schema/updateUser.schema";
import { handleUpdateUser } from "@/services/updateUser.service";

import {
  formState as passwordFormState,
  UpdatePasswordFormSchema,
  UpdatePasswordSchema,
} from "@/schema/updatePassword.schema";
import { handleUpdatePassword } from "@/services/updatePassword.service";

export default function ProfilePage() {
  const { data: session } = useSession();

  // --- Update User ---
  const [userAction, userFormAction, isUserPending] = useActionState(
    handleUpdateUser,
    userFormState
  );

  const userForm = useForm<UpdateUserSchema>({
    resolver: zodResolver(UpdateUserFormSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
      phone: "",
    },
  });

  useEffect(() => {
    if (userAction?.message) {
      if (userAction.success) {
        toast.success(userAction.message, { position: "top-center" });
        userForm.reset(); // reset form
      } else {
        toast.error(userAction.message, { position: "top-center" });
      }
    }
  }, [userAction, userForm]);

  // --- Update Password ---
  const [passwordAction, passwordFormAction, isPasswordPending] = useActionState(
    handleUpdatePassword,
    passwordFormState
  );

  const passwordForm = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  useEffect(() => {
    if (passwordAction?.message) {
      if (passwordAction.success) {
        toast.success(passwordAction.message, { position: "top-center" });
        passwordForm.reset();
      } else {
        toast.error(passwordAction.message, { position: "top-center" });
      }
    }
  }, [passwordAction, passwordForm]);

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="info">Profile Info</TabsTrigger>
                <TabsTrigger value="update-profile">Update Profile</TabsTrigger>
                <TabsTrigger value="update-password">Update Password</TabsTrigger>
              </TabsList>

              {/* Profile Info Tab */}
              <TabsContent value="info">
                {session?.user ? (
                  <div className="space-y-3">
                    <p><span className="font-semibold">Name:</span> {session.user.name}</p>
                    <p><span className="font-semibold">Email:</span> {session.user.email}</p>
                    <p><span className="font-semibold">Role:</span> {session.user.role}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No user data available.</p>
                )}
              </TabsContent>

              {/* Update Profile Tab */}
              <TabsContent value="update-profile">
                <UpdateUserForm
                  form={userForm}
                  formAction={userFormAction}
                  action={userAction}
                  isPending={isUserPending}
                />
              </TabsContent>

              {/* Update Password Tab */}
              <TabsContent value="update-password">
                <UpdatePasswordForm
                  form={passwordForm}
                  formAction={passwordFormAction}
                  action={passwordAction}
                  isPending={isPasswordPending}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
