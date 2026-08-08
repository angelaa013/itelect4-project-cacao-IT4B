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
            <div className="bg-white dark:bg-[#2B1517] rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4 border-l-4 border-[#FAAB18] border-2 border-[#3D0C02]/10 dark:border-[#FAAB18]/30">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                        <h3 className="text-xl font-black text-[#3D0C02] dark:text-[#FAAB18] mb-1">
                            {emoji} {pet.name}
                        </h3>
                        <p className="text-sm font-bold text-[#3D0C02]/70 dark:text-[#FFFDF3]/70">
                            {pet.breed} • {pet.age} years
                        </p>
                    </div>
                    <span className="bg-[#FEF2D6] dark:bg-[#1E0C0E] text-[#3D0C02] dark:text-[#FAAB18] text-xs font-black px-3 py-1 rounded-full uppercase border border-[#FAAB18]/40">
                        {pet.gender}
                    </span>
                </div>
                <button 
                    onClick={() => onAdopt(pet.name)}
                    className="mt-3 w-full bg-[#FAAB18] hover:bg-[#e5990b] text-[#3D0C02] font-black py-2.5 px-4 rounded-xl transition-all duration-200 shadow-sm transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer border border-[#3D0C02]/20"
                >
                    <span className="text-[#FA799F]">❤️</span> Adopt
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#2B1517] rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-[#3D0C02]/10 dark:border-[#FAAB18]/30 flex flex-col justify-between">
            <div>
                {/* Header with Pawhome Warm Amber Accent */}
                <div className="bg-[#FAAB18] text-[#3D0C02] p-5 border-b border-[#3D0C02]/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl bg-[#FFFDF3] p-2.5 rounded-2xl shadow-sm">{emoji}</span>
                            <div>
                                <h3 className="text-2xl font-black tracking-tight text-[#3D0C02]">{pet.name}</h3>
                                <span className="inline-block mt-1 bg-[#3D0C02] text-[#FFFDF3] text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                                    {pet.type}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#FEF2D6] dark:bg-[#1E0C0E] rounded-2xl p-3.5 border border-[#FAAB18]/40">
                            <p className="text-[11px] font-black uppercase text-[#3D0C02]/70 dark:text-[#FAAB18] tracking-wider">Breed</p>
                            <p className="font-black text-[#3D0C02] dark:text-[#FFFDF3] text-base mt-0.5">{pet.breed}</p>
                        </div>
                        <div className="bg-[#FDE8F0] dark:bg-[#1E0C0E] rounded-2xl p-3.5 border border-[#FA799F]/40">
                            <p className="text-[11px] font-black uppercase text-[#FA799F] tracking-wider">Age</p>
                            <p className="font-black text-[#3D0C02] dark:text-[#FFFDF3] text-base mt-0.5">{pet.age} years</p>
                        </div>
                    </div>

                    <div className="bg-[#FFFDF3] dark:bg-[#1E0C0E] border-l-4 border-[#FAAB18] p-3.5 rounded-2xl border border-[#3D0C02]/10 dark:border-[#FAAB18]/20">
                        <p className="text-[11px] font-black uppercase text-[#3D0C02]/70 dark:text-[#FAAB18] tracking-wider">Gender</p>
                        <p className="font-black text-[#3D0C02] dark:text-[#FFFDF3] text-base mt-0.5 capitalize">{pet.gender}</p>
                    </div>

                    <div className="bg-[#FFFDF3] dark:bg-[#1E0C0E] border border-[#3D0C02]/10 dark:border-[#FAAB18]/20 rounded-2xl p-4">
                        <p className="text-[#3D0C02]/90 dark:text-[#FFFDF3]/90 italic text-sm font-semibold">"{pet.description}"</p>
                    </div>
                </div>
            </div>

            {/* Action */}
            <div className="px-6 pb-6 pt-2">
                <button 
                    onClick={() => onAdopt(pet.name)}
                    className="w-full bg-[#FAAB18] hover:bg-[#e5990b] text-[#3D0C02] font-black py-3.5 px-4 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-base border-2 border-[#3D0C02]/20 cursor-pointer"
                >
                    <span className="text-[#FA799F] text-lg">❤️</span> Adopt {pet.name}
                </button>
            </div>
        </div>
    );
}

export default PetCard;
