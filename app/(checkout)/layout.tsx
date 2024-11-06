import { Container, Header } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Pizza | Checkout",
  description: "Next Pizza Checkout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container className="">
        <Header className="border-b border-b-neutral-200" hasSearch={false} hasCart={false} />
        {children}
      </Container>
    </main>
  );
}
