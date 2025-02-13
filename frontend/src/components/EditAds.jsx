import { useState } from "react";
import { editAdvertisement } from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EditAds = ({ ad, onAdUpdated, onCancel }) => {
  const [formData, setFormData] = useState({ ...ad, image: null });
  const [previewImage, setPreviewImage] = useState(ad.image);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedAd = await editAdvertisement(ad.id, formData);
      if (updatedAd) {
        onAdUpdated(updatedAd);
        onCancel();
        toast.success("Ogłoszenie edytowane pomyślnie!");
      }
    } catch(error) {
      console.error("API error:", error);

      if (error.error_message) {
          toast.error(error.error_message);
      } else {
          toast.error("Bład dodawania ogłoszenia");
      }
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <label className="form-edit-label">Tytuł</label>
        <input
          name="title"
          placeholder="Podaj tytuł ogłoszenia"
          value={formData.title}
          onChange={handleChange}          
          required
        />

        <label className="form-edit-label">Treść</label>
        <textarea
          name="content"
          placeholder="Podaj treść ogłoszenia"
          value={formData.content}
          onChange={handleChange}          
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="form-edit-label">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} >
              <option value="active">Aktywne</option>
              <option value="inactive">Nieaktywne</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="form-edit-label">Kategoria</label>
            <select name="category" value={formData.category} onChange={handleChange} >
              <option value="tech">Technologia</option>
              <option value="real_estate">Nieruchomości</option>
              <option value="jobs">Praca</option>
              <option value="others">Inne</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="form-edit-label">Autor</label>
            <input
              name="author"
              placeholder="Podaj imię i nazwisko"
              value={formData.author}
              onChange={handleChange}          
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="form-edit-label">Kontakt</label>
            <input
              name="contact"
              placeholder="Podaj email lub telefon"
              value={formData.contact}
              onChange={handleChange}          
              required
            />
          </div>
        </div>

        {previewImage && (
          <div className="mb-2">
            <label className="form-edit-label">Aktualne zdjęcie</label>
            <img src={previewImage} alt="Podgląd" className="max-h-40 object-contain rounded border mt-1" />
          </div>
        )}

        <label className="form-edit-label">Zmień zdjęcie</label>
        <input type="file" onChange={handleImageChange}  />

        <div className="flex justify-between mt-4">
          <button type="submit" className="submit-button">
            Zapisz
          </button>

          <button
            onClick={onCancel}
            className="cancel-button"
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAds;
