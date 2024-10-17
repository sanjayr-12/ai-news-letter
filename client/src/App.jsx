import { useState } from "react";
import axios from "axios";
import "./app.css";
import Thank from "./Thank";

const App = () => {
  const [show, setShow] = useState(false);
  const [thank, setThank] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const email = formdata.get("email");
    try {
      const response = await axios.post("http://localhost:3000/api/sub", {
        email,
      });
      localStorage.setItem("email", email);
      console.log(response);
      setShow(true);
    } catch (error) {
      console.log(error);
      setShow(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const otp = formdata.get("otp");
    const email = localStorage.getItem("email");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/sub/verify",
        {
          otp,
          email,
        }
      );
      console.log(response);
      setThank(true);
    } catch (error) {
      console.log(error);
      setThank(false);
    }
  };

  return (
    <div>
      {!thank ? (
        <div className="main-container">
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" required />
            <input type="submit" disabled={show} />
          </form>
          {show && (
            <form onSubmit={handleVerify}>
              <h3>Enter the otp</h3>
              <input type="text" name="otp" />
              <input type="submit" />
            </form>
          )}
        </div>
      ) : (
        <Thank />
      )}
    </div>
  );
};

export default App;
