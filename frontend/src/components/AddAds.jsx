import { useState } from "react";
import { createAdvertisement } from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAds = ({ onAdAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "active",
    category: "tech",
    author: "",
    contact: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const createdAd = await createAdvertisement(formDataToSend);
      if (createdAd) {
        onAdAdded();
        setShowForm(false);
        setFormData({
          title: "",
          content: "",
          status: "active",
          category: "tech",
          author: "",
          contact: "",
          image: null,
        });
        setPreviewImage(null);
        toast.success("Ogłoszenie dodane pomyślnie!");
      }
    } catch (error) {
      console.error("API error:", error);

      if (error.error_message) {
          toast.error(error.error_message);
      } else {
          toast.error("Bład dodawania ogłoszenia");
      }
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="font-serif text-red-900 font-thin text-sm italic px-4 py-2 rounded hover:scale-105 hover:underline transition"
        >
          Dodaj ogłoszenie
        </button>
      </div>

      {showForm && (
        <div className="form-blur">
          <form onSubmit={handleSubmit} className="form-style">
            <label className="form-label">Tytuł</label>
            <input
              name="title"
              placeholder="Tytuł"
              value={formData.title}
              onChange={handleChange}              
              required
            />

            <label className="form-label">Treść</label>
            <textarea
              name="content"
              placeholder="Treść"
              value={formData.content}
              onChange={handleChange}              
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="form-label mb-1">Status</label>
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange} 
                  className="border p-2 w-full text-sm rounded"
                >
                  <option value="active">Aktywne</option>
                  <option value="inactive">Nieaktywne</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="form-label mb-1">Kategoria</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="border p-2 w-full text-sm rounded"
                >
                  <option value="tech">Technologia</option>
                  <option value="real_estate">Nieruchomości</option>
                  <option value="jobs">Praca</option>
                  <option value="others">Inne</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="form-label">Autor</label>
                <input
                  name="author"
                  placeholder="Autor"
                  value={formData.author}
                  onChange={handleChange}                  
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="form-label">Kontakt</label>
                <input
                  name="contact"
                  placeholder="Kontakt (email lub telefon)"
                  value={formData.contact}
                  onChange={handleChange}                  
                  required
                />
              </div>
            </div>

            {previewImage && (
              <div className="mb-2">
                <p className="text-sm text-gray-600">Podgląd:</p>
                <img src={previewImage} alt="Podgląd" className="max-h-40 object-contain rounded border mt-1" />
                <button
                  onClick={() => {
                    setFormData({ ...formData, image: null });
                    setPreviewImage(null);
                  }}
                  className="mt-2 bg-transparent text-sm text-gray-700 px-3 py-1 rounded hover:underline"
                >
                  Usuń zdjęcie
                </button>
              </div>
            )}

            <label className="form-label">Dodaj zdjęcie</label>
            <input type="file" onChange={handleImageChange} />

            <div className="flex justify-between">
              <button type="submit" className="submit-button">
                Dodaj ogłoszenie
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="cancel-button"
              >
                Anuluj
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddAds;
