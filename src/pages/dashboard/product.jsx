import uploadImage from "@/utils/uploadImage";
import ProgressBar from "@ramonak/react-progress-bar";
import React, { useContext, useEffect, useState } from "react";
import { addVenue, updateVenue } from "../../../requests";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "@/ContextProvider";

function Product() {
  const [venueName, setVenueName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [hasParking, setHasParking] = useState(false);
  const [location, setLocation] = useState("");
  const [parkingPrice, setParkingPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState("");
  const { id } = useParams();
  const { selectedVenue } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let newObj = {
        name: venueName,
        price: +price,
        description,
        location,
        parking: hasParking,
        parkingPrice: +parkingPrice,
        image: imageUrl,
      };
      await addVenue(newObj);
      setVenueName("");
      setDescription("");
      setPrice("");
      setLocation("");
      setProgress("");
      setHasParking(false);
      setImageUrl("");
      navigate("/venue");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let newObj = {
        name: venueName,
        price: +price,
        description,
        location,
        parking: hasParking,
        parkingPrice: +parkingPrice,
        image: imageUrl,
      };
      await updateVenue(id, newObj);
      setVenueName("");
      setDescription("");
      setPrice("");
      setLocation("");
      setProgress("");
      setHasParking(false);
      setImageUrl("");
      navigate("/venue");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setVenueName(selectedVenue?.name);
      setDescription(selectedVenue?.description);
      setLocation(selectedVenue?.location);
      setImageUrl(selectedVenue?.image);
      setPrice(selectedVenue?.price);
      setParkingPrice(selectedVenue?.parkingPrice);
      setHasParking(selectedVenue?.parking);
    }
  }, [id]);

  useEffect(() => {
    if (!file) return;
    uploadImage(file, setImageUrl, setProgress);
  }, [file]);

  return (
    <section className="relative text-gray-600">
      <div className="container mx-auto px-5 py-24">
        <div className="mb-12 flex w-full flex-col text-center">
          <h1 className="title-font mb-4 text-2xl font-medium text-gray-900 sm:text-3xl">
            {id ? "Update Venue" : "Add Venue"}
          </h1>
        </div>
        <div className="mx-auto md:w-2/3 lg:w-1/2">
          <div className="-m-2 flex flex-wrap">
            <div className="w-1/2 p-2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="text-sm leading-7 text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                />
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="relative">
                <label
                  htmlFor="price"
                  className="text-sm leading-7 text-gray-600"
                >
                  Price per hour
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
            {progress > 0 && (
              <div className="my-2">
                <ProgressBar completed={progress} />
              </div>
            )}
            {imageUrl && (
              <div className="my-4 h-[30vh]">
                <img
                  src={imageUrl}
                  alt="detail image"
                  className="h-full w-full object-cover md:rounded-lg"
                />
              </div>
            )}

            <div className="w-full p-2">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="text-sm leading-7 text-gray-600"
                >
                  Description
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="h-32 w-full resize-none rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="w-full p-2">
              <label className="inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  // value={hasParking}
                  onChange={(e) => setHasParking(e.target.checked)}
                  className="peer sr-only"
                  checked={hasParking}
                />
                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                <span className="ms-3 text-sm font-medium text-gray-500">
                  Has parking
                </span>
              </label>
            </div>

            <div className="w-1/2 p-2">
              <div className="relative">
                <label
                  htmlFor="location"
                  className="text-sm leading-7 text-gray-600"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="relative">
                <label
                  htmlFor="parking"
                  className="text-sm leading-7 text-gray-600"
                >
                  Parking price
                </label>
                <input
                  type="text"
                  id="parking"
                  name="parking"
                  className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                  value={parkingPrice}
                  onChange={(e) => setParkingPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full p-2">
              {id ? (
                <button
                  className="mx-auto flex rounded border-0 bg-indigo-500 px-8 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Update"}
                </button>
              ) : (
                <button
                  className="mx-auto flex rounded border-0 bg-indigo-500 px-8 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Add"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
