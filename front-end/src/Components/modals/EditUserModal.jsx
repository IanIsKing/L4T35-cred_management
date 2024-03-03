// This component is a modal that allows the user to view and edit their profile.
// It used in the user list page for admins.
import React, { useEffect, useState } from "react";
import { updateUser } from "../../api";
import AvatarsModal from "./avatarsModel";
import MultiSelectDropdown from "../MultiSelectDropdown";
import { getOUs } from "../../data-layer/ous";
import { Form } from "react-bootstrap";
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

// This component takes the following props - basicModal, setBasicModal, selectedUser, setSelectedUser.
// The basicModal prop is a boolean to show or hide the modal.
// The setBasicModal prop is a function to set the basicModal state in the parent component's state.
// The selectedUser prop is the user object to be edited.
// The setSelectedUser prop is a function to set the selectedUser state in the parent component's state.
export default function Modal({
  basicModal,
  setBasicModal,
  selectedUser,
  setSelectedUser,
}) {
  const toggleOpen = () => setBasicModal(!basicModal);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(selectedUser.avatar);
  const [selectedOptions, setSelectedOptions] = useState({
    OUs: selectedUser.OUs,
    divisions: selectedUser.divisions,
    repos: selectedUser.repos,
  });

  const [options, setOptions] = useState({
    OUs: [],
    divisions: [],
    repos: [],
  });

  const token = localStorage.getItem("token");

  // Fetch OUs from the server, OUs are chained to divisions and divisions are chained to repositories
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const dataOUs = await getOUs(token);
        setOptions((currentOptions) => ({ ...currentOptions, OUs: dataOUs }));
        setLoading(false);
      } catch (error) {
        console.error("Failed to list OUs:", error);
        setLoading(false);
        setError(error);
      }
    };
    fetchData();
  }, [token]);

  // Update the divisions and repositories when the OUs are updated
  useEffect(() => {
    if (!loading) {
      let updatedDivisions = [];
      let updatedRepos = [];
      selectedOptions.OUs.forEach((ou) => {
        ou.subDir.forEach((division) => {
          if (!updatedDivisions.some((div) => div._id === division._id)) {
            updatedDivisions.push(division);
          }
        });

        updatedDivisions.forEach((division) => {
          division.subDir.forEach((repo) => {
            if (!updatedRepos.some((r) => r._id === repo._id)) {
              updatedRepos.push(repo);
            }
          });
        });
        setOptions((currentOptions) => ({
          ...currentOptions,
          divisions: updatedDivisions,
          repos: updatedRepos,
        }));
      });
    }
  }, [selectedOptions.OUs, selectedOptions.divisions, loading, options.OUs]);

  // Update the selected user when the user object is updated
  const onChangeHandler = (event) => {
    setSelectedUser({
      ...selectedUser,
      [event.target.name]: event.target.value,
    });
  };

  // Update the selected options when the selected user is updated
  useEffect(() => {
    setSelectedOptions((selectedOptions) => ({
      ...selectedOptions,
      OUs: selectedUser.OUs,
      divisions: selectedUser.divisions,
      repos: selectedUser.repos,
    }));
  }, [selectedUser]);

  // Update the selected user when the avatar is updated
  useEffect(() => {
    setSelectedUser((currentUser) => ({ ...currentUser, avatar }));
  }, [avatar, setSelectedUser]);

  // Save the changes to the user object
  const handleSave = async (event) => {
    event.preventDefault();
    if (
      selectedUser.email === "" ||
      selectedUser.firstName === "" ||
      selectedUser.lastName === ""
    ) {
      setError("All fields are required");
      return;
    }
    try {
      const updatedUser = {
        ...selectedUser,
        OUs: selectedOptions.OUs,
        divisions: selectedOptions.divisions,
        repos: selectedOptions.repos,
      };

      await updateUser(updatedUser, token);
      toggleOpen();
      window.location.reload();
    } catch (error) {
      setError(error.message);
      console.error("Error saving changes ", error);
    }
  };

  return (
    <>
      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>My profile</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <MDBModalBody>
                  <AvatarsModal
                    avatar={selectedUser.avatar}
                    setAvatar={setAvatar}
                  />
                  <form>
                    <MDBInput
                      className="input"
                      name="email"
                      value={selectedUser.email}
                      placeholder="Email"
                      label="Email address"
                      id="email"
                      type="email"
                      size="lg"
                      required
                      disabled
                    />
                    <MDBInput
                      className="input"
                      name="firstName"
                      value={selectedUser.firstName}
                      placeholder="First Name"
                      label="First Name"
                      id="firstName"
                      type="text"
                      size="lg"
                      required
                      onChange={(event) => onChangeHandler(event)}
                    />
                    <MDBInput
                      className="input"
                      name="lastName"
                      value={selectedUser.lastName}
                      placeholder="Last Name"
                      label="Last Name"
                      id="lastName"
                      type="text"
                      size="lg"
                      required
                      onChange={(event) => onChangeHandler(event)}
                    />
                    <Form.Select
                      name="role"
                      id="role"
                      value={selectedUser.role}
                      className="btn btn-primary dropdown-toggle mb-1"
                      style={{ width: "30%" }}
                      onChange={(event) => onChangeHandler(event)}
                    >
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </Form.Select>

                    {options.OUs ? (
                      <>
                        <MultiSelectDropdown
                          caption="Op Units"
                          options={options.OUs}
                          selectedOptions={selectedOptions.OUs}
                          setSelectedOptions={setSelectedOptions}
                          selectionType="OUs"
                        />
                        {options.divisions.length > 0 && (
                          <>
                            <MultiSelectDropdown
                              caption="Divisions"
                              options={options.divisions}
                              selectedOptions={selectedOptions.divisions}
                              setSelectedOptions={setSelectedOptions}
                              selectionType="divisions"
                            />
                            {options.repos.length > 0 && (
                              <MultiSelectDropdown
                                caption="Repository"
                                options={options.repos}
                                selectedOptions={selectedOptions.repos}
                                setSelectedOptions={setSelectedOptions}
                                selectionType="repos"
                              />
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <p className="fw-normal mb-1">No options available</p>
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
              </>
            )}
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
