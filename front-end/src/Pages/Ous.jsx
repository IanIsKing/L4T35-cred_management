// Ous Page to display all the company OUs
import React, { useState, useEffect } from "react";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { Container, Row } from "react-bootstrap";
import { IoIosBusiness } from "react-icons/io";
import { getOUs } from "../data-layer/ous";
import AddModal from "../Components/modals/AddModal";
import Navbar from "../Components/NavBar";
import List from "../Components/List";

function Ous() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ous, setOus] = useState([]);
  const token = localStorage.getItem("token");

  // Columns for the table to display the OUs data with the icons for the OUs and the divisions for each OU
  const columns = React.useMemo(
    () => [
      {
        Header: "Organisational Units (OU)",
        accessor: "name",
        Cell: ({ value }) => (
          <div className="d-flex">
            <div className="circle-icon-ou">
              <IoIosBusiness size={30} />
            </div>
            <h5 className="mt-3">{value}</h5>
          </div>
        ),
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Divisions",
        accessor: "subDir",
        Cell: ({ value }) => {
          return value.map((division) => (
            <div>
              <div className="circle-icon-div2 mt-1">
                <BsFillHouseDoorFill />
              </div>
              <p className="d-inline">{division.name}</p>{" "}
            </div>
          ));
        },
      },
    ],
    []
  );

  // Fetch the OUs data from the server
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getOUs(token);
        setOus(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch ous", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <Container>
      <Navbar />
      <AddModal addType="OU" />

      <br />
      <Row>
        <h1 className="text-center">Organisational Units (OU)</h1>
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
