import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPetById, createAdoptionRequest } from "../api/client";
import type { Pet } from "../types";

function PetDetailPage() {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: pet, isLoading, isError } = useQuery<Pet>({
    queryKey: ['pet', petId],
    queryFn: () => getPetById(Number(petId)),
    enabled: !!petId
  });

  const mutation = useMutation({
    mutationFn: createAdoptionRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      alert(`Adoption request submitted for ${pet?.name}! 🐾`);
      navigate('/requests');
    }
  });

  const petEmojis: Record<string, string> = {
    dog: "🐕",
    cat: "🐱",
  };

  const handleGoBack = () => {
    navigate("/pets");
  };

  const handleAdopt = () => {
    if (pet) {
      mutation.mutate({
        petName: pet.name,
        adopterName: "Rei Reyes", // Currently hardcoded to the only mock user
        petId: pet.id,
        adopterId: 1,
        status: "pending" as any,
        requestedDate: new Date().toISOString().split('T')[0],
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-24">
        <p className="text-xl font-black text-[#3D0C02] dark:text-[#FAAB18]">Loading pet details...</p>
      </div>
    );
  }

  if (isError || !pet) {
    return (
      <div className="text-center py-24">
        <span className="text-7xl block mb-6">🔍</span>
        <h1 className="text-3xl font-black text-[#3D0C02] dark:text-[#FAAB18] mb-3">
          Pet Not Found
        </h1>
        <p className="text-[#3D0C02]/70 dark:text-[#FFFDF3]/70 font-semibold mb-8">
          No pet with ID "{petId}" exists in our records.
        </p>
        <button
          id="back-to-pets-btn"
          onClick={handleGoBack}
          className="bg-[#FAAB18] hover:bg-[#e5990b] text-[#3D0C02] font-black py-3 px-8 rounded-2xl transition-all duration-200 cursor-pointer border-2 border-[#3D0C02]/20"
        >
          ← Back to Pets
        </button>
      </div>
    );
  }

  const emoji = petEmojis[pet.type.toLowerCase()] ?? "🐾";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        id="pet-detail-back-btn"
        onClick={handleGoBack}
        className="mb-6 flex items-center gap-2 text-[#3D0C02] dark:text-[#FAAB18] font-black hover:underline cursor-pointer transition-all duration-150"
      >
        ← Back to Pets
      </button>

      {/* Pet Detail Card */}
      <div className="bg-white dark:bg-[#2B1517] rounded-3xl shadow-lg overflow-hidden border-2 border-[#3D0C02]/10 dark:border-[#FAAB18]/30">
        {/* Header */}
        <div className="bg-[#FAAB18] p-8">
          <div className="flex items-center gap-5">
            <span className="text-6xl bg-[#FFFDF3] p-4 rounded-2xl shadow-sm">
              {emoji}
            </span>
            <div>
              <h1 className="text-4xl font-black text-[#3D0C02] tracking-tight">
                {pet.name}
              </h1>
              <span className="inline-block mt-2 bg-[#3D0C02] text-[#FFFDF3] text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
                {pet.type}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Breed", value: pet.breed, color: "border-[#FAAB18]" },
              {
                label: "Age",
                value: `${pet.age} year${pet.age !== 1 ? "s" : ""}`,
                color: "border-[#FA799F]",
              },
              {
                label: "Gender",
                value: pet.gender,
                color: "border-[#FAAB18]",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`bg-[#FFFDF3] dark:bg-[#1E0C0E] rounded-2xl p-4 border-l-4 border-t border-r border-b border-[#3D0C02]/10 dark:border-[#FAAB18]/20 ${stat.color}`}
              >
                <p className="text-[11px] font-black uppercase text-[#3D0C02]/60 dark:text-[#FAAB18] tracking-wider">
                  {stat.label}
                </p>
                <p className="text-lg font-black text-[#3D0C02] dark:text-[#FFFDF3] capitalize mt-0.5">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Vaccinated & Fee */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#FEF2D6] dark:bg-[#1E0C0E] rounded-2xl p-4 border border-[#FAAB18]/40 text-center">
              <p className="text-[11px] font-black uppercase text-[#3D0C02]/60 dark:text-[#FAAB18] tracking-wider mb-1">
                Vaccinated
              </p>
              <span className="text-2xl">
                {pet.vaccinated ? "✅" : "❌"}
              </span>
              <p className="text-sm font-black text-[#3D0C02] dark:text-[#FFFDF3] mt-1">
                {pet.vaccinated ? "Yes" : "No"}
              </p>
            </div>
            <div className="bg-[#FDE8F0] dark:bg-[#1E0C0E] rounded-2xl p-4 border border-[#FA799F]/40 text-center">
              <p className="text-[11px] font-black uppercase text-[#FA799F] tracking-wider mb-1">
                Adoption Fee
              </p>
              <p className="text-2xl font-black text-[#3D0C02] dark:text-[#FFFDF3] mt-1">
                ₱{pet.adoptionFee?.toLocaleString() ?? "Free"}
              </p>
            </div>
          </div>

          {/* Description */}
          {pet.description && (
            <div className="bg-[#FFFDF3] dark:bg-[#1E0C0E] border border-[#3D0C02]/10 dark:border-[#FAAB18]/20 rounded-2xl p-5">
              <p className="text-[11px] font-black uppercase text-[#3D0C02]/60 dark:text-[#FAAB18] tracking-wider mb-2">
                About {pet.name}
              </p>
              <p className="text-[#3D0C02]/90 dark:text-[#FFFDF3]/90 italic font-semibold leading-relaxed">
                "{pet.description}"
              </p>
            </div>
          )}

          {/* Adopt Button */}
          <button
            id={`adopt-btn-${pet.id}`}
            onClick={handleAdopt}
            className="w-full bg-[#FAAB18] hover:bg-[#e5990b] text-[#3D0C02] font-black py-4 px-4 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-lg border-2 border-[#3D0C02]/20 cursor-pointer"
          >
            <span className="text-[#FA799F] text-xl">❤️</span> Adopt{" "}
            {pet.name}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetDetailPage;
