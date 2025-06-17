import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  MeetingIdView,
  MeetingIdViewError,
  MeetingIdViewLoading,
} from "../../../../modules/meetings/views/meeting-id-view";

interface MeetingPageProps {
  params: Promise<{
    meetingId: string;
  }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { meetingId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );

  // TODO: prefetch get meetings.transcript

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingIdViewLoading />}>
        <ErrorBoundary fallback={<MeetingIdViewError />}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
