import { Footer } from "@/widgets/layout";
import { NavbarVenue } from "@/widgets/venue/Navbar";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "@/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { getHoursDifference } from "@/utils/formatDate";
import { getOrderDates, orderFn, updateOrder } from "../../../requests";

function Reserve() {
  const [startDate, setStartDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const {
    selectedVenue,
    user,
    selectedBooking,
    setSelectedVenue,
    setSelectedBooking,
  } = useContext(UserContext);
  const [numOfCars, setNumOfCars] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isParking, setIsParking] = useState(false);
  const [parkingPrice, setParkingPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="w-[300px] rounded-lg bg-gray-100 p-2"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  const calculateAmount = () => {
    const hours = getHoursDifference(startDate, endTime);
    if (hours < 0) return;
    if (isParking) {
      let amount = parkingPrice * hours * +numOfCars;
      let venueAmount = price * hours;
      let sum = amount + venueAmount;
      setTotal(sum);
      return;
    }
    let sum = price * hours;
    setTotal(sum);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let newObj = {
        venueId: selectedVenue?._id,
        startTime: startDate,
        endTime,
        numOfCars: +numOfCars,
        totalPrice: total,
        hostId: selectedVenue?.userId?._id,
        clientEmail: user?.email,
        hostEmail: selectedVenue?.userId?.email,
        clientName: user?.username,
        venueName: selectedVenue?.name,
      };
      await orderFn(newObj);
      setSelectedVenue(null);
      navigate("/dashboard/bookings");
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
        venueId: selectedBooking?.venueId?._id,
        startTime: startDate,
        endTime,
        numOfCars: +numOfCars,
        totalPrice: total,
        hostId: selectedBooking?.hostId,
        clientEmail: selectedBooking?.userId?.email,
        hostEmail: user.email,
        clientName: selectedBooking?.userId?.username,
        venueName: selectedBooking?.venueId?.name,
      };
      await updateOrder(selectedBooking._id, newObj);
      setSelectedBooking(null);
      navigate("/dashboard/bookings");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setNumOfCars(selectedBooking.numOfCars);
      setStartDate(new Date(selectedBooking.startTime));
      setEndTime(new Date(selectedBooking.endTime));
      fetchDatesUpdates(selectedBooking);
      setImage(selectedBooking.venueId.image);
      setPrice(selectedBooking.venueId.price);
      setIsParking(selectedBooking.venueId.parking);
      setParkingPrice(selectedBooking.venueId.parkingPrice);
    }
  }, []);

  useEffect(() => {
    calculateAmount();
  }, [startDate, endTime, numOfCars]);

  const filterBookedTimes = (date) => {
    return bookings.some((booking) => {
      return (
        date >= new Date(booking.startTime) && date <= new Date(booking.endTime)
      );
    });
  };

  const fetchDates = async (val) => {
    try {
      const { data } = await getOrderDates(val);
      setBookings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDatesUpdates = async (val) => {
    try {
      const { data } = await getOrderDates(val.venueId._id);
      let newArr = data.filter((booking) => booking.startTime != val.startTime);
      setBookings(newArr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/auth/sign-in");
    }
  }, [user]);

  useEffect(() => {
    if (selectedVenue) {
      fetchDates(selectedVenue._id);
      setPrice(selectedVenue?.price);
      setParkingPrice(selectedVenue?.parkingPrice);
      setIsParking(selectedVenue?.parking);
      setImage(selectedVenue?.image);
    }
  }, [selectedVenue]);

  return (
    <>
      <NavbarVenue />
      <div className="container mx-auto min-h-[85vh] px-3 py-4">
        <figure className="relative h-96 w-full">
          <img
            className="h-full w-full rounded-xl object-cover object-center"
            src={image}
            alt="venue image"
          />
          <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 px-6 py-4 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <div>
              <Typography variant="h5" color="blue-gray">
                {selectedVenue?.name || selectedBooking.venueId.name}
              </Typography>
            </div>
            <Typography variant="h5" color="blue-gray">
              {price} per hour
            </Typography>
          </figcaption>
        </figure>
        <div className="my-4">
          {isParking && (
            <div className="items-center space-y-3 md:flex md:space-x-4 md:space-y-0">
              <Input
                label="Number of Cars"
                value={numOfCars}
                onChange={(e) => setNumOfCars(e.target.value)}
              />
              <Input
                label="Parking per hour"
                defaultValue={parkingPrice}
                readOnly
              />
            </div>
          )}
          <div className="my-3 items-center space-y-3 md:flex md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <Typography variant="small" className="mb-2">
                Start Time
              </Typography>
              <DatePicker
                customInput={<ExampleCustomInput />}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM d, yyyy h:mm aa"
                showTimeSelect
                timeFormat="hh:mm"
                minDate={new Date()}
                className="rounded-lg border border-gray-400 p-1"
                filterTime={(time) => !filterBookedTimes(time)}
              />
            </div>
            <div className="flex-1">
              <Typography variant="small" className="mb-2">
                End Time
              </Typography>
              <DatePicker
                customInput={<ExampleCustomInput />}
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                dateFormat="MMMM d, yyyy h:mm aa"
                showTimeSelect
                timeFormat="hh:mm"
                minDate={startDate}
                className="rounded-lg border border-gray-400 p-1"
                filterTime={(time) => !filterBookedTimes(time)}
              />
            </div>
          </div>
          <div className="my-10 items-center space-y-3 md:flex md:space-x-4 md:space-y-0">
            <div className="w-full md:max-w-xl">
              <Button size="lg" fullWidth={true}>
                {total}
              </Button>
            </div>
            <div className="w-full md:max-w-xl">
              {id ? (
                <Button
                  disabled={loading}
                  size="lg"
                  fullWidth={true}
                  onClick={handleUpdate}
                >
                  {loading ? "Loading..." : "Update"}
                </Button>
              ) : (
                <Button
                  disabled={loading}
                  size="lg"
                  fullWidth={true}
                  onClick={handleBook}
                >
                  {loading ? "Loading..." : "Book"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Reserve;
