import { Container, Header } from "@/components/shared";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next Pizza | Checkout",
  description: "Next Pizza Checkout",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Header
            className="border-b border-b-neutral-200"
            hasSearch={false}
            hasCart={false}
          />
        </Suspense>
        {children}
      </Container>
    </main>
  );
}
