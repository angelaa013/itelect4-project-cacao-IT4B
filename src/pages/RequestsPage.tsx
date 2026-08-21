import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../api/client";
import AdoptionRequestCard from "../components/AdoptionRequestCard";
import { AdoptionStatus, type AdoptionRequest } from "../types";

function RequestsPage() {
  const [filterStatus] = useState<AdoptionStatus | "all">("all");

  const { data: requests = [], isLoading, isError } = useQuery<AdoptionRequest[]>({
    queryKey: ['requests'],
    queryFn: getRequests
  });

  const filteredRequests =
    filterStatus === "all"
      ? requests
      : requests.filter((req) => req.status === filterStatus);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading requests</div>;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#3D0C02] dark:text-[#FAAB18] uppercase tracking-tight">
          📋 Adoption Requests
        </h1>
        <p className="text-[#3D0C02]/70 dark:text-[#FFFDF3]/70 font-semibold mt-1">
          {filteredRequests.length} request
          {filteredRequests.length !== 1 ? "s" : ""} in the system
        </p>
      </div>

      {/* Requests Grid */}
      <section>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <p className="text-xl font-black text-[#3D0C02] dark:text-[#FAAB18]">Loading requests...</p>
          </div>
        ) : isError ? (
          <div className="flex justify-center py-12">
            <p className="text-xl font-black text-red-500">Error loading requests.</p>
          </div>
        ) : filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request) => (
              <AdoptionRequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <div className="bg-[#FEF2D6] dark:bg-[#2B1517] border-2 border-[#FAAB18] rounded-3xl p-8 text-center">
            <p className="text-[#3D0C02] dark:text-[#FAAB18] font-black text-xl">
              No adoption requests yet
            </p>
            <p className="text-[#3D0C02]/70 dark:text-[#FFFDF3]/70 mt-2 font-semibold">
              Submit your first request from the Pets page!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default RequestsPage;
