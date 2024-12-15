import { useState } from "react";
import axios from "axios";
import "./app.css";
import Thank from "./Thank";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

const App = () => {
  const [show, setShow] = useState(false);
  const [thank, setThank] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const email = formdata.get("email");
    if (!email.trim()) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        email,
      });
      localStorage.setItem("email", email);
      toast.success(response?.data?.message);
      setShow(true);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.error || "server is down");
      setShow(false);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const otp = formdata.get("otp");
    const email = localStorage.getItem("email");
    if (!otp.trim()) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}verify`,
        {
          otp,
          email,
        }
      );
      toast.success(response?.data?.message);
      setThank(true);
      localStorage.removeItem("email");
    } catch (error) {
      toast.error(error?.response?.data.error || "server is down");
      console.log(error);
      setThank(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!thank ? (
        <div className="main-container">
          <h2>Subscribe to get daily topics from Peter Griffin</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="enter your email"
              required
            />
            <input
              type="submit"
              disabled={show || loading}
              value={loading ? "Submitting..." : "Submit"}
            />
          </form>
          {show && (
            <form onSubmit={handleVerify}>
              <h3>Enter the otp</h3>
              <input
                type="text"
                name="otp"
                placeholder="enter your otp"
                required
              />
              <input
                type="submit"
                disabled={loading}
                value={loading ? "Submitting..." : "Submit"}
              />
            </form>
          )}
        </div>
      ) : (
        <Thank />
      )}
      <Toaster />
    </div>
  );
};

export default App;
