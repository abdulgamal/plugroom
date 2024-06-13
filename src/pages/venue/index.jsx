import { Footer } from "@/widgets/layout";
import { CardVenue } from "@/widgets/venue/CardVenue";
import { NavbarVenue } from "@/widgets/venue/Navbar";
import React, { useContext, useEffect, useState } from "react";
import { getVenues } from "../../../requests";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/ContextProvider";

function Venue() {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const fetchVenues = async () => {
    try {
      const { data } = await getVenues();
      setVenues(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/auth/sign-in");
    }
  }, [user]);

  return (
    <>
      <NavbarVenue />
      <div className="mb-4 min-h-[85vh] px-3">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {venues.map((venue) => (
            <CardVenue key={venue?._id} venue={venue} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Venue;
