import { Metadata } from "next";
import { Header } from "@/components/shared";

export const metadata: Metadata = {
  title: "Next Pizza | Homepage",
  description: "Next Pizza",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      {modal}
    </main>
  );
}
