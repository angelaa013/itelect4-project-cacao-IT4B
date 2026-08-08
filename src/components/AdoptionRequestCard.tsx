import type { AdoptionRequest } from "../types";
import { AdoptionStatus } from "../types";

interface AdoptionRequestCardProps {
    request: AdoptionRequest;
    isCompact?: boolean;
}

function AdoptionRequestCard({ request, isCompact = false }: AdoptionRequestCardProps) {
    const getStatusColor = (status: AdoptionStatus) => {
        switch (status) {
            case AdoptionStatus.Approved:
                return "bg-[#FFF1D6] dark:bg-[#2D1F15] text-[#4A3525] dark:text-[#F4A21A] border-[#F4A21A]";
            case AdoptionStatus.Pending:
                return "bg-[#FDE8F0] dark:bg-[#2D1F15] text-[#4A3525] dark:text-[#FA799F] border-[#FA799F]";
            case AdoptionStatus.Rejected:
                return "bg-[#FEE2E2] dark:bg-[#2D1F15] text-[#991B1B] dark:text-[#FCA5A5] border-[#EF4444]";
            default:
                return "bg-[#FFF8EC] dark:bg-[#2D1F15] text-[#4A3525] dark:text-[#FFF8EC] border-[#4A3525]/20";
        }
    };

    const getStatusEmoji = (status: AdoptionStatus) => {
        switch (status) {
            case AdoptionStatus.Approved:
                return "✅";
            case AdoptionStatus.Pending:
                return "⏳";
            case AdoptionStatus.Rejected:
                return "❌";
            default:
                return "📋";
        }
    };

    const statusColor = getStatusColor(request.status);
    const statusEmoji = getStatusEmoji(request.status);

    if (isCompact) {
        return (
            <div className="bg-[#FFFDF7] dark:bg-[#2D1F15] rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4 border-r-4 border-[#F4A21A] border-2 border-[#4A3525]/10 dark:border-[#F4A21A]/30">
                <h3 className="text-lg font-extrabold text-[#4A3525] dark:text-[#F4A21A] mb-2">
                    📋 Request #{request.id}
                </h3>
                <div className="space-y-1.5 text-sm font-semibold text-[#4A3525]/80 dark:text-[#FFF8EC]/80 mb-3">
                    <p><span>🐾</span> {request.petName}</p>
                    <p><span>👤</span> {request.adopterName}</p>
                </div>
                <div className={`inline-block rounded-full px-3 py-1 text-xs font-extrabold border-2 ${statusColor}`}>
                    {statusEmoji} {request.status}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FFFDF7] dark:bg-[#2D1F15] rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-[#4A3525]/10 dark:border-[#F4A21A]/30 flex flex-col justify-between">
            <div>
                {/* Light Minimalist Header */}
                <div className="bg-[#FFF1D6] dark:bg-[#1F140D] text-[#4A3525] p-5 border-b border-[#F4A21A]/30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl bg-[#F4A21A] text-[#4A3525] p-2.5 rounded-2xl shadow-sm">📋</span>
                            <div>
                                <h3 className="text-2xl font-extrabold text-[#4A3525] dark:text-[#F4A21A] tracking-tight">Request #{request.id}</h3>
                                <p className="text-[#C78208] dark:text-[#FA799F] text-xs font-extrabold uppercase tracking-wider">Adoption Details</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="bg-[#FDE8F0] dark:bg-[#1F140D] border-l-4 border-[#FA799F] rounded-2xl p-4 border border-[#FA799F]/30">
                        <p className="text-[11px] font-extrabold uppercase text-[#FA799F] tracking-wider">Pet Name</p>
                        <p className="text-[#4A3525] dark:text-[#FFF8EC] font-extrabold mt-1 text-lg flex items-center gap-2">
                            <span>🐾</span> {request.petName}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#FFF1D6] dark:bg-[#1F140D] border-l-4 border-[#F4A21A] rounded-2xl p-3.5 border border-[#F4A21A]/30">
                            <p className="text-[11px] font-extrabold uppercase text-[#4A3525]/70 dark:text-[#F4A21A] tracking-wider">Adopter</p>
                            <p className="text-[#4A3525] dark:text-[#FFF8EC] font-extrabold mt-1 text-sm">
                                {request.adopterName}
                            </p>
                        </div>

                        <div className="bg-[#FFF8EC] dark:bg-[#1F140D] border-l-4 border-[#4A3525] rounded-2xl p-3.5 border border-[#4A3525]/20 dark:border-[#F4A21A]/20">
                            <p className="text-[11px] font-extrabold uppercase text-[#4A3525]/70 dark:text-[#F4A21A] tracking-wider">Email</p>
                            <p className="text-[#4A3525] dark:text-[#FFF8EC] font-extrabold mt-1 text-xs truncate">
                                rei.reyes@email.com
                            </p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`rounded-2xl p-4 border-2 ${statusColor} text-center shadow-sm`}>
                        <p className="text-[11px] font-extrabold uppercase tracking-wider opacity-75 mb-1">Current Status</p>
                        <p className="text-lg font-extrabold flex items-center justify-center gap-2">
                            <span>{statusEmoji}</span> {request.status}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 pt-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-[#4A3525]/80 dark:text-[#FFF8EC]/80 font-bold">
                        Request ID: <span className="font-extrabold">#{request.id}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#FFF1D6] dark:bg-[#1F140D] text-[#4A3525] dark:text-[#F4A21A] px-3 py-1 rounded-full text-xs font-extrabold border border-[#F4A21A]/40">
                        🔔 In Progress
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AdoptionRequestCard;
