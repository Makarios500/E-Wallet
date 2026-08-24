import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/ProfilePage";


export default function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<h1>register page</h1>} />
          <Route path="*" element={<h1>404 page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
