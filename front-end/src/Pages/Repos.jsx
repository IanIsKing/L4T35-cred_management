// Divisions Page to display all the company Divisions
import React, { useState, useEffect, useCallback } from "react";
import { getRepositories } from "../data-layer/repositories";
import { FcFilingCabinet } from "react-icons/fc";
import { Container, Row } from "react-bootstrap";
import { FaUserSecret } from "react-icons/fa";
import EditUserModal from "../Components/modals/EditUserModal";
import AddModal from "../Components/modals/AddModal";
import Navbar from "../Components/NavBar";
import List from "../Components/List";

function Repositories() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [basicModal, setBasicModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [repos, SetRepos] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Columns for the table to display the repositories data with the icons for the repositories and the details for each repository
  const toggleOpen = useCallback(() => {
    setBasicModal((prev) => !prev);
  }, []);

  // Function to handle the selected user
  const handleSelectedUser = useCallback(
    (user) => {
      setSelectedUser(user);
      toggleOpen();
    },
    [toggleOpen]
  );

  // Fetch the repositories data from the server
  const columns = React.useMemo(
    () => [
      {
        Header: "Credential Repositories",
        accessor: "name",
        Cell: ({ value }) => (
          <div className="d-flex">
            <div className="circle-icon-repo">
              <FcFilingCabinet size={25} />
              {"   "}
            </div>
            <h5 className="mt-2">{value}</h5>
          </div>
        ),
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Repo Details (Select to see password)",
        accessor: "repos",
        Cell: ({ value }) => {
          return value.map((repo) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={(event) => {
                event.stopPropagation();
                alert(
                  "Repo Login: " +
                    repo.name +
                    "\nUser Name : " +
                    repo.password +
                    "\nPassword : " +
                    repo.password +
                    "\nInfo : " +
                    repo.info
                );
              }}
            >
              <div className="circle-icon-detail2 mt-1">
                <FaUserSecret />
              </div>
              <p className="d-inline"> - {repo.name}</p>
            </div>
          ));
        },
      },
      {
        Header: "Linked Users",
        accessor: "subDir",
        Cell: ({ value }) => {
          return value.map((user) => (
            <div
              style={{ cursor: "pointer" }}
              className="d-flex align-items-center m-2"
              onClick={() => handleSelectedUser(user)}
            >
              <img
                src={user.avatar}
                alt=""
                style={{ width: "45px", height: "45px" }}
                className="rounded-circle mb-1"
              />
              <div className="ms-3">
                <p className="fw-bold mb-0">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-muted m-0">{user.email}</p>
              </div>
            </div>
          ));
        },
      },
    ],
    [handleSelectedUser]
  );

  // Fetch the repositories data from the backend
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getRepositories(token);
        SetRepos(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to list users:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <Container>
      <Navbar />
      <AddModal addType="Repository" />
      <br />
      <Row>
        <h1 className="text-center">Credential Repositories</h1>
      </Row>
      {loading && <h3>Loading...</h3>}
      {}
      {error ? (
        <h3>{error.response.data.message}</h3>
      ) : (
        repos && <List dataRaw={repos} columns={columns} />
      )}
      {selectedUser ? (
        <EditUserModal
          basicModal={basicModal}
          setBasicModal={setBasicModal}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      ) : null}
    </Container>
  );
}

export default Repositories;
