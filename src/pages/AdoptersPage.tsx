import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdopters } from "../api/client";
import type { Adopter } from "../types";

function AdoptersPage() {
  const [searchTerm] = useState("");
  const [selectedAdopter, setSelectedAdopter] = useState<Adopter | null>(null);

  const { data: adopters = [], isLoading, isError } = useQuery<Adopter[]>({
    queryKey: ['adopters'],
    queryFn: getAdopters
  });

  const filteredAdopters = adopters.filter((adopter) =>
    adopter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#3D0C02] dark:text-[#FA799F] uppercase tracking-tight">
          👤 Adopters
        </h1>
        <p className="text-[#3D0C02]/70 dark:text-[#FFFDF3]/70 font-semibold mt-1">
          {filteredAdopters.length} adopter{filteredAdopters.length !== 1 ? "s" : ""} in our system
        </p>
      </div>

      {/* Adopters List */}
      <section>
        <div className="mx-auto w-full max-w-3xl bg-white dark:bg-[#2B1517] rounded-3xl shadow-sm border-2 border-[#3D0C02]/10 dark:border-[#FAAB18]/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FEF2D6] dark:bg-[#1E0C0E] border-b-2 border-[#3D0C02]/10 dark:border-[#FAAB18]/20">
                  <th className="py-4 px-6 font-black text-[#3D0C02] dark:text-[#FAAB18] uppercase tracking-wider text-sm">
                    Name
                  </th>
                  <th className="py-4 px-6 font-black text-[#3D0C02] dark:text-[#FAAB18] uppercase tracking-wider text-sm text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={2} className="py-12 text-center text-[#3D0C02]/60 dark:text-[#FFFDF3]/60 font-bold">
                      Loading adopters...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={2} className="py-12 text-center text-red-500 font-bold">
                      Error loading adopters.
                    </td>
                  </tr>
                ) : filteredAdopters.length > 0 ? (
                  filteredAdopters.map((adopter) => (
                    <tr
                      key={adopter.id}
                      className="border-b border-[#3D0C02]/5 dark:border-[#FAAB18]/10 hover:bg-[#FDE8F0]/50 dark:hover:bg-[#3D0C02]/30 transition-colors"
                    >
                      <td className="py-4 px-6 font-bold text-[#3D0C02] dark:text-[#FFFDF3]">
                        {adopter.name}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedAdopter(adopter)}
                          className="text-sm font-bold text-[#FA799F] hover:text-[#3D0C02] dark:hover:text-[#FAAB18] transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="py-12 text-center text-[#3D0C02]/60 dark:text-[#FFFDF3]/60 font-bold">
                      No adopters found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {selectedAdopter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="adopter-details-title"
          onClick={() => setSelectedAdopter(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#2B1517]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#FA799F]">Adopter details</p>
                <h2 id="adopter-details-title" className="text-2xl font-black text-[#3D0C02] dark:text-[#FFFDF3]">
                  {selectedAdopter.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAdopter(null)}
                className="rounded-lg px-3 py-1 font-bold text-[#3D0C02] hover:bg-[#FEF2D6] dark:text-[#FFFDF3]"
                aria-label="Close adopter details"
              >
                ×
              </button>
            </div>

            <dl className="space-y-4">
              <div>
                <dt className="text-xs font-black uppercase tracking-wider text-[#3D0C02]/60 dark:text-[#FFFDF3]/60">Email</dt>
                <dd className="font-bold text-[#3D0C02] dark:text-[#FFFDF3]">{selectedAdopter.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-black uppercase tracking-wider text-[#3D0C02]/60 dark:text-[#FFFDF3]/60">Contact number</dt>
                <dd className="font-bold text-[#3D0C02] dark:text-[#FFFDF3]">{selectedAdopter.contact ?? selectedAdopter.phone ?? "Not provided"}</dd>
              </div>
              <div>
                <dt className="text-xs font-black uppercase tracking-wider text-[#3D0C02]/60 dark:text-[#FFFDF3]/60">Address</dt>
                <dd className="font-bold text-[#3D0C02] dark:text-[#FFFDF3]">{selectedAdopter.address ?? "Not provided"}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdoptersPage;
