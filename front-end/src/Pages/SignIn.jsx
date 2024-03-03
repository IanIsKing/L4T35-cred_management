// Sign in page for users to login to their account
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../Components/Logo.png";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import "../App.css";

function SignIn() {
  const [password, setPassword] = useState("");
  const { currentUser, login } = useAuth();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // Function to handle the sign in of the user
  const handleSignIn = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      setError("All fields are required");
      return;
    }
    try {
      await login({ email, password }); // Pass user data for login
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error signing in:", error);
    }
  };

  // Function to handle the change of the input fields
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className="login">
      <MDBContainer>
        <MDBRow>
          <MDBCol col="6" md="6">
            <img src={Logo} className="img-fluid logo p-3" alt="Sample" />
          </MDBCol>

          <MDBCol col="6" md="5" className="mt-2 py-5">
            <h1 className="text-center">Cool Tech</h1>
            <p className="text-center">Credential Management</p>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal mb-0 me-3">Sign in</p>
            </div>

            <div className="divider d-flex align-items-center my-4"></div>

            <MDBInput
              wrapperClass="mb-4"
              name="userEmail"
              value={email}
              placeholder="Email"
              label="Email address"
              id="userEmail"
              type="email"
              size="lg"
              onChange={(event) => onChangeHandler(event)}
            />

            <MDBInput
              wrapperClass="mb-4"
              name="userPassword"
              label="Password"
              type="password"
              size="lg"
              value={password}
              placeholder="Password"
              id="userPassword"
              onChange={(event) => onChangeHandler(event)}
            />

            <div className="text-center mt-4 pt-2 ">
              <MDBBtn
                className="mb-0 px-5"
                size="lg"
                onClick={(event) => {
                  handleSignIn(event, email, password);
                }}
              >
                Login
              </MDBBtn>

              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <a href="/sign-up" className="link-danger">
                  Register
                </a>
              </p>
              {error !== null && <div className="error">{error}</div>}
            </div>
          </MDBCol>
        </MDBRow>
        <MDBContainer className="mt-5 py-5">
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

export default SignIn;
