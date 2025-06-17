import { EmptyState } from "@/components/empthy-state";

export const ProcessingState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Meeting completed"
        description="The meeting is completed. a summary will appera soon"
      />
    </div>
  );
};
