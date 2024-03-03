// SignUp page for users to create an account
import AvatarsModal from "../Components/modals/avatarsModel";
import React, { useEffect, useState } from "react";
import { createUser } from "../api";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import Logo from "../Components/Logo.png";
import "../App.css";

function SignUp() {
  const [triggerFlashEffect, setTriggerFlashEffect] = useState(false);
  const [hasSelectedAvatar, setHasSelectedAvatar] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setUser((currentUser) => ({ ...currentUser, avatar }));
  }, [avatar]);

  // Function to handle the sign up of the user
  const handleSignUp = async (event) => {
    event.preventDefault();
    // check if all fields are filled
    if (
      user.email === "" ||
      user.firstName === "" ||
      user.lastName === "" ||
      user.password === "" ||
      user.confirmPassword === ""
    ) {
      setError("All fields are required");
      return;
    }
    // check if an avatar has been selected
    if (!hasSelectedAvatar) {
      setError("Please select an avatar by clicking on the avatar image");
      // Trigger flash effect
      setTriggerFlashEffect(true);
      // Reset after 2 seconds
      setTimeout(() => setTriggerFlashEffect(false), 3000);
      return;
    }

    // check if password and confirm password match
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await createUser(user);
      console.log("User created successfully", response);
      // Redirect on successful signup
      window.location.href = "/login";
    } catch (error) {
      // Set the error message received from the backend or any other error
      setError(error.message);
      console.error("Error signing up", error);
    }
  };

  // Function to handle the change of the input fields
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="login">
      <MDBContainer>
        <MDBRow>
          <MDBCol col="6" md="6" className="mt-40 py-4">
            <img src={Logo} className="img-fluid logo p-3" alt="Cool Tech" />
          </MDBCol>

          <MDBCol col="6" md="5" className="mt-4 py-4">
            <MDBRow>
              <MDBCol col="3" md="3">
                <AvatarsModal
                  avatar={avatar}
                  setAvatar={setAvatar}
                  setHasSelectedAvatar={setHasSelectedAvatar}
                  triggerFlashEffect={triggerFlashEffect}
                />
              </MDBCol>
              <MDBCol col="8" md="6" className="mt-1 py-1">
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <p className="lead fw-normal mb-0 me-3">Sign up</p>
                </div>
                <div className="divider d-flex align-items-center my-4"></div>
              </MDBCol>
            </MDBRow>
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
                onChange={(event) => onChangeHandler(event)}
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

              <MDBInput
                className="input"
                name="password"
                label="Password"
                type="password"
                size="lg"
                value={user.password}
                placeholder="Password"
                id="password"
                required
                onChange={(event) => onChangeHandler(event)}
              />
              <MDBInput
                className="input"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                size="lg"
                value={user.confirmPassword}
                placeholder="Confirm Password"
                id="confirmPassword"
                required
                onChange={(event) => onChangeHandler(event)}
              />
              <div className="text-center mt-4 pt-2">
                <MDBBtn
                  className="mb-0 px-5"
                  size="lg"
                  onClick={(event) => {
                    handleSignUp(event);
                  }}
                >
                  Register
                </MDBBtn>

                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Already have an account?{" "}
                  <a href="/login" className="link-danger">
                    SignIn
                  </a>
                </p>
                {error !== null && <div className="error">{error}</div>}
              </div>
            </form>
          </MDBCol>
        </MDBRow>

        <MDBContainer className="mt-5 py-1">
          <div
            className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5"
            style={{ backgroundColor: "#3B5371" }}
          >
            <div className="text-white mb-3 mb-md-0">
              Copyright © 2024. All rights reserved.
            </div>
            <div>
              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "white" }}
              >
                <MDBIcon fab icon="facebook-f" size="md" />
              </MDBBtn>
              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "white" }}
              >
                <MDBIcon fab icon="twitter" size="md" />
              </MDBBtn>
              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "white" }}
              >
                <MDBIcon fab icon="google" size="md" />
              </MDBBtn>
              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "white" }}
              >
                <MDBIcon fab icon="linkedin-in" size="md" />
              </MDBBtn>
            </div>
          </div>
        </MDBContainer>
      </MDBContainer>
    </div>
  );
}

export default SignUp;
