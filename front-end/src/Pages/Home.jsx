// Home Page to display all the user's credential repositories
import React, { useState, useEffect } from "react";
import { getMyRepositories } from "../data-layer/repositories";
import { FcFilingCabinet } from "react-icons/fc";
import { Container, Row } from "react-bootstrap";
import { FaUserSecret } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import AddModal from "../Components/modals/AddModal";
import Navbar from "../Components/NavBar";
import List from "../Components/List";

function Home() {
  const [loading, setLoading] = useState(false);
  const [repos, SetRepos] = useState([]);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const token = localStorage.getItem("token");

  // Columns for the table to display the repositories data with the icons for the repositories and the details for each repository
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
                alert("Password : " + repo.password);
              }}
            >
              <div className="circle-icon-detail2 mt-1">
                <FaUserSecret />
              </div>
              <p className="d-inline">
                {" "}
                - {repo.name} : {repo.additionalInfo}
              </p>
            </div>
          ));
        },
      },
      {
        Header: "Add Repo",
        id: "addRepo",
        Cell: ({ row }) => (
          <>
            <AddModal
              addType="Repo"
              selectedData={row.original}
              className="AddRepo"
            />
          </>
        ),
      },
    ],
    []
  );

  // Fetch the repositories data from the backend
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getMyRepositories(token);
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
      <br />
      <Row>
        <h2>Welcome {currentUser.firstName}</h2>
      </Row>
      <Row>
        <h1 className="text-center">My Credential Repositories</h1>
      </Row>
      {loading && <h3>Loading...</h3>}
      {}
      {error ? (
        <h3>{error.response.data.message}</h3>
      ) : (
        repos && <List dataRaw={repos} columns={columns} />
      )}
    </Container>
  );
}

export default Home;
