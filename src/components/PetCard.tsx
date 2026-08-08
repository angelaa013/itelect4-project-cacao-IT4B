import type { Pet } from "../types";

interface PetCardProps {
    pet: Pet;
    onAdopt: (petName: string) => void;
    isCompact?: boolean;
}

function PetCard({ pet, onAdopt, isCompact = false }: PetCardProps) {
    const petEmojis: Record<string, string> = {
        "dog": "🐕",
        "cat": "🐱",
        "rabbit": "🐰",
        "bird": "🐦"
    };

    const emoji = petEmojis[pet.type.toLowerCase()] || "🐾";

    if (isCompact) {
        return (
            <div className="bg-[#FFFDF7] dark:bg-[#2D1F15] rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4 border-l-4 border-[#F4A21A] border-2 border-[#4A3525]/10 dark:border-[#F4A21A]/30">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                        <h3 className="text-xl font-extrabold text-[#4A3525] dark:text-[#F4A21A] mb-1">
                            {emoji} {pet.name}
                        </h3>
                        <p className="text-sm font-semibold text-[#4A3525]/70 dark:text-[#FFF8EC]/70">
                            {pet.breed} • {pet.age} years
                        </p>
                    </div>
                    <span className="bg-[#FFF1D6] dark:bg-[#1F140D] text-[#4A3525] dark:text-[#F4A21A] text-xs font-extrabold px-3 py-1 rounded-full uppercase border border-[#F4A21A]/30">
                        {pet.gender}
                    </span>
                </div>
                <button 
                    onClick={() => onAdopt(pet.name)}
                    className="mt-3 w-full bg-[#F4A21A] hover:bg-[#e5930b] text-[#4A3525] font-extrabold py-2 px-4 rounded-xl transition-all duration-200 shadow-sm transform active:scale-95 flex items-center justify-center gap-1.5"
                >
                    <span className="text-[#FA799F]">❤️</span> Adopt
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#FFFDF7] dark:bg-[#2D1F15] rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-[#4A3525]/10 dark:border-[#F4A21A]/30 flex flex-col justify-between">
            <div>
                {/* Header with Pawhome Warm Amber Accent */}
                <div className="bg-[#F4A21A] text-[#4A3525] p-5 border-b border-[#4A3525]/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl bg-[#FFF8EC] p-2.5 rounded-2xl shadow-sm">{emoji}</span>
                            <div>
                                <h3 className="text-2xl font-extrabold tracking-tight text-[#4A3525]">{pet.name}</h3>
                                <span className="inline-block mt-1 bg-[#4A3525] text-[#FFF8EC] text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                                    {pet.type}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#FFF1D6] dark:bg-[#1F140D] rounded-2xl p-3.5 border border-[#F4A21A]/40">
                            <p className="text-[11px] font-extrabold uppercase text-[#4A3525]/70 dark:text-[#F4A21A] tracking-wider">Breed</p>
                            <p className="font-extrabold text-[#4A3525] dark:text-[#FFF8EC] text-base mt-0.5">{pet.breed}</p>
                        </div>
                        <div className="bg-[#FDE8F0] dark:bg-[#1F140D] rounded-2xl p-3.5 border border-[#FA799F]/40">
                            <p className="text-[11px] font-extrabold uppercase text-[#FA799F] tracking-wider">Age</p>
                            <p className="font-extrabold text-[#4A3525] dark:text-[#FFF8EC] text-base mt-0.5">{pet.age} years</p>
                        </div>
                    </div>

                    <div className="bg-[#FFF8EC] dark:bg-[#1F140D] border-l-4 border-[#F4A21A] p-3.5 rounded-2xl border border-[#4A3525]/10 dark:border-[#F4A21A]/20">
                        <p className="text-[11px] font-extrabold uppercase text-[#4A3525]/70 dark:text-[#F4A21A] tracking-wider">Gender</p>
                        <p className="font-extrabold text-[#4A3525] dark:text-[#FFF8EC] text-base mt-0.5 capitalize">{pet.gender}</p>
                    </div>

                    <div className="bg-[#FFF8EC] dark:bg-[#1F140D] border border-[#4A3525]/10 dark:border-[#F4A21A]/20 rounded-2xl p-4">
                        <p className="text-[#4A3525]/90 dark:text-[#FFF8EC]/90 italic text-sm font-medium">"{pet.description}"</p>
                    </div>
                </div>
            </div>

            {/* Action */}
            <div className="px-6 pb-6 pt-2">
                <button 
                    onClick={() => onAdopt(pet.name)}
                    className="w-full bg-[#F4A21A] hover:bg-[#e5930b] text-[#4A3525] font-extrabold py-3.5 px-4 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-base border border-[#F4A21A]/50"
                >
                    <span className="text-[#FA799F] text-lg">❤️</span> Adopt {pet.name}
                </button>
            </div>
        </div>
    );
}

export default PetCard;
