import { useState, useRef } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";

const Login = ({ setUser, setLocal, urlPath, user, local }) => {
  const email = useRef();
  const password = useRef();
  const url = `https://backend-askalocal.onrender.com/${urlPath}/login`;
  const url2 = `http://localhost:8080/${urlPath}/login`;
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.current.value.toLowerCase(),
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
      if (urlPath === "user") {
        setUser(data);
      }
      if (urlPath === "local") {
        setLocal(data);
      }
    }
  };

  return (
    <div className="signupOuterDiv">
      <div className="alreadyDiv">
        {urlPath === "local" ? (
          <Link to="/local-signup">
            <button className="bright-bttn already">
              {"I don't have an account yet"}
            </button>
          </Link>
        ) : (
          <Link to="/user-signup">
            <button className="bright-bttn already">
              {"I don't have an account yet"}
            </button>
          </Link>
        )}
      </div>
      <fieldset className="signupField">
        <div className="signup-cont">
          <h1>Log In</h1>
        </div>
        {/*         <legend>
          <h1 className="signupLegend">Login</h1>
        </legend> */}
        <form onSubmit={handleSubmit} className="signupForm">
          <div className="signupDiv">
            <label className="signupLabel" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="signupInput"
              ref={email}
              placeholder="Email"
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
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

          <button className="signupButton">{"Login"}</button>
          {error ? <p className="error">{error}</p> : []}
        </form>
      </fieldset>
    </div>
  );
};

export default Login;
