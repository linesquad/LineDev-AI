import { EmptyState } from "@/components/empthy-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoIcon } from "lucide-react";

interface ActiveStateProps {
  meetingId: string;
}

export const ActiveState = ({ meetingId }: ActiveStateProps) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Meeting is active"
        description="The meeting is currently active. You can end it by clicking the button below."
      />
      <div className=" flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
