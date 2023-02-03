import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useJwt } from "react-jwt";
import { ReactComponent as Profile } from "./svg/profile.svg";
import "./LocalForm.css";

export default function Form({ local, setLocal }) {
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailPrice, setEmailPrice] = useState("");
  const [flatView, setFlatView] = useState("");
  const [flatViewChecked, setFlatViewChecked] = useState(false);
  const [flatViewPrice, setFlatViewPrice] = useState("");
  const [phoneCalls, setPhoneCalls] = useState("");
  const [phoneCallsChecked, setPhoneCallsChecked] = useState(false);
  const [phoneCallsPrice, setPhoneCallsPrice] = useState("");
  const [appointments, setAppointments] = useState("");
  const [appointmentsChecked, setAppointmentsChecked] = useState(false);
  const [appointmentsPrice, setAppointmentsPrice] = useState("");
  const [service, setService] = useState("");
  const [serviceChecked, setServiceChecked] = useState(false);
  const [servicePrice, setServicePrice] = useState("");
  const [interviews, setInterviews] = useState("");
  const [interviewsChecked, setInterviewsChecked] = useState(false);
  const [interviewsPrice, setInterviewsPrice] = useState("");

  // categories

  const [emailCategory] = useState("Emails review");
  const [phoneCategory] = useState("Phone calls");
  const [flatCategory] = useState("Flat viewings");
  const [officialCategory] = useState("Official appointments");
  const [serviceCategory] = useState("Service providers");
  const [jobCategory] = useState("Job search");

  const [error, setError] = useState(null);

  const url = `https://backend-askalocal.onrender.com/local`;
  const url2 = `http://localhost:8080/local`;

  /* const UpdateLocal = ({ id }) => {
    const [formData, setFormData] = useState({
      bio: "",
      emailP: "",
      callP: "",
      flatP: "",
      appointmentP: "",
      serviceP: "",
      interviewP: "",
    });
  }; */
  const { id } = useParams();

  const navigate = useNavigate();

  const token = local?.token;

  const { decodedToken, isExpired } = useJwt(token);

  //console.log(decodedToken);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(url2, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: local.email,
          bio: bio,
          isComplete: true,
          emailP: {
            category: emailCategory,
            textfield: email,
            price: emailPrice,
          },
          callP: {
            category: phoneCategory,
            textfield: phoneCalls,
            price: phoneCallsPrice,
          },
          flatP: {
            category: flatCategory,
            textfield: flatView,
            price: flatViewPrice,
          },
          appointmentP: {
            category: officialCategory,
            textfield: appointments,
            price: appointmentsPrice,
          },
          serviceP: {
            category: serviceCategory,
            textfield: service,
            price: servicePrice,
          },
          interviewP: {
            category: jobCategory,
            textfield: interviews,
            price: interviewsPrice,
          },
        }),
      });

      if (response.ok) {
        setError(null);
        const data = await response.json();
        console.log("data!", data);
        console.log("oldLocal", local);
        setLocal({
          ...local,
          bio,
          isComplete: true,
          categories: {
            emailP: {
              category: emailCategory,
              textfield: email,
              price: emailPrice,
            },
            callP: {
              category: phoneCategory,
              textfield: phoneCalls,
              price: phoneCallsPrice,
            },
            flatP: {
              category: flatCategory,
              textfield: flatView,
              price: flatViewPrice,
            },
            appointmentP: {
              category: officialCategory,
              textfield: appointments,
              price: appointmentsPrice,
            },
            serviceP: {
              category: serviceCategory,
              textfield: service,
              price: servicePrice,
            },
            interviewP: {
              category: jobCategory,
              textfield: interviews,
              price: interviewsPrice,
            },
          },
        });
        navigate(`/yourinfo`);
      }

      if (!response.ok) {
        setError(response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form">
      <h2 className="section-title-green">Create your profile</h2>
      <h4 className="paragraph-title-green">
        Tell us a bit about yourself and share what you can offer to newcomers
        in {local?.city}.
      </h4>
      <div className="localForm-cont">
        <Profile className="profile-img" />
        <div className="localFormDiv">
          <form onSubmit={handleSubmit}>
            <div>
              <h2 className="form-title">Add few sentences about you</h2>
              <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
                name="Your bio (100-550 charachters)"
                className="bio"
                minLength={100}
                maxLength={550}
              />
            </div>
            <h2 className="form-title">The services you'd like to offer</h2>
            <div className="form-services">
              <input
                type="checkbox"
                checked={emailChecked}
                onChange={() => setEmailChecked(!emailChecked)}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="emailP"
                disabled={!emailChecked}
                required={emailChecked ? true : false}
                minLength={10}
                maxLength={125}
                className="textfield"
              />
              <input
                type="number"
                placeholder="€"
                value={emailPrice}
                onChange={(e) => setEmailPrice(e.target.value)}
                disabled={!emailChecked}
                required={emailChecked ? true : false}
                className="price"
                min="0"
                max="999"
              />
            </div>
            <div className="form-services">
              <input
                type="checkbox"
                checked={phoneCallsChecked}
                onChange={() => setPhoneCallsChecked(!phoneCallsChecked)}
              />
              <input
                type="text"
                placeholder="Phone Calls"
                value={phoneCalls}
                onChange={(e) => setPhoneCalls(e.target.value)}
                name="callP"
                disabled={!phoneCallsChecked}
                required={phoneCallsChecked ? true : false}
                minLength={10}
                maxLength={125}
                className="textfield"
              />
              <input
                type="number"
                placeholder="€"
                value={phoneCallsPrice}
                onChange={(e) => setPhoneCallsPrice(e.target.value)}
                disabled={!phoneCallsChecked}
                required={phoneCallsChecked ? true : false}
                className="price"
                min="0"
                max="999"
              />
            </div>
            <div className="form-services">
              <input
                type="checkbox"
                checked={flatViewChecked}
                onChange={() => setFlatViewChecked(!flatViewChecked)}
              />
              <input
                type="text"
                placeholder="Flat View"
                value={flatView}
                onChange={(e) => setFlatView(e.target.value)}
                name="flatP"
                disabled={!flatViewChecked}
                required={flatViewChecked ? true : false}
                minLength={10}
                maxLength={125}
                className="textfield"
              />
              <input
                type="number"
                placeholder="€"
                value={flatViewPrice}
                onChange={(e) => setFlatViewPrice(e.target.value)}
                disabled={!flatViewChecked}
                required={flatViewChecked ? true : false}
                title="Enter a Price Here"
                className="price"
                min="0"
                max="999"
              />
            </div>

            <div className="form-services">
              <input
                type="checkbox"
                checked={appointmentsChecked}
                onChange={() => setAppointmentsChecked(!appointmentsChecked)}
              />
              <input
                type="text"
                placeholder="Appointments"
                value={appointments}
                onChange={(e) => setAppointments(e.target.value)}
                name="appointmentP"
                disabled={!appointmentsChecked}
                required={appointmentsChecked ? true : false}
                minLength={10}
                maxLength={125}
                className="textfield"
              />
              <input
                type="number"
                placeholder="€"
                value={appointmentsPrice}
                onChange={(e) => setAppointmentsPrice(e.target.value)}
                disabled={!appointmentsChecked}
                required={appointmentsChecked ? true : false}
                className="price"
                min="0"
                max="999"
              />
            </div>
            <div className="form-services">
              <input
                type="checkbox"
                checked={serviceChecked}
                onChange={() => setServiceChecked(!serviceChecked)}
              />
              <input
                type="text"
                placeholder="Service providers"
                value={service}
                onChange={(e) => setService(e.target.value)}
                name="serviceP"
                disabled={!serviceChecked}
                minLength={10}
                maxLength={125}
                className="textfield"
              />
              <input
                type="number"
                placeholder="€"
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
                disabled={!serviceChecked}
                className="price"
                min="0"
                max="999"
              />
            </div>
            <div className="form-services">
              <input
                type="checkbox"
                checked={interviewsChecked}
                onChange={() => setInterviewsChecked(!interviewsChecked)}
              />
              <input
                type="text"
                placeholder="Interviews"
                value={interviews}
                onChange={(e) => setInterviews(e.target.value)}
                name="interviewP"
                disabled={!interviewsChecked}
                minLength={10}
                maxLength={125}
                className="textfield"
              />
              <input
                type="number"
                placeholder="€"
                value={interviewsPrice}
                onChange={(e) => setInterviewsPrice(e.target.value)}
                disabled={!interviewsChecked}
                className="price"
                min="0"
                max="999"
              />
            </div>
            <div>
              <button className="form-bttn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
}
