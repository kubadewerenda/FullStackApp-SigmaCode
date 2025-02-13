import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteAdvertisement } from "../api/api";
import EditAds from "../components/EditAds";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const AdDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/advertisements/${id}/`);
                setAd(response.data);
            } catch (error) {
                console.error("Bład pobierania ogłoszenia", error);
            }
            setLoading(false);
        };
        fetchAd();
    }, [id]);

    const handleAdDelete = async (id) => {
        if (window.confirm("Czy na pewno chcesz usunać ogłoszenie?")) {
            try {
                if(await deleteAdvertisement(id)) {
                    navigate(-1);
                }
            } catch (error) {
                console.error("Błąd usuwania ogłoszenia", error);
            }
        }
    };

    const categoryLabels = {
        tech: "Technologia",
        real_estate: "Nieruchomości",
        jobs: "Praca",
        others: "Inne",
      };

    const handleAdEdit = (ad) => {
        setAd(ad);
        setIsEditing(false);
    };

    if (loading) return <p className="text-center mt-4">Ładowanie...</p>;
    if (!ad) return <p className="text-center mt-4 text-red-500">Nie znaleziono ogłoszenia</p>;

    return (
        <div className="container mx-auto p-4 w-[90%]"> 
            <div className="grid grid-cols-1 items-center">
                <h1 className="text-4xl font-serif font-light text-blue-950 text-center">Ogłoszenie</h1>
                <div className="border-2 border-gray-600 my-3"></div>
            </div>   
            <div className="min-h-[250px] sm:min-h-[300px] w-full p-4 rounded shadow-xl bg-yellow-50 col-span-4 flex flex-col justify-between">
                {isEditing ? (
                    <EditAds 
                        ad={ad} 
                        onAdUpdated={handleAdEdit} 
                        onCancel={() => setIsEditing(false)} 
                    />
                ) : (
                    <>
                        <h2 className="ad-title">{ad.title}</h2>

                        <div className="border border-gray-600 my-1 w-[80%]"></div>

                        <p className="ad-pub">
                            Opublikowane {new Date(ad.date_added).toLocaleDateString("pl-PL")} przez {ad.author}
                            {new Date(ad.date_added).toLocaleString("pl-PL") !== new Date(ad.date_modified).toLocaleString("pl-PL") && (
                                <>, zmodyfikowano {new Date(ad.date_modified).toLocaleDateString("pl-PL")}</>
                            )}
                        </p>

                        <p className="ad-category">
                            Kategoria: {categoryLabels[ad.category] || "Nieznana"}
                        </p>
        
                        {ad.image && (
                            <img src={ad.image} alt={ad.title} className="max-h-[350px] max-w-full object-contain rounded mt-2 sm:mt-6" />
                        )}
        
                        <div className="flex-1 flex items-center justify-start mt-2">
                            <p className="ad-content">{ad.content}</p>
                        </div>

                        <p className="text-sm text-red-800 font-light mt-2">
                            Autor: {ad.author}
                        </p>

                        <p className="text-sm text-gray-700 font-medium mt-2">
                            Kontakt do autora: {ad.contact}
                        </p>
        
                        <div className="flex justify-between items-center mt-4">
                            <button 
                                onClick={() => setIsEditing(true)} 
                                className="submit-button"
                            >
                                Edytuj
                            </button>

                            <button 
                                onClick={() => handleAdDelete(ad.id)} 
                                className="cancel-button"
                            >
                                Usuń
                            </button>

                        </div>
                    </>
                )}
            </div>
            <button 
                onClick={() => navigate(-1)} 
                className="text-red-800 text-base font-mono py-2 mb-4 hover:scale-105 hover:underline transition duration-300"
            >
                Powrót
            </button>
        </div>
    );
};

export default AdDetails;
