import { InfoBlock } from "@/components/shared";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Page not found"
        text="The page you are looking for does not exist"
        imageUrl="/assets/images/not-found.png"
      />
    </div>
  );
}
