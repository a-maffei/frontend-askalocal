import { useState, useRef } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";

const Login = ({ setUser, setLocal, urlPath }) => {
  const email = useRef();
  const password = useRef();
  const url = `http://localhost:8080/${urlPath}/login`;
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
      localStorage.setItem(urlPath, JSON.stringify(data));
      // setIsLoading(false);
      if (urlPath === "user") setUser(data);
      if (urlPath === "local") setLocal(data);
      console.log(data);
    }
  };

  return (
    <div className="signupOuterDiv">
      <div className="alreadyDiv">
        <Link to="/signup">
          <button className="already">{"I don't have an account"}</button>
        </Link>
      </div>
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
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
          {error ? (
            <p style={{ color: "red" }}>
              <b>{error}</b>
            </p>
          ) : (
            []
          )}
          <button className="signupButton">{"Login"}</button>
        </form>
      </fieldset>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Login;
