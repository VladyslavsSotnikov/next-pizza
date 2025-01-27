type Props = {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
};

export const PayOrderTemplate = ({
  orderId,
  totalAmount,
  paymentUrl,
}: Props) => {
  return (
    <div>
      <h1>Order #{orderId}</h1>

      <p>
        Please pay your order amount of <b>${totalAmount}</b>. You can complete
        your payment using <a href={paymentUrl}>this link</a>.
      </p>
    </div>
  );
};
