import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SignUp.css";

const Signup = ({ setUser, setLocal, urlPath }) => {
  const firstname = useRef();
  const lastname = useRef();
  const email = useRef();
  const password = useRef();
  const phone = useRef();
  const city = useRef();
  const [selectedFile, setSelectedFile] = useState("");
  const url = `http://localhost:8080/${urlPath}/signup`;

  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", email.current.value);
    formData.append("password", password.current.value);
    formData.append("firstname", firstname.current.value);
    formData.append("lastname", lastname.current.value);
    formData.append("phone", phone.current.value);
    formData.append("city", city.current.value);
    formData.append("pic", selectedFile);

    axios
      .post(url, formData, {
        headers: {
          "Content-type": "multipart-formdata",
        },
      })
      .then((res) => {
        localStorage.setItem(urlPath, JSON.stringify(res.data));
        //setIsLoading(false);
        if (urlPath === "user") setUser(res.data);
        if (urlPath === "local") setLocal(res.data);
      })
      .catch((error) => {
        // setIsLoading(false);
        setError(error);
      });

    /*     const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
        firstname: firstname.current.value,
        lastname: lastname.current.value,
        phone: phone.current.value,
        city: city.current.value,
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
    } */
  };

  return (
    <div className="signupOuterDiv">
      <div className="alreadyDiv">
        <Link to="/login">
          <button className="already">{"I already have an account"}</button>
        </Link>
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
              ref={firstname}
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
              ref={lastname}
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
              ref={phone}
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
              ref={city}
              placeholder="City"
              required
            />
          </div>
          <button className="signupButton">{"Submit"}</button>
        </form>
      </fieldset>
    </div>
  );
};

export default Signup;
