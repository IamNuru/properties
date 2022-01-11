import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AddProperty from "./pages/properties/AddProperty";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import TransferProperty from "./pages/transfers/TransferProperty.js";
import ListProperties from "./pages/properties/ListProperty";
import PropertyDetails from "./pages/properties/PropertyDetails";
import AuthState from "./context/auth/AuthState";
import PropertyState from "./context/property/PropertyState";
import EditProperty from "./pages/properties/EditProperty";
import ListTransfers from "./pages/transfers/ListTransfer";

const App = () => {
  return (
    <AuthState>
      <PropertyState>
        <div className="block w-full md:max-w-7xl m-auto">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="main mt-16 sm:mt-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-properties"
                element={
                  <ProtectedRoute>
                    <ListProperties />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transfers"
                element={
                  <ProtectedRoute>
                    <ListTransfers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transfer/:id"
                element={
                  <ProtectedRoute>
                    <TransferProperty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/property/:id"
                element={
                  <ProtectedRoute>
                    <PropertyDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-property/:id"
                element={
                  <ProtectedRoute>
                    <EditProperty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-property"
                element={
                  <ProtectedRoute>
                    <AddProperty />
                  </ProtectedRoute>
                }
              />
              {/* No route match */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <div className="">
            <Footer />
          </div>
        </div>
      </PropertyState>
    </AuthState>
  );
};

export default App;
