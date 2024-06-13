import { UserContext } from "@/ContextProvider";
import uploadImage from "@/utils/uploadImage";
import { useContext, useEffect, useState } from "react";
import { updateUser } from "../../../requests";
import ProgressBar from "@ramonak/react-progress-bar";

export function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [userName, setUserName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profilePic, setProfilePic] = useState(user?.profilePicture || "");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let newObj = {
        username: userName,
        email,
        phone,
        profilePicture: profilePic,
      };
      const { data } = await updateUser(newObj);
      setUser(data);
      setProgress(0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!file) return;
    uploadImage(file, setProfilePic, setProgress);
  }, [file]);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <label htmlFor="profile">
        <img
          className="h-36 w-36 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500"
          src={profilePic}
          alt={userName}
        />
      </label>
      <input
        type="file"
        id="profile"
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {progress > 0 && (
        <div className="my-2">
          <ProgressBar completed={progress} />
        </div>
      )}
      <div className="w-1/2 p-2">
        <div className="relative">
          <label htmlFor="name" className="text-sm leading-7 text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>
      <div className="w-1/2 p-2">
        <div className="relative">
          <label htmlFor="email" className="text-sm leading-7 text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>
      <div className="w-1/2 p-2">
        <div className="relative">
          <label htmlFor="phone" className="text-sm leading-7 text-gray-600">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>
      <div className="w-full p-2">
        <button
          className="mx-auto flex rounded border-0 bg-indigo-500 px-8 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
          disabled={loading}
          onClick={handleUpdate}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </div>
    </section>
  );
}

export default Profile;
