
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import MovieDetails from "./components/MovieDetails";
import Search from "./components/Search";

import {
  Route,
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayer from "./Layer/MainLayer";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayer />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Route>
    )
  );
  return (
    <>
       <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
   
    </>
  );
}

export default App;
