import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";
import { deleteOrder, getBookings } from "../../../requests";
import { useContext, useEffect, useState } from "react";
import { hasPassed, parseDateTime } from "@/utils/formatDate";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "@/ContextProvider";
import LoadingSpinner from "@/shared/LoadingSpinner";

export function Bookings() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { setSelectedBooking } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await getBookings();
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      let newOrdersArray = orders.filter((o) => o._id !== id);
      setOrders(newOrdersArray);
    } catch (error) {
      console.log(error);
      alert("Something went wrong deleting booking! Please try again later.");
    }
  };

  const handleClick = (order) => {
    setSelectedBooking(order);
    navigate(`/reserve/${order?._id}`);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Bookings Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "user",
                  "venue",
                  "startTime",
                  "endTime",
                  "price",
                  "location",
                  "",
                  "cancel",
                  "expired",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 px-5 py-3 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, key) => {
                const className = `py-3 px-5 ${
                  key === authorsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={order?._id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={order?.userId?.profilePicture}
                          alt={order?.userId?.username}
                          size="sm"
                          variant="rounded"
                        />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {order?.userId?.username}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {order?.userId?.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {order?.venueId?.name}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {parseDateTime(order?.startTime)}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {parseDateTime(order?.endTime)}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="cursor-pointer text-xs font-semibold text-blue-gray-600">
                        {order?.totalPrice}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-gray-600">
                        {order?.venueId?.location}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="cursor-pointer text-xs font-semibold text-teal-600">
                        {hasPassed(order?.endTime) ? (
                          <span className="text-red-200 line-through">
                            Reschedule
                          </span>
                        ) : (
                          <span onClick={() => handleClick(order)}>
                            Reschedule
                          </span>
                        )}
                      </Typography>
                    </td>
                    <td className={className}>
                      <button
                        className="rounded-lg border border-red-200 p-1 text-xs text-gray-600"
                        onClick={() => handleDelete(order?._id)}
                      >
                        Cancel
                      </button>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold">
                        {hasPassed(order?.endTime) ? (
                          <span className="text-red-500">Expired</span>
                        ) : (
                          <span className="text-teal-600">Not Yet</span>
                        )}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {loading && <LoadingSpinner />}
    </div>
  );
}

export default Bookings;
