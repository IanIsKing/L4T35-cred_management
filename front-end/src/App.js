import "./App.css";

// Pages import
import Divisions from "./Pages/Divisions";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Users from "./Pages/Users";
import Repos from "./Pages/Repos";
import Home from "./Pages/Home";
import Ous from "./Pages/Ous";

// Components and route import
import AvatarsModal from "./Components/modals/avatarsModel";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/avatars" element={<AvatarsModal />} />

            <Route path="/" element={<ProtectedRoute />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/users" element={<ProtectedRoute />}>
              <Route index element={<Users />} />
            </Route>
            <Route path="/ous" element={<ProtectedRoute />}>
              <Route index element={<Ous />} />
            </Route>
            <Route path="/divisions" element={<ProtectedRoute />}>
              <Route index element={<Divisions />} />
            </Route>
            <Route path="/repos" element={<ProtectedRoute />}>
              <Route index element={<Repos />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
