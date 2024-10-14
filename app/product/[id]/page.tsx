import { Container, GroupVariants, PizzaImage, Title } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} size={40} />
        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />
          <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
          <GroupVariants
            selectedValue="2"
            items={[
              { name: "Small", value: "1" },
              { name: "Medium", value: "2" },
              { name: "Large", value: "3", disabled: true },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
