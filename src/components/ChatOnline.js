import "./ChatOnline.css";

export default function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://images.pexels.com/photos/7752807/pexels-photo-7752807.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName"> John Doe</span>
      </div>
    </div>
  );
}
