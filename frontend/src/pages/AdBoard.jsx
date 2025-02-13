import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAdvertisements } from "../api/api";
import Pagination from "../components/Pagination";
import AddAds from "../components/AddAds";

const AdBoard = () => {
  const [ads, setAds] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [recentAds, setRecentAds] = useState([]);

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";
  const status = searchParams.get("status") || "";
  const searchQuery = searchParams.get("search") || "";
  const ordering = searchParams.get("ordering") || "-date_added";

  const categoryLabels = {
    tech: "Technologia",
    real_estate: "Nieruchomości",
    jobs: "Praca",
    others: "Inne",
  };

  const fetchRecentAds = async () => {
    const data = await getAdvertisements("ordering=-date_added&page=1");
    setRecentAds(data.results.slice(0, 3));
  };

  useEffect(() => {
    const fetchAds = async () => {
      const queryString = new URLSearchParams({
        page: currentPage,
        category,
        status,
        search: searchQuery,
        ordering,
      }).toString();

      const data = await getAdvertisements(`${queryString}`);
      setAds(data.results);
      setTotalPages(Math.ceil(data.count / 3));
    };
    fetchAds();
    fetchRecentAds();
  }, [currentPage, category, status, searchQuery, ordering]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set("page", 1);
    setSearchParams(newParams);
  };

  const handleAdAdded = async () => {
    setSearchParams({ page: 1 });
    const queryString = new URLSearchParams({
      page: 1,
      category,
      status,
      search: searchQuery,
      ordering,
    }).toString();

    const data = await getAdvertisements(`${queryString}`);
    setAds(data.results);
    setTotalPages(Math.ceil(data.count / 3));

    fetchRecentAds();
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-5 gap-4">  
      <div className="col-span-1 flex flex-col items-start">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-white font-serif text-red-800 px-4 py-1 w-full text-left font-light border-b-2 border-gray-300 hover:scale-105 transition">
          Ogłoszenia <span className="text-gray-600">{isMenuOpen ? "▲" : "▼"}</span>
        </button>

        {isMenuOpen && (
          <div className="w-full">
            <AddAds onAdAdded={handleAdAdded} />
          </div>
        )}

        <div className="mt-4 w-full">
          <h2 className="font-serif text-base font-light text-blue-950 border-b-2 border-gray-300 pb-1 text-center">Ostatnio dodane</h2>
          <ul className="mt-2 space-y-2">
            {recentAds.map((ad) => (
              <li key={ad.id}>
                <button 
                  onClick={() => navigate(`/advertisement/${ad.id}`)}
                  className="text-sm text-red-900 font-medium hover:underline hover:scale-105 transition block w-full text-left">
                    {ad.title.length > 20 ? ad.title.slice(0, 20) + "..." : ad.title}
                </button>
                {ad.date_added && (
                  <p className="text-xs text-gray-600 italic">
                    Dodano: {new Date(ad.date_added).toLocaleDateString("pl-PL")}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div id="ads-list" className="col-span-4">
        <h1 className="ads-title">Aktualności</h1>

        <div className="flex justify-center">
          <div className="border border-gray-600 rounded mb-4 w-[80%]"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
          <input
            type="text"
            placeholder="Szukaj..."
            value={searchQuery}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />

          <select 
            value={category} 
            onChange={(e) => handleFilterChange("category", e.target.value)} 
          >
            <option value="">Wszystkie kategorie</option>
            <option value="tech">Technologia</option>
            <option value="real_estate">Nieruchomości</option>
            <option value="jobs">Praca</option>
            <option value="others">Inne</option>
          </select>

          <select 
            value={status} 
            onChange={(e) => handleFilterChange("status", e.target.value)} 
          >
            <option value="">Wszystkie statusy</option>
            <option value="active">Aktywne</option>
            <option value="inactive">Nieaktywne</option>
          </select>

          <select 
            value={ordering} 
            onChange={(e) => handleFilterChange("ordering", e.target.value)} 
          >
            <option value="-date_added">Najnowsze</option>
            <option value="date_added">Najstarsze</option>
          </select>

          <div className="md:col-span-4 flex justify-center mt-2 md:mt-0">
            <button 
              onClick={() => setSearchParams({})} 
              className="reset-button"
            >
              Resetuj filtry
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {ads.length > 0 ? (
            ads.map((ad) => (
              <div 
                key={ad.id} 
                className="ad-style"
                onClick={() => navigate(`/advertisement/${ad.id}`)}
              >
                <h2 className="ad-title">{ad.title}</h2>

                <div className="border border-gray-600 my-1 w-[80%]"></div>

                <p className="ad-pub">Opublikowane {new Date(ad.date_added).toLocaleDateString("pl-PL")} przez {ad.author}</p>

                {ad.image && (
                  <img src={ad.image} alt={ad.title} className="ad-img" />
                )}

                <div className="flex-1 flex items-center justify-start mt-2">
                  <p className="ad-content">{ad.content}</p>
                </div>
                <div className="flex justify-end">
                  <p className="ad-category">Kategoria: {categoryLabels[ad.category] || "Nieznana"}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4 flex items-center justify-center text-xl text-gray-500">Brak ogłoszeń.</p>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setSearchParams({ ...Object.fromEntries(searchParams.entries()), page });
            window.scrollTo({
              top: document.getElementById("ads-list")?.offsetTop || 0,
              behavior: "smooth"
            });
          }}
        />
      </div>
    </div>

  );
};

export default AdBoard;
