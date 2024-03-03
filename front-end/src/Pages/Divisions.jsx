// Divisions Page to display all the company Divisions
import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Navbar from "../Components/NavBar";
import List from "../Components/List";
import { getDivisions } from "../data-layer/divisions";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FcFilingCabinet } from "react-icons/fc";
import AddModal from "../Components/modals/AddModal";

function Ous() {
  const [ous, setOus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Columns for the table to display the divisions data with the icons for the divisions and the credential repositories for each division
  // The columns are defined using the react-table library.
  const columns = React.useMemo(
    () => [
      {
        Header: "Divisions",
        accessor: "name",
        Cell: ({ value }) => (
          <div className="d-flex">
            <div className="circle-icon-div">
              <BsFillHouseDoorFill size={25} />
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
        Header: "Credential Repository",
        accessor: "subDir",
        Cell: ({ value }) => {
          return value.map((subDir) => (
            <div>
              <div className="circle-icon-repo2 mt-1">
                <FcFilingCabinet />
              </div>
              <p className="d-inline"> - {subDir.name}</p>{" "}
            </div>
          ));
        },
      },
    ],
    []
  );

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getDivisions(token);
        setOus(data);
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
      <AddModal addType="Division" />
      <br />
      <Row>
        <h1 className="text-center">Divisions</h1>
      </Row>
      {loading && <h3>Loading...</h3>}
      {}
      {error ? (
        <h3>{error.response.data.message}</h3>
      ) : (
        ous && <List dataRaw={ous} columns={columns} />
      )}
    </Container>
  );
}

export default Ous;
