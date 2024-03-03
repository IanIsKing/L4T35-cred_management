// This is the UserModal component that is used to display the user's profile and allow the user to edit their profile.
//It is used in the Navbar component.
// This componet also handles the log out functionality.
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { updateUser } from "../../api";
import AvatarsModal from "./avatarsModel";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBInput,
} from "mdb-react-ui-kit";

// no props are passed to this component
export default function Modal() {
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const { currentUser, logout } = useAuth();
  const [user, setUser] = useState(currentUser);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const token = localStorage.getItem("token");

  // This function is called when the user clicks the log out button
  const handleLogOut = () => {
    logout();
  };

  // This function is called when the user changes the input fields.
  const onChangeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setUser((user) => ({ ...user, avatar }));
  }, [avatar]);

  const handleSave = async (event) => {
    event.preventDefault();
    if (user.email === "" || user.firstName === "" || user.lastName === "") {
      setError("All fields are required");
      return;
    }
    try {
      await updateUser(user, token);
      toggleOpen();
      window.location.reload();
    } catch (error) {
      setError(error.message);
      console.error("Error saving changes ", error);
    }
  };

  return (
    <>
      <img
        src={currentUser.avatar}
        alt="avatar"
        className="userSettings rounded-circle nav-link"
        role="button"
        style={{ cursor: "pointer" }}
        onClick={toggleOpen}
      />
      <MDBDropdown style={{ cursor: "pointer" }}>
        <MDBDropdownToggle tag="a">{currentUser.firstName}</MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link onClick={toggleOpen}>
            My profile
          </MDBDropdownItem>
          <MDBDropdownItem link onClick={handleLogOut}>
            Log Out
          </MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>

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
            <MDBModalBody>
              <AvatarsModal avatar={avatar} setAvatar={setAvatar} />
              <form>
                <MDBInput
                  className="input"
                  name="email"
                  value={user.email}
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
                  value={user.firstName}
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
                  value={user.lastName}
                  placeholder="Last Name"
                  label="Last Name"
                  id="lastName"
                  type="text"
                  size="lg"
                  required
                  onChange={(event) => onChangeHandler(event)}
                />

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
