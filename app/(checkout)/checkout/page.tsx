"use client";

import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title,
} from "@/components/shared";

import { useCart } from "@/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/components/shared/checkout/checkout-form-schema";
import { cn } from "@/lib/utils";
import { createOrder } from "../../actions";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { API } from "@/services/api-client";

export default function Checkout() {
  const { items, loading, updateItemQuantity, removeCartItem, totalAmount } =
    useCart();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: session?.user?.name || "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.success("Order created successfully");

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  useEffect(() => {
    async function getUserInfo() {
      const user = await API.auth.getMe();
      const [firstName, lastName] = user.fullName.split(" ");

      form.setValue("firstName", firstName || "");
      form.setValue("lastName", lastName || "");
      form.setValue("email", user.email || "");
    }

    if (session) {
      getUserInfo();
    }
  }, [session]);

  return (
    <Container>
      <Title text="Checkout" size="lg" className="font-extrabold my-7" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />
              <CheckoutPersonalForm
                className={cn({ "opacity-40 pointer-events-none": loading })}
              />
              <CheckoutAddressForm
                className={cn({ "opacity-40 pointer-events-none": loading })}
              />
            </div>
            <div className="w-[450px]">
              <CheckoutSidebar
                submitting={submitting}
                totalAmount={totalAmount}
                loading={loading}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
