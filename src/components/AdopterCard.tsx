import type { Adopter } from "../types";

interface AdopterCardProps {
    adopter: Adopter;
    isCompact?: boolean;
}

function AdopterCard({ adopter, isCompact = false }: AdopterCardProps) {
    if (isCompact) {
        return (
            <div className="bg-[#FFFDF7] dark:bg-[#2D1F15] rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4 border-t-4 border-[#FA799F] border-2 border-[#4A3525]/10 dark:border-[#FA799F]/30">
                <h3 className="text-lg font-extrabold text-[#4A3525] dark:text-[#FA799F] mb-2">
                    👤 {adopter.name}
                </h3>
                <div className="space-y-1 text-sm font-semibold text-[#4A3525]/80 dark:text-[#FFF8EC]/80">
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
        <div className="bg-[#FFFDF7] dark:bg-[#2D1F15] rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-[#4A3525]/10 dark:border-[#FA799F]/30 flex flex-col justify-between">
            <div>
                {/* Header */}
                <div className="bg-[#FA799F] text-white p-5 border-b border-[#4A3525]/10">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl bg-white/20 p-2.5 rounded-2xl">👤</span>
                        <div>
                            <h3 className="text-2xl font-extrabold tracking-tight">{adopter.name}</h3>
                            <p className="text-white/90 text-xs font-bold uppercase tracking-wider">Adopter Profile</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="bg-[#FFF1D6] dark:bg-[#1F140D] border-l-4 border-[#F4A21A] rounded-2xl p-4 border border-[#F4A21A]/30">
                        <p className="text-[11px] font-extrabold uppercase text-[#4A3525]/70 dark:text-[#F4A21A] tracking-wider">Email Address</p>
                        <p className="text-[#4A3525] dark:text-[#FFF8EC] font-extrabold mt-1 break-all flex items-center gap-2">
                            <span>📧</span> {adopter.email}
                        </p>
                    </div>

                    <div className="bg-[#FDE8F0] dark:bg-[#1F140D] border-l-4 border-[#FA799F] rounded-2xl p-4 border border-[#FA799F]/30">
                        <p className="text-[11px] font-extrabold uppercase text-[#FA799F] tracking-wider">Contact Number</p>
                        <p className="text-[#4A3525] dark:text-[#FFF8EC] font-extrabold mt-1 flex items-center gap-2">
                            <span>📱</span> {adopter.contact}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer badge */}
            <div className="px-6 pb-6 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-[#FFF1D6] dark:bg-[#1F140D] text-[#4A3525] dark:text-[#F4A21A] text-xs font-extrabold px-4 py-2 rounded-full border border-[#F4A21A]/40">
                    ✅ Active Adopter
                </span>
            </div>
        </div>
    );
}

export default AdopterCard;
