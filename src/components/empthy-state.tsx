import Image from "next/image";

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={"/logo.svg"}
        alt="Empty State"
        width={240}
        height={240}
        className="opacity-50"
      />
      <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center mt-20">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
