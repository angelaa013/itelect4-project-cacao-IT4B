import AdoptionRequestCard from "../components/AdoptionRequestCard";
import { initialRequests } from "../data/mockData";

function RequestsPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#3D0C02] dark:text-[#FAAB18] uppercase tracking-tight">
          📋 Adoption Requests
        </h1>
        <p className="text-[#3D0C02]/70 dark:text-[#FFFDF3]/70 font-semibold mt-1">
          {initialRequests.length} request
          {initialRequests.length !== 1 ? "s" : ""} in the system
        </p>
      </div>

      {/* Requests Grid */}
      <section>
        {initialRequests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialRequests.map((request) => (
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
