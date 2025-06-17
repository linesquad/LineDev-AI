import { EmptyState } from "@/components/empthy-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoIcon, BanIcon } from "lucide-react";

interface UpcomingStateProps {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
}

export const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCancelling,
}: UpcomingStateProps) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Not Started yet"
        description="Once you start the meeting, a summary will appera here"
      />
      <div className=" flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button
          variant={"secondary"}
          className="w-full lg:w-auto"
          onClick={onCancelMeeting}
          disabled={isCancelling}
        >
          <BanIcon />
          Cancel meeting
        </Button>
        <Button asChild className="w-full lg:w-auto" disabled={isCancelling}>
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
