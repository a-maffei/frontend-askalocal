import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useJwt } from "react-jwt";
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
      const response = await fetch(url, {
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
    <div className="home">
      <div className="localFormDiv">
        <h1>Local Form</h1>
        <form onSubmit={handleSubmit}>
          <h2>Tell us something about yourself</h2>
          <div>
            <input
              type="text"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
              name="bio"
              className="bio"
            />
          </div>
          <h2>Choose your services</h2>
          <div>
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
            />
            <input
              type="number"
              placeholder="Price"
              value={emailPrice}
              onChange={(e) => setEmailPrice(e.target.value)}
              disabled={!emailChecked}
              className="price"
              min="0"
            />
          </div>
          <div>
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
            />
            <input
              type="number"
              placeholder="Price"
              value={phoneCallsPrice}
              onChange={(e) => setPhoneCallsPrice(e.target.value)}
              disabled={!phoneCallsChecked}
              className="price"
              min="0"
            />
          </div>
          <div>
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
            />
            <input
              type="number"
              placeholder="Price"
              value={flatViewPrice}
              onChange={(e) => setFlatViewPrice(e.target.value)}
              disabled={!flatViewChecked}
              className="price"
              min="0"
            />
          </div>

          <div>
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
            />
            <input
              type="number"
              placeholder="Price"
              value={appointmentsPrice}
              onChange={(e) => setAppointmentsPrice(e.target.value)}
              disabled={!appointmentsChecked}
              className="price"
              min="0"
            />
          </div>
          <div>
            <input
              type="checkbox"
              checked={serviceChecked}
              onChange={() => setServiceChecked(!serviceChecked)}
            />
            <input
              type="text"
              placeholder="Service provider"
              value={service}
              onChange={(e) => setService(e.target.value)}
              name="serviceP"
              disabled={!serviceChecked}
            />
            <input
              type="number"
              placeholder="Price"
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
              disabled={!serviceChecked}
              className="price"
              min="0"
            />
          </div>
          <div>
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
            />
            <input
              type="number"
              placeholder="Price"
              value={interviewsPrice}
              onChange={(e) => setInterviewsPrice(e.target.value)}
              disabled={!interviewsChecked}
              className="price"
              min="0"
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
}
