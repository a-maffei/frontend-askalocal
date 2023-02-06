import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SignUp.css";
import domtoimage from "dom-to-image";

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
  const [imageUrl, setImageUrl] = useState(null);

  const [selectedFile, setSelectedFile] = useState("");
  const url = `https://backend-askalocal.onrender.com/${urlPath}/signup`;
  const url2 = `http://localhost:8080/${urlPath}/signup`;

  const [error, setError] = useState(null);

  console.log("URL PATH", urlPath);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("pic", selectedFile);
    formData.append("isComplete", false);

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
      })
      .catch((error) => {
        setError(error);
      });

    /*     const response = await fetch(url2, {
      method: "POST",
      headers: {
        "Content-type": "multipart-formdata",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("RESPONSE", response);
    console.log("WHO'S YOUR DATA", data);
    if (response.ok) {
      console.log("DATA", data);
      setError(null);
      localStorage.setItem(urlPath, JSON.stringify(data));
      if (urlPath === "user") setUser(data);
      else setLocal(data);
    }

    if (!response.ok) {
      console.log("RESPONSE", response);
      setError(response.error);
    } */

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

    console.log("FORMDATAaaaaa", formData);
  };

  useEffect(() => {
    if (selectedFile) {
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  }, [selectedFile]);

  console.log("ERRRRROR", error);

  const options = (
    <>
      <option value="City">City</option>
      <option value="Barcelona">Barcelona</option>
      <option value="Berlin">Berlin</option>
      <option value="Vienna">Vienna</option>
      <option value="Paris">Paris</option>
      <option value="Rom">Rome</option>
    </>
  );

  return (
    <div className="signupOuterDiv">
      {" "}
      <div className="alreadyDiv">
        {urlPath === "local" ? (
          <Link to="/local-login">
            <button className="bright-bttn already">
              {"I already have an account"}
            </button>
          </Link>
        ) : (
          <Link to="/user-login">
            <button className="bright-bttn already">
              {"I already have an account"}
            </button>
          </Link>
        )}
      </div>
      <fieldset className="signupField">
        <div className="signup-cont">
          <h1>Sign Up</h1>
        </div>
        {/*         <legend className="signupLegend">
          <h1>Sign up</h1>
        </legend> */}
        <form
          onSubmit={handleSubmit}
          className="signupForm"
          encType="multipart/form-data"
          method="post"
        >
          <div className="signupDiv">
            <label className="signupLabel" htmlFor="firstName">
              First name
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
              placeholder={"Your first name"}
              required
              title={"eg. 'John'"}
            />
            <label className="signupLabel" htmlFor="lastName">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              pattern="[a-zA-Z]+"
              className="signupInput"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder={"Your last name"}
              required
              title={"eg. 'Doe'"}
            />

            <label className="signupLabel" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
              className="signupInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
              placeholder="Phone number"
              required
            />

            <label className="signupLabel" htmlFor="city">
              City
            </label>

            {urlPath === "local" ? (
              <select
                onChange={(e) => setCity(e.target.value)}
                className="signupInputSelect"
                id="city"
              >
                {options}
              </select>
            ) : (
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
            )}
            
            <div className="profile-pic-section">
              <div className="profile-pic-upload">
                <label className="signupLabel" htmlFor="pic">
                  Profile picture and preview
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control-file signupInput signup-pic"
                  id="pic"
                  name="pic"
                  required
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                  }}
                />
              </div>
              <div
                className="profile-pic-preview"
                style={{
                  backgroundImage: `url(${imageUrl}`,
                  backgroundSize: "cover",
                }}
              ></div>
            </div>

          </div>
          <button className="signupButton">{"Submit"}</button>
        </form>
        {error && <div className="error">{error.response.data.error}</div>}
      </fieldset>
    </div>
  );
};

export default Signup;
