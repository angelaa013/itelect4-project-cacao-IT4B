import AdopterCard from "../components/AdopterCard";
import { initialAdopters } from "../data/mockData";

function AdoptersPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#3D0C02] dark:text-[#FA799F] uppercase tracking-tight">
          👤 Adopters
        </h1>
        <p className="text-[#3D0C02]/70 dark:text-[#FFFDF3]/70 font-semibold mt-1">
          {initialAdopters.length} registered adopter
          {initialAdopters.length !== 1 ? "s" : ""} in our system
        </p>
      </div>

      {/* Adopters Grid */}
      <section>
        {initialAdopters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialAdopters.map((adopter) => (
              <AdopterCard key={adopter.id} adopter={adopter} />
            ))}
          </div>
        ) : (
          <div className="bg-[#FDE8F0] dark:bg-[#2B1517] border-2 border-[#FA799F] rounded-3xl p-8 text-center">
            <p className="text-[#3D0C02] dark:text-[#FA799F] font-black text-xl">
              No adopters found
            </p>
            <p className="text-[#3D0C02]/70 dark:text-[#FFFDF3]/70 mt-2 font-semibold">
              Check back later!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdoptersPage;
