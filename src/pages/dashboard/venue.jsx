import React, { useContext, useEffect, useState } from "react";
import { getUserVenues } from "../../../requests";
import { CardDasnboard } from "@/widgets/venue/CardDasnboard";
import { UserContext } from "@/ContextProvider";
import LoadingSpinner from "@/shared/LoadingSpinner";

function Venue() {
  const [venues, setVenues] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const getVenues = async () => {
    try {
      const { data } = await getUserVenues(user?._id);
      setVenues(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVenues();
  }, []);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {venues?.map((venue) => (
          <CardDasnboard key={venue?._id} venue={venue} />
        ))}
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default Venue;
