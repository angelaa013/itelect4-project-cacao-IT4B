import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center">
      <div>
        <div className="text-8xl mb-6 animate-bounce">🐾</div>
        <h1 className="text-6xl font-black text-[#3D0C02] dark:text-[#FAAB18] mb-4 uppercase tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-black text-[#3D0C02] dark:text-[#FFFDF3] mb-3">
          Page Not Found
        </h2>
        <p className="text-[#3D0C02]/60 dark:text-[#FFFDF3]/60 font-semibold max-w-sm mx-auto mb-10">
          Looks like this page ran away! 🐶 It doesn't exist or may have moved.
        </p>
        <button
          id="not-found-home-btn"
          onClick={handleGoHome}
          className="bg-[#FAAB18] hover:bg-[#e5990b] text-[#3D0C02] font-black py-4 px-10 rounded-2xl text-lg shadow-md hover:shadow-xl transition-all duration-200 transform hover:scale-[1.03] active:scale-95 border-2 border-[#3D0C02]/20 cursor-pointer"
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
