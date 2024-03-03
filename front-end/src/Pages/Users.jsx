// User Page to display user details and repositories
import { Container, Row } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../Components/NavBar";
import UserList from "../Components/UserList";

function Users() {
  const { currentUser } = useAuth();

  return (
    <Container>
      <Navbar />
      <br />
      <Row>
        <h2>Welcome {currentUser.firstName}</h2>
      </Row>
      <UserList />
    </Container>
  );
}

export default Users;
