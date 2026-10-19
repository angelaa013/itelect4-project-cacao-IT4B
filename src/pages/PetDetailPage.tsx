import { useState, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPetById, createAdoptionRequest } from "../api/client";
import { AdoptionStatus, type Pet } from "../types";
import { initialPets } from "../data/mockData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adoptionRequestSchema, type AdoptionRequestFormData } from "../schemas/adoptionRequestSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRequestsStore from "../store/requestsStore";
import { AdoptionStatus } from "../types";

function PetDetailPage() {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [adopterName, setAdopterName] = useState("");
  const [adopterAddress, setAdopterAddress] = useState("");
  const [adopterContact, setAdopterContact] = useState("");
  const [adopterGithub, setAdopterGithub] = useState("");
  const addRequest = useRequestsStore((state) => state.addRequest);

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

  const handleAdopt = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pet) {
      mutation.mutate({
        petName: pet.name,
        adopterName: adopterName.trim(),
        adopterAddress: adopterAddress.trim(),
        adopterContact: adopterContact.trim(),
        adopterGithub: adopterGithub.trim(),
        petId: pet.id,
        status: AdoptionStatus.Pending,
        requestedDate: new Date().toISOString().split('T')[0],
      });
    }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdoptionRequestFormData>({
    resolver: zodResolver(adoptionRequestSchema),
  });

  const onSubmit = (data: AdoptionRequestFormData) => {
    console.log("Adoption Request Validated & Submitted:", data);
    
    // Get the next incremental ID based on existing requests
    const requests = useRequestsStore.getState().requests;
    const nextId = requests.length > 0 
      ? Math.max(...requests.map(r => r.id)) + 1 
      : 1;

    // Create new adoption request
    const newRequest = {
      id: nextId,
      petName: pet?.name || "",
      adopterName: data.adopterName,
      petId: pet?.id,
      adopterId: nextId,
      status: AdoptionStatus.Pending,
      requestedDate: new Date().toISOString().split('T')[0],
      totalFee: pet?.adoptionFee || 0,
      githubUrl: data.githubUrl,
      address: data.address,
    };

    // Add request to store
    addRequest(newRequest);

    alert(`Adoption request submitted for ${pet?.name}! 🐾\nName: ${data.adopterName}`);
    
    // Navigate to requests page
    navigate("/requests");
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

          <form onSubmit={handleAdopt} className="space-y-4 rounded-2xl border-2 border-[#FAAB18]/40 bg-[#FFFDF3] dark:bg-[#1E0C0E] p-5">
            <div>
              <h2 className="text-xl font-black text-[#3D0C02] dark:text-[#FFFDF3]">Your adoption details</h2>
              <p className="mt-1 text-sm font-semibold text-[#3D0C02]/70 dark:text-[#FFFDF3]/70">Please provide your contact information to submit an adoption request.</p>
            </div>
            <label className="block text-sm font-bold text-[#3D0C02] dark:text-[#FFFDF3]">
              Full name
              <input required autoComplete="name" value={adopterName} onChange={(event) => setAdopterName(event.target.value)} className="mt-1 w-full rounded-xl border border-[#3D0C02]/20 bg-white px-4 py-3 font-medium outline-none focus:border-[#FAAB18] dark:bg-[#2B1517]" />
            </label>
            <label className="block text-sm font-bold text-[#3D0C02] dark:text-[#FFFDF3]">
              Address
              <textarea required autoComplete="street-address" value={adopterAddress} onChange={(event) => setAdopterAddress(event.target.value)} rows={2} className="mt-1 w-full rounded-xl border border-[#3D0C02]/20 bg-white px-4 py-3 font-medium outline-none focus:border-[#FAAB18] dark:bg-[#2B1517]" />
            </label>
            <label className="block text-sm font-bold text-[#3D0C02] dark:text-[#FFFDF3]">
              Philippine contact number
              <input required type="tel" autoComplete="tel" inputMode="tel" pattern="(?:\+63|0)9[0-9]{9}" title="Enter 09 followed by 9 digits, or +639 followed by 9 digits." placeholder="09XXXXXXXXX or +639XXXXXXXXX" value={adopterContact} onChange={(event) => setAdopterContact(event.target.value)} className="mt-1 w-full rounded-xl border border-[#3D0C02]/20 bg-white px-4 py-3 font-medium outline-none focus:border-[#FAAB18] dark:bg-[#2B1517]" />
            </label>
            <label className="block text-sm font-bold text-[#3D0C02] dark:text-[#FFFDF3]">
              GitHub profile URL
              <input required type="url" pattern="https?://(www\.)?github\.com/[A-Za-z0-9-]+/?" title="Enter your GitHub profile URL, for example https://github.com/your-name" placeholder="https://github.com/your-name" value={adopterGithub} onChange={(event) => setAdopterGithub(event.target.value)} className="mt-1 w-full rounded-xl border border-[#3D0C02]/20 bg-white px-4 py-3 font-medium outline-none focus:border-[#FAAB18] dark:bg-[#2B1517]" />
            </label>
            {mutation.isError && <p role="alert" className="text-sm font-bold text-red-600">Could not submit your request. Please try again.</p>}
            <button id={`adopt-btn-${pet.id}`} type="submit" disabled={mutation.isPending} className="w-full bg-[#FAAB18] hover:bg-[#e5990b] disabled:opacity-60 text-[#3D0C02] font-black py-4 px-4 rounded-2xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-lg border-2 border-[#3D0C02]/20 cursor-pointer">
              {mutation.isPending ? "Submitting..." : `Adopt ${pet.name}`}
            </button>
          </form>
          {/* Adopt Form */}
          <div className="bg-[#FFFDF3] dark:bg-[#1E0C0E] border border-[#3D0C02]/10 dark:border-[#FAAB18]/20 rounded-2xl p-5">
            <h3 className="text-[13px] font-black uppercase text-[#3D0C02] dark:text-[#FAAB18] tracking-wider mb-4">
              Adoption Request Form
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="adopterName" className="text-xs font-black uppercase tracking-widest text-[#3D0C02]/80 dark:text-[#FAAB18]/80">Name</Label>
                <Input id="adopterName" {...register("adopterName")} className="bg-white dark:bg-[#2B1517] border-[#3D0C02]/20 dark:border-[#FAAB18]/40 font-semibold" placeholder="Enter your full name" />
                {errors.adopterName && <p className="text-red-500 text-xs font-bold mt-1">{errors.adopterName.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="githubUrl" className="text-xs font-black uppercase tracking-widest text-[#3D0C02]/80 dark:text-[#FAAB18]/80">GitHub Profile</Label>
                <Input id="githubUrl" type="url" {...register("githubUrl")} className="bg-white dark:bg-[#2B1517] border-[#3D0C02]/20 dark:border-[#FAAB18]/40 font-semibold" placeholder="https://github.com/your-name" />
                {errors.githubUrl && <p className="text-red-500 text-xs font-bold mt-1">{errors.githubUrl.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact" className="text-xs font-black uppercase tracking-widest text-[#3D0C02]/80 dark:text-[#FAAB18]/80">Contact Number</Label>
                <Input id="contact" {...register("contact")} className="bg-white dark:bg-[#2B1517] border-[#3D0C02]/20 dark:border-[#FAAB18]/40 font-semibold" placeholder="+639..." />
                {errors.contact && <p className="text-red-500 text-xs font-bold mt-1">{errors.contact.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="address" className="text-xs font-black uppercase tracking-widest text-[#3D0C02]/80 dark:text-[#FAAB18]/80">Address</Label>
                <Input id="address" {...register("address")} className="bg-white dark:bg-[#2B1517] border-[#3D0C02]/20 dark:border-[#FAAB18]/40 font-semibold" placeholder="Enter your full address" />
                {errors.address && <p className="text-red-500 text-xs font-bold mt-1">{errors.address.message}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FAAB18] hover:bg-[#e5990b] text-[#3D0C02] font-black py-6 rounded-xl text-lg mt-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
              >
                <span className="text-[#FA799F] text-xl mr-2">❤️</span> Adopt {pet.name}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetailPage;
