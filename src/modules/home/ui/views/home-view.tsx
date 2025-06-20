"use client";

import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export const HomeView = () => {
  const trpc = useTRPC();
  const { data, isPending } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
    })
  );

  if (isPending) {
    <LoadingState
      title="Loading agents"
      description="Please wait while we load your agents"
    />;
  }

  return (
    <div className="flex-1 p-8 bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2d3748] mb-4">
            AI Meeting Assistant
          </h1>
          <p className="text-xl text-[#4a5568]">
            Schedule, manage and analyze your meetings with AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#e2e8f0]">
            <h3 className="text-lg font-semibold text-[#2d3748] mb-3">
              Create Meetings
            </h3>
            <p className="text-[#4a5568]">
              Schedule new meetings with your AI assistants
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-[#e2e8f0]">
            <h3 className="text-lg font-semibold text-[#2d3748] mb-3">
              Manage Agents
            </h3>
            <p className="text-[#4a5568]">
              Configure and customize your AI meeting assistants
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-[#e2e8f0]">
            <h3 className="text-lg font-semibold text-[#2d3748] mb-3">
              View History
            </h3>
            <p className="text-[#4a5568]">
              Review past meetings and transcripts
            </p>
          </div>
        </div>

        <div className="mt-12 bg-green-700 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Started</h2>
          <p className="mb-6">
            Start your first AI-powered meeting in just a few clicks
          </p>
          <button className="bg-white text-green-700 px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
            <Link href={data?.items.length === 0 ? "/agents" : "/agents"}>
              {data?.items.length === 0
                ? "Create Agent"
                : `Manage ${data?.items.length} Agents`}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
