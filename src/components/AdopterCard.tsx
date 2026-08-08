import type { Adopter } from "../types";

interface AdopterCardProps {
    adopter: Adopter;
    isCompact?: boolean;
}

function AdopterCard({ adopter, isCompact = false }: AdopterCardProps) {
    if (isCompact) {
        return (
            <div className="bg-white dark:bg-[#2B1517] rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4 border-t-4 border-[#FA799F] border-2 border-[#3D0C02]/10 dark:border-[#FA799F]/30">
                <h3 className="text-lg font-black text-[#3D0C02] dark:text-[#FA799F] mb-2">
                    👤 {adopter.name}
                </h3>
                <div className="space-y-1 text-sm font-bold text-[#3D0C02]/80 dark:text-[#FFFDF3]/80">
                    <p>
                        <span>📧</span> {adopter.email}
                    </p>
                    <p>
                        <span>📱</span> {adopter.contact}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#2B1517] rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-[#3D0C02]/10 dark:border-[#FA799F]/30 flex flex-col justify-between">
            <div>
                {/* Header */}
                <div className="bg-[#FA799F] text-white p-5 border-b border-[#3D0C02]/10">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl bg-white/20 p-2.5 rounded-2xl">👤</span>
                        <div>
                            <h3 className="text-2xl font-black tracking-tight">{adopter.name}</h3>
                            <p className="text-white/90 text-xs font-black uppercase tracking-wider">Adopter Profile</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="bg-[#FEF2D6] dark:bg-[#1E0C0E] border-l-4 border-[#FAAB18] rounded-2xl p-4 border border-[#FAAB18]/30">
                        <p className="text-[11px] font-black uppercase text-[#3D0C02]/70 dark:text-[#FAAB18] tracking-wider">Email Address</p>
                        <p className="text-[#3D0C02] dark:text-[#FFFDF3] font-black mt-1 break-all flex items-center gap-2">
                            <span>📧</span> {adopter.email}
                        </p>
                    </div>

                    <div className="bg-[#FDE8F0] dark:bg-[#1E0C0E] border-l-4 border-[#FA799F] rounded-2xl p-4 border border-[#FA799F]/30">
                        <p className="text-[11px] font-black uppercase text-[#FA799F] tracking-wider">Contact Number</p>
                        <p className="text-[#3D0C02] dark:text-[#FFFDF3] font-black mt-1 flex items-center gap-2">
                            <span>📱</span> {adopter.contact}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer badge */}
            <div className="px-6 pb-6 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-[#FEF2D6] dark:bg-[#1E0C0E] text-[#3D0C02] dark:text-[#FAAB18] text-xs font-black px-4 py-2 rounded-full border border-[#FAAB18]/40">
                    ✅ Active Adopter
                </span>
            </div>
        </div>
    );
}

export default AdopterCard;
