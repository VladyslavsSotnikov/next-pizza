import { WhiteBlock, FormInput, FormTextarea } from "@/components/shared";

interface Props {
  className?: string;
}

export const CheckoutAddressForm = ({ className }: Props) => {
  return (
    <WhiteBlock title="3. Delivery address" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput name="address" placeholder="Address" />
        <FormTextarea name="comment" placeholder="Comment..." />
      </div>
    </WhiteBlock>
  );
};
