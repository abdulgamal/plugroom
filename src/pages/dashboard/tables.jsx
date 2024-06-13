import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";
import { deleteUser, getAllUsers, updateStatus } from "../../../requests";
import { useEffect, useState } from "react";

export function Tables() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      let newObj = {
        isAdmin: !status,
      };
      const { data } = await updateStatus(id, newObj);
      const newUserArray = users.map((user) => (user?._id == id ? data : user));
      setUsers(newUserArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      const newUserArray = users.filter((user) => user?._id !== id);
      setUsers(newUserArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["author", "phone", "status", "joined", "", ""].map(
                  (el, i) => (
                    <th
                      key={i}
                      className="border-b border-blue-gray-50 px-5 py-3 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {users.map(
                (
                  {
                    username,
                    profilePicture,
                    email,
                    phone,
                    isSuperAdmin = false,
                    isAdmin,
                    createdAt,
                    _id,
                  },
                  key,
                ) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar
                            src={profilePicture}
                            alt={username}
                            size="sm"
                            variant="rounded"
                          />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {username}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phone}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={
                            isSuperAdmin
                              ? "green"
                              : isAdmin
                              ? "teal"
                              : "blue-gray"
                          }
                          value={
                            isSuperAdmin
                              ? "isSuperAdmin"
                              : isAdmin
                              ? "isAdmin"
                              : "notAdmin"
                          }
                          className="w-fit px-2 py-0.5 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {new Date(createdAt).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={className}>
                        <button
                          className="cursor-pointer text-xs font-semibold text-blue-gray-600"
                          onClick={() => handleStatusChange(_id, isAdmin)}
                        >
                          Change Status
                        </button>
                      </td>
                      <td className={className}>
                        <button
                          className="text-xs font-semibold text-red-600"
                          onClick={() => handleDelete(_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
