import "./Chat.css";

export default function Chat() {
  return (
    <div className="home">
      <h1>Chat</h1>
    </div>
  );
}

//the first issue was casued by axios creating an object in which it wraps the error
//to access the actual error coming from the backend we have to get into the response error coming from axios
//we changed useRef to useState cause controlled forms are more in react spirit
