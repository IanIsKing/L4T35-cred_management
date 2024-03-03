// This component is a modal that is used to add new Organizational Units, Divisions, Repositories, and Users.
//It is used in the Organizational Units, Divisions, Repositories, and Users pages.
//It is also used in the Repository page to add new repositories to the selected repository.
import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import MultiSelectDropdown from "../MultiSelectDropdown";
import { IoMdAddCircle } from "react-icons/io";
import { IoIosBusiness } from "react-icons/io";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FcFilingCabinet } from "react-icons/fc";
import { Row, Col, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

// Data imports
import { getDivisions } from "../../data-layer/divisions";
import { getRepositories } from "../../data-layer/repositories";
import { getUsers } from "../../data-layer/users";
import { createOU } from "../../data-layer/ous";
import { createDivision } from "../../data-layer/divisions";
import { createRepository } from "../../data-layer/repositories";
import { updateRepository } from "../../data-layer/repositories";

// AddModal component take in the following props: addType, selectedData, and className.
// The addType prop is a string that specifies the type of data to be added.
// The selectedData prop is an object that contains the data of the selected item. Optional prop
// The className prop is a string that specifies the class name of the add button. Optional prop
export default function AddModal({
  addType,
  selectedData = false,
  className = "addButton",
}) {
  // State variables
  const [basicModal, setBasicModal] = useState(false);
  const { currentUser } = useAuth();
  const [data, setData] = useState({ name: "", description: "" });
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [options, setOptions] = useState([]);
  const token = localStorage.getItem("token");
  let header = "Add";
  let icon = "icon";
  let caption = "caption";
  const [selectedOptions, setSelectedOptions] = useState({
    subDir: [],
  });
  const [repos, setRepos] = useState(
    selectedData.repos || [
      {
        name: "",
        username: "",
        password: "",
        additionalInfo: "",
      },
    ]
  );

  // Function to toggle the modal
  const toggleOpen = () => {
    setBasicModal(!basicModal);
  };

  // Set the header, caption, and icon based on the addType prop
  switch (addType) {
    // If the addType is "OU", set the header to "Add Organizational Unit", the caption to "Divisions", and the icon to the Organizational Unit icon
    case "OU":
      header = "Add Organizational Unit";
      caption = "Divisions";
      icon = (
        <div className="circle-icon-ou">
          <IoIosBusiness size={50} />
        </div>
      );
      break;
    // If the addType is "Division", set the header to "Add Division", the caption to "Repositories", and the icon to the Division icon
    case "Division":
      header = "Add Division";
      caption = "Repositories";
      icon = (
        <div className="circle-icon-div2">
          <BsFillHouseDoorFill size={50} />
        </div>
      );
      break;
    // If the addType is "Repository", set the header to "Add Repository", the caption to "Users", and the icon to the Repository icon
    case "Repository":
      header = "Add Repository";
      caption = "Users";
      icon = (
        <div className="circle-icon-div2">
          <FcFilingCabinet size={50} />
        </div>
      );
      break;
    // If the addType is "Repo", set the header to "Add Repo", the caption to "Users", and the icon to null
    case "Repo":
      header = "Add Repo";
      caption = "Users";
      icon = null;
      break;
    default:
      header = "Add";
      console.error("Invalid addType");
  }

  // Function to handle the change of the repository fields
  const handleRepoChange = (index, event) => {
    const updatedRepos = [...repos];
    updatedRepos[index][event.target.name] = event.target.value;
    setRepos(updatedRepos);
  };

  // Function to add a new repository
  const addRepo = () => {
    setRepos([
      ...repos,
      { name: "", username: "", password: "", additionalInfo: "" },
    ]);
  };

  // Function to remove a repository
  const removeRepo = (index) => {
    const updatedRepos = [...repos];
    updatedRepos.splice(index, 1);
    setRepos(updatedRepos);
  };

  // Function to handle the change of the input fields
  const onChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  // Update the data state when the selectedOptions state changes
  useEffect(() => {
    setData((data) => ({ ...data, subDir: selectedOptions.subDir }));
  }, [selectedOptions]);

  // Fetch the data based on the addType prop, if the selectedData prop is not provided or if the selectedData prop changes then fetch the data
  useEffect(() => {
    let data = [];
    if (selectedData) {
      setData(selectedData);
    } else {
      setLoading(true);
      const fetchData = async () => {
        try {
          switch (addType) {
            case "OU":
              data = await getDivisions(token);
              setOptions(data);
              setLoading(false);
              break;
            case "Division":
              data = await getRepositories(token);
              setOptions(data);
              setLoading(false);
              break;
            case "Repository":
              data = await getUsers(token);
              setOptions(data);
              setLoading(false);
              break;
            case "Repo":
              console.log("No user options are needed for Repo");
              break;
            default:
              console.error("Invalid addType");
              throw new Error("Invalid addType");
          }
        } catch (error) {
          console.error("Failed to fetch ous", error);
          setApiError(error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [token, addType, selectedData]);

  // Function to save the changes made in the modal
  const handleSave = async (event) => {
    event.preventDefault();
    // Check if all fields are filled
    if (
      data.name === "" ||
      data.description === "" ||
      (selectedOptions.subDir.length === 0 && addType !== "Repo")
    ) {
      setError("All fields are required");
      return;
    }
    try {
      switch (addType) {
        case "OU":
          await createOU(data, token);
          break;
        case "Division":
          await createDivision(data, token);
          break;
        case "Repository":
          // Check if at least one repository is added
          if (repos.length === 0) {
            setError("At least one repository is required");
            return;
          }
          // Check if all fields are filled for each repository
          if (
            repos.some((repo) => Object.values(repo).some((val) => val === ""))
          ) {
            setError("All fields are required for each repository");
            return;
          }
          data.repos = repos;
          await createRepository(data, token);
          break;
        case "Repo":
          if (repos.length === 0) {
            setError("At least one repository is required");
            return;
          }
          if (
            repos.some((repo) => Object.values(repo).some((val) => val === ""))
          ) {
            setError("All fields are required for each repository");
            return;
          }
          data.repos = repos;
          await updateRepository(data, token);
          break;
        default:
          throw new Error("Invalid addType");
      }
      toggleOpen();
      window.location.reload();
    } catch (error) {
      // Set the error message received from the backend or any other error
      setError(error.message);
      console.error("Error saving changes ", error);
    }
  };

  return (
    <>
      <div onClick={toggleOpen}>
        <IoMdAddCircle size={60} className={className} addType={addType} />
      </div>

      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{header}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {icon}
              <form>
                <MDBInput
                  className="input"
                  name="name"
                  value={data.name}
                  placeholder="Name"
                  label="Name"
                  id="name"
                  type="text"
                  size="lg"
                  required
                  disabled={addType === "Repo" && currentUser.role !== "admin"}
                  onChange={(event) => onChangeHandler(event)}
                />
                <MDBInput
                  className="input"
                  name="description"
                  value={data.description}
                  placeholder="Description"
                  label="Description"
                  id="description"
                  type="text"
                  size="lg"
                  required
                  disabled={addType === "Repo" && currentUser.role !== "admin"}
                  onChange={(event) => onChangeHandler(event)}
                />

                {loading && <h3>Loading...</h3>}
                {apiError ? (
                  <h3>{apiError.response.data.message}</h3>
                ) : (
                  data &&
                  (addType === "Repository" || addType === "Repo" ? (
                    <>
                      {addType === "Repository" && (
                        <MultiSelectDropdown
                          caption={caption}
                          options={options}
                          selectedOptions={selectedOptions.subDir}
                          setSelectedOptions={setSelectedOptions}
                          selectionType="subDir"
                        />
                      )}
                      {repos.map((repo, index) => (
                        <div key={index} className="selection-box mt-3">
                          <Container>
                            <Row className="justify-content-md-center">
                              <Col xs={5}>
                                <MDBInput
                                  name="name"
                                  value={repo.name}
                                  placeholder="Repo Name"
                                  label={`Repo Name ${index + 1}`}
                                  size="sm"
                                  required
                                  onChange={(event) =>
                                    handleRepoChange(index, event)
                                  }
                                />
                              </Col>
                              <Col xs={6}>
                                <MDBInput
                                  name="username"
                                  value={repo.username}
                                  placeholder="Repo Username"
                                  label={`Repo Username ${index + 1}`}
                                  size="sm"
                                  required
                                  onChange={(event) =>
                                    handleRepoChange(index, event)
                                  }
                                />
                              </Col>
                              <Col xs={1}>
                                <p
                                  onClick={() => removeRepo(index)}
                                  style={{ cursor: "pointer" }}
                                >
                                  X
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={5}>
                                <MDBInput
                                  name="password"
                                  value={repo.password}
                                  placeholder="Repo Password"
                                  label={`Repo Password ${index + 1}`}
                                  size="sm"
                                  required
                                  onChange={(event) =>
                                    handleRepoChange(index, event)
                                  }
                                />
                              </Col>
                              <Col>
                                <MDBInput
                                  name="additionalInfo"
                                  value={repo.additionalInfo}
                                  placeholder="Repo Additional Info"
                                  label={`Repo Additional Info ${index + 1}`}
                                  size="sm"
                                  onChange={(event) =>
                                    handleRepoChange(index, event)
                                  }
                                />
                              </Col>
                            </Row>
                          </Container>
                        </div>
                      ))}
                      <MDBBtn onClick={addRepo} className="mt-3">
                        Add Another Repo
                      </MDBBtn>
                    </>
                  ) : (
                    <MultiSelectDropdown
                      caption={caption}
                      options={options}
                      selectedOptions={selectedOptions.subDir}
                      setSelectedOptions={setSelectedOptions}
                      selectionType="subDir"
                    />
                  ))
                )}

                <div className="text-center text-md-start mt-4 pt-2">
                  {error !== null && <div className="error">{error}</div>}
                </div>
              </form>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn
                onClick={(event) => {
                  handleSave(event);
                }}
              >
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
