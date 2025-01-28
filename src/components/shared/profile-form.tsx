"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterSchema, registerSchema } from "./modals/auth/forms/schemas";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form-components";
import { Button } from "../ui/button";
import { updateUser } from "../../../app/actions";
import { toast } from "react-hot-toast";

type ProfileFormProps = {
  data: User;
};

export const ProfileForm = ({ data }: ProfileFormProps) => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    console.log("[ProfileForm] onSubmit >>>>", data);
    try {
      await updateUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      toast.success("User updated successfully", {
        icon: "🎉",
      });
    } catch (error) {
      console.log("[Update user] Client error >>>>", error);
      toast.error("Failed to update user", {
        icon: "❌",
      });
    }
  };

  const onClickSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Container className="my-10">
      <Title
        text={`Personal data | #${data.id}`}
        size="md"
        className="font-bold"
      />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Full name" required />

          <FormInput
            type="password"
            name="password"
            label="New password"
            required
          />
          <FormInput
            type="password"
            name="passwordConfirmation"
            label="Repeat password"
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Save
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Sign out
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
