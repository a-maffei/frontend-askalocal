import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SignUp.css";

const Signup = ({ setUser, setLocal, urlPath }) => {
  /*   const firstname = useRef();
  const lastname = useRef();
  const email = useRef();
  const password = useRef();
  const phone = useRef();
  const city = useRef(); */

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState("");
  const url = `https://backend-askalocal.onrender.com/${urlPath}/signup`;
  const url2 = `http://localhost:8080/${urlPath}/signup`;

  const [error, setError] = useState(null);

  console.log("URL PATH", urlPath);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("pic", selectedFile);
    formData.append("isComplete", false);
    formData.append("isLocal", true);

    axios
      .post(url2, formData, {
        headers: {
          "Content-type": "multipart-formdata",
        },
      })
      .then((res) => {
        localStorage.setItem(urlPath, JSON.stringify(res.data));
        //setIsLoading(false);
        if (urlPath === "user") setUser(res.data);
        else setLocal(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  console.log("ERRRRROR", error);

  return isLoading ? (
    "Loading..."
  ) : (
    <div className="signupOuterDiv">
      <div className="alreadyDiv">
        {urlPath === "local" ? (
          <Link to="/local-login">
            <button className="already">{"I already have an account"}</button>
          </Link>
        ) : (
          <Link to="/user-login">
            <button className="already">{"I already have an account"}</button>
          </Link>
        )}
      </div>
      <fieldset className="signupField">
        <legend>
          <h1 className="signupLegend">Signup</h1>
        </legend>
        <form
          onSubmit={handleSubmit}
          className="signupForm"
          encType="multipart/form-data"
          method="post"
        >
          <div className="signupDiv">
            <label className="signupLabel" htmlFor="firstName">
              Firstname
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              pattern="[a-zA-Z]+"
              className="signupInput"
              // ref={firstname}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder={"Your Firstname"}
              required
              title={"eg. 'John'"}
            />
            <label className="signupLabel" htmlFor="lastName">
              Lastname
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              pattern="[a-zA-Z]+"
              className="signupInput"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder={"Your Lastname"}
              required
              title={"eg. 'Doe'"}
            />

            <label className="signupLabel" htmlFor="email">
              eMail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
              className="signupInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <label className="signupLabel" htmlFor="pic">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control-file signupInput"
              id="pic"
              name="pic"
              required
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />

            <label className="signupLabel" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="^[+]?[0-9]{9,13}$"
              title="+491683486813548"
              className="signupInput"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phonenumber"
              required
            />

            <label className="signupLabel" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              pattern="[a-zA-Z]+"
              className="signupInput"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
          </div>
          <button className="signupButton">{"Submit"}</button>
        </form>
        {error && (
          <div
            className="error"
            style={{ color: "white", border: "2px solid red" }}
          >
            {error.response.data.error}
          </div>
        )}
      </fieldset>
    </div>
  );
};

export default Signup;
