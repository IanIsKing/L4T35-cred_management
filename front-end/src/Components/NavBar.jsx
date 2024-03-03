// NavBar component for the application using MDBReactUIKit
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./modals/UserModal.jsx";
import LogoNav from "./LogoNav.png";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from "mdb-react-ui-kit";

export default function List() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">
          <img src={LogoNav} height="60" alt="" loading="lazy" />
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenNav(!openNav)}
        >
          {/* <MDBIcon icon="bars" fas /> */}
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/">
                My Repos
              </MDBNavbarLink>
            </MDBNavbarItem>

            {currentUser.role === "admin" && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink onClick={() => navigate("/users")}>
                    All Users
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink onClick={() => navigate("/ous")}>
                    OU's
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink onClick={() => navigate("/divisions")}>
                    Divisions
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink onClick={() => navigate("/repos")}>
                    All Repos
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
          <Modal />
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
