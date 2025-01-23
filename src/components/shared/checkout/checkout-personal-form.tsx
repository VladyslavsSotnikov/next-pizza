import { WhiteBlock, FormInput } from "@/components/shared";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm = ({ className }: Props) => {
  return (
    <WhiteBlock title="2. Personal details" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" placeholder="First name" />
        <FormInput name="lastName" placeholder="Last name" />
        <FormInput name="email" placeholder="Email" />
        <FormInput name="phone" placeholder="Phone" />
      </div>
    </WhiteBlock>
  );
};
