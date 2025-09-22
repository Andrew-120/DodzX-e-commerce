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
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import {
  addressFormSchema,
  addressFormState,
  addressFormType,
  addressFormStateType,
} from "@/schema/address.schema";
import { handlePayment } from "@/services/order.service";
import { useCart } from "@/context/CartContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutPage() {
  const [action, formAction] = useActionState(
    async (_: addressFormStateType, formData: FormData) => {
      return await handlePayment(addressFormState, formData);
    },
    addressFormState
  );

  const router = useRouter();
  const { cartDetails, setCartDetails } = useCart();
  const [isPending, startTransition] = useTransition();

  const form = useForm<addressFormType>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      cartId: "",
      details: "",
      city: "",
      phone: "",
      paymentMethod: "cash",
    },
  });

  
  useEffect(() => {
    if (cartDetails?.cartId) {
      form.setValue("cartId", cartDetails.cartId);
    }
  }, [cartDetails, form]);

  // handle action result
  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (action?.message) {
      if (action.success) {
        if (form.getValues("paymentMethod") === "cash") {
          toast.success(action.message, { position: "top-center" });
          setCartDetails(null);
          timeout = setTimeout(() => {
            router.push(action.callbackUrl || "/allorders");
          }, 1200);
        } else {
          if (action.callbackUrl) {
            window.location.href = action.callbackUrl;
          }
        }
      } else {
        toast.error(action.message, { position: "top-center" });
      }
    }

    return () => timeout && clearTimeout(timeout);
  }, [action, router, setCartDetails, form]);

  // ✅ new submit handler bridging RHF -> FormData -> useActionState
  const onSubmit = (values: addressFormType) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) =>
      formData.append(key, val as string)
    );
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-bold text-3xl mb-8">Checkout</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <input type="hidden" {...form.register("cartId")} />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Details</FormLabel>
                  <FormControl>
                    <Input placeholder="address details" {...field} />
                  </FormControl>
                  <FormMessage>
                    {action?.error?.details?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="city name" {...field} />
                  </FormControl>
                  <FormMessage>{action?.error?.city?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="01012345678" type="tel" {...field} />
                  </FormControl>
                  <FormMessage>{action?.error?.phone?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="cash" />
                        </FormControl>
                        <FormLabel className="font-normal">Cash</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="card" />
                        </FormControl>
                        <FormLabel className="font-normal">Card</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage>
                    {action?.error?.paymentMethod?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit">
              {isPending ? <LoaderCircle className="animate-spin" /> : "Checkout"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
