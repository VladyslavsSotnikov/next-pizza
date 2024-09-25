import { Container, Filters, ProductCart, Title, TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";

const pizzas = [
  {
    id: 1,
    name: "Pizza chiken",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif",
    ingredients: [],
    items: [{ price: 10 }],
  },
  {
    id: 2,
    name: "Pizza chiken",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif",
    ingredients: [],
    items: [{ price: 10 }],
  },
  {
    id: 3,
    name: "Pizza chiken",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif",
    ingredients: [],
    items: [{ price: 10 }],
  },
  {
    id: 4,
    name: "Pizza chiken",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif",
    ingredients: [],
    items: [{ price: 10 }],
  },
  {
    id: 5,
    name: "Pizza chiken",
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif",
    ingredients: [],
    items: [{ price: 10 }],
  },
];

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          {/* Filter */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* PLP */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Pizzas" items={pizzas} categoryId={1} />
              <ProductsGroupList title="Breakfast" items={pizzas} categoryId={1} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
