import { useState, useRef } from "react";
import "./SignUp.css";

const Login = ({ setUser }) => {
  const email = useRef();
  const password = useRef();
  const url = "https://backend-askalocal.onrender.com/user/login";
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      // setIsLoading(false);
      setUser(data);
    }
    console.log(data, response);
  };

  return (
    <div className="signupOuterDiv">
      <fieldset className="signupField">
        <legend>
          <h1 className="signupLegend">Login</h1>
        </legend>
        <form onSubmit={handleSubmit} className="signupForm">
          <div className="signupDiv">
            <label className="signupLabel" htmlFor="email">
              eMail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="signupInput"
              ref={email}
              placeholder="eMail"
              required
            />

            <label className="signupLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              minLength="8"
              className="signupInput"
              ref={password}
              placeholder="Password"
              required
            />
          </div>
          <button className="signupButton">{"Submit"}</button>
        </form>
      </fieldset>
    </div>
  );
};

export default Login;