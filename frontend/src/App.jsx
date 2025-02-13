import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AdBoard from "./pages/AdBoard";
import AdDetails from "./pages/AdDetails";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="flex flex-col min-h-screen width-full">
      <Header />
      
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      
      <main className="max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<AdBoard />} />
          <Route path="/advertisement/:id" element={<AdDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
