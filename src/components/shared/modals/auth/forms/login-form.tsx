import { FormProvider, useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/components/shared/title";
import { FormInput } from "@/components/shared/form-components";
import { Button } from "@/components/ui";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

interface LoginFormProps {
  onClose: () => void;
}

export const LoginForm = ({ onClose }: LoginFormProps) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res?.ok) {
        throw new Error();
      }

      toast.success("Successfully logged in", {
        icon: "🎉",
      });
      onClose();
    } catch (error) {
      console.log("Error [LOGIN]", error);
      toast.error("Failed to enter the account", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Login" size="md" className="font-bold" />
            <p className="text-gray-400">
              Enter your email to login to your account
            </p>
          </div>
        </div>
        <FormInput
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          required
        />
        <FormInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          required
        />
        <Button
          loading={form.formState.isSubmitting}
          type="submit"
          className="h-12 text-base"
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
};
