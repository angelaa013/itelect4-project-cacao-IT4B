import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PetCard from "../components/PetCard";
import { initialPets } from "../data/mockData";

function PetsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [compactView, setCompactView] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filteredPets = initialPets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdopt = (petName: string): void => {
    alert(`Adoption request submitted for ${petName}! 🐾`);
  };

  const handleViewDetails = (petId: number): void => {
    navigate(`/pets/${petId}`);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#3D0C02] dark:text-[#FAAB18] uppercase tracking-tight">
            🐶 Available Pets
          </h1>
          <p className="text-[#3D0C02]/70 dark:text-[#FFFDF3]/70 font-semibold mt-1">
            {filteredPets.length} pet{filteredPets.length !== 1 ? "s" : ""}{" "}
            looking for a forever home
          </p>
        </div>
        <button
          id="compact-view-btn"
          onClick={() => setCompactView(!compactView)}
          className="bg-[#FA799F] hover:bg-[#f5668f] text-white px-5 py-2.5 rounded-2xl font-black transition-all duration-200 shadow-sm cursor-pointer border-2 border-[#FA799F]"
        >
          {compactView ? "📄 Default View" : "📋 Compact View"}
        </button>
      </div>

      {/* Search */}
      <section className="mb-8">
        <div className="bg-white dark:bg-[#2B1517] rounded-3xl shadow-sm p-6 border-2 border-[#3D0C02]/10 dark:border-[#FAAB18]/30">
          <label className="block text-xs font-black uppercase tracking-widest text-[#3D0C02] dark:text-[#FAAB18] mb-3">
            Search Pets
          </label>
          <input
            id="pet-search-input"
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            placeholder="Search by name or breed..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3.5 bg-[#FFFDF3] dark:bg-[#1E0C0E] border-2 border-[#3D0C02]/20 dark:border-[#FAAB18]/40 text-[#3D0C02] dark:text-[#FFFDF3] placeholder-[#3D0C02]/50 dark:placeholder-[#FFFDF3]/40 rounded-2xl focus:outline-none focus:border-[#FAAB18] transition-colors font-extrabold"
          />
        </div>
      </section>

      {/* Pets Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <div key={pet.id} className="flex flex-col gap-2">
                <PetCard
                  pet={pet}
                  onAdopt={handleAdopt}
                  isCompact={compactView}
                />
                <button
                  id={`view-details-btn-${pet.id}`}
                  onClick={() => handleViewDetails(pet.id)}
                  className="w-full bg-transparent hover:bg-[#FEF2D6] dark:hover:bg-[#2B1517] text-[#3D0C02] dark:text-[#FAAB18] font-black py-2.5 px-4 rounded-xl transition-all duration-200 border-2 border-[#FAAB18]/40 hover:border-[#FAAB18] text-sm cursor-pointer"
                >
                  🔍 View Details
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-[#FEF2D6] dark:bg-[#2B1517] border-2 border-[#FAAB18] rounded-3xl p-8 text-center">
              <p className="text-xl text-[#3D0C02] dark:text-[#FAAB18] font-black">
                No pets matching "{searchTerm}"
              </p>
              <p className="text-[#3D0C02]/70 dark:text-[#FFFDF3]/70 mt-2 font-bold">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default PetsPage;
