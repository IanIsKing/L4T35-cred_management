// User List component that displays a list of users and their details using MDBReactUIKit
import React, { useEffect, useState } from "react";
import { listUsers } from "../api";
import { IoIosBusiness } from "react-icons/io";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FcFilingCabinet } from "react-icons/fc";
import DateFormat from "../utils/DateFormat";
import EditUserModal from "./modals/EditUserModal";
import "../App.css";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

export default function UserList() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const token = localStorage.getItem("token");

  const handleSelectedUser = (user) => {
    setSelectedUser(user);
    toggleOpen();
  };

  // This function is called when the component is first rendered.
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await listUsers(token);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users from API:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : !users.length > 0 ? (
        <p>No users found</p>
      ) : (
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Organizational Units</th>
              <th scope="col">Divisions</th>
              <th scope="col">Credential Repositories</th>
              <th scope="col" style={{ textAlign: "right" }}>
                Dates
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {users.map((user, index) => (
              <tr
                name={user.firstName}
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectedUser(user)}
              >
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={user.avatar}
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <MDBBadge className={user.role} pill>
                    {user.role}
                  </MDBBadge>
                </td>
                <td>
                  {user.OUs.length > 0 ? (
                    user.OUs.map((ou, index) => (
                      <div className="m-2">
                        <div className="circle-icon-ou">
                          <IoIosBusiness size={15} />
                        </div>
                        <p key={index} className="d-inline">
                          {ou.name}{" "}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="fw-normal mb-1">
                      Not yet assigned {user.OUs.length}
                    </p>
                  )}
                </td>
                <td>
                  {user.divisions.length > 0 ? (
                    user.divisions.map((division, index) => (
                      <div className="m-2">
                        <div className="circle-icon-div2 mt-1">
                          <BsFillHouseDoorFill />
                        </div>
                        <p key={index} className="d-inline">
                          {division.name}{" "}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p key={index} className="text-muted mb-0">
                      Not yet assigned
                    </p>
                  )}
                </td>
                <td>
                  <td>
                    {user.repos.length > 0 ? (
                      user.repos.map((division, index) => (
                        <div className="m-2">
                          <div className="circle-icon-repo2 mt-1">
                            <FcFilingCabinet />
                          </div>
                          <p key={index} className="d-inline">
                            {division.name}{" "}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p key={index} className="text-muted mb-0">
                        Not yet assigned
                      </p>
                    )}
                  </td>
                </td>
                <td>
                  <p className="fw-normal mb-1" style={{ textAlign: "right" }}>
                    Last: {DateFormat(user.lastLoginDate)}
                  </p>
                  <p className="text-muted mb-0" style={{ textAlign: "right" }}>
                    Created: {DateFormat(user.createDate)}
                  </p>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      )}
      {selectedUser ? (
        <EditUserModal
          basicModal={basicModal}
          setBasicModal={setBasicModal}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      ) : null}
    </>
  );
}
