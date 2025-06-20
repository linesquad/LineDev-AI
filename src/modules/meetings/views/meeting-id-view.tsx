"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../ui/components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../ui/components/update-meeting-dialog copy";
import { useState } from "react";
import { UpcomingState } from "../ui/components/upcoming-state";
import { ActiveState } from "../ui/components/active-state";
import { CancelledState } from "../ui/components/cancelled-state";
import { ProcessingState } from "../ui/components/processing-state";
import { CompletedState } from "../ui/components/completed-state";

interface Props {
  meetingId: string;
}

export function MeetingIdView({ meetingId }: Props) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "The following action will remove this meeting"
  );
  const { data: meeting } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions()
        );
        router.push("/meetings");
        toast.success(`Meeting ${meeting.name} deleted successfully`);
      },
      onError: (error) => {
        toast.error(error?.message || "Something went wrong");
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeMeeting.mutateAsync({
      id: meetingId,
    });
  };

  const isActive = meeting.status === "active";
  const isUpcoming = meeting.status === "upcoming";
  const isProcessing = meeting.status === "processing";
  const isCompleted = meeting.status === "completed";
  const isCancelled = meeting.status === "cancelled";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
        initialValues={meeting}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={meeting.name}
          onEdit={() => setOpenUpdateDialog(true)}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && <CancelledState />}
        {isCompleted && <CompletedState meeting={meeting} />}
        {isProcessing && <ProcessingState />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
        {isActive && <ActiveState meetingId={meetingId} />}
      </div>
    </>
  );
}

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take few seconds"
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Failed to load meeting"
      description="Something went wrong | Contact support"
    />
  );
};
