import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import CurrencyConverter from "./CurrencyConverter"; // Import CurrencyConverter
import CountryStatistics from "./CountryStatistics";
import Modal from "react-modal"; // Importing the Modal component

// Ensure modal styles are attached to the root element
Modal.setAppElement('#root');

const TouristPlaces = () => {
  const { code } = useParams();
  const { countries, fetchCountryPhotos } = useContext(AppContext); // Access the context
  const [photos, setPhotos] = useState([]);
  const [videoUrl, setVideoUrl] = useState(""); // Store selected video URL
  const [modalIsOpen, setModalIsOpen] = useState(false); // Control modal visibility

  const country = countries.find((c) => c.cca3 === code);

  useEffect(() => {
    if (country?.name?.common) {
      fetchCountryPhotos(country.name.common).then(setPhotos);
    }
  }, [country, fetchCountryPhotos]);

  const openModal = (videoId) => {
    setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setVideoUrl(""); // Reset video URL
  };

  if (!country) {
    return <div className="text-center mt-20 text-red-500 text-xl">❌ Country not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">

      {/* Flex Container for Country Statistics and Currency Converter */}
      <div className="flex flex-col md:flex-row justify-between gap-12">
        <div className="w-full md:w-1/2">
          <CountryStatistics />
        </div>
        <div className="w-full md:w-1/2">
          <CurrencyConverter countryCurrencyCode={country.currencies ? Object.keys(country.currencies)[0] : "USD"} />
        </div>
      </div>

      <h1 className="text-4xl font-semibold text-gray-800 mt-14 text-center">{country.name.common} Tourist Places</h1>


      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20">
        {photos.length > 0 ? (
          photos.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Tourist Place ${index + 1}`}
                className="rounded-lg shadow-md w-full h-64 object-cover"
              />
              <button
                onClick={() => openModal("dQw4w9WgXcQ")} // Replace with actual video ID
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-md"
              >
                Watch Video
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-lg font-semibold text-gray-500">
            No tourist places found for this country.
          </div>
        )}
      </div>

      {/* Modal to display video */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-4 rounded-lg">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-xl"
          >
            ×
          </button>
          <iframe
            key={videoUrl} // Add key to force re-render when video URL changes
            width="560"
            height="315"
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Tourist Place Video"
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default TouristPlaces;
