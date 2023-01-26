import "./App.css";
import { useState, useEffect } from "react";
import Signup from "./components/SignUp";
import Login from "./components/LogIn";
import Home from "./components/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbartop from "./components/Navbartop";
import LocalInfo from "./components/LocalInfo";
import Welcome from "./components/Welcome";

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark");

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  return (
    <div className="App" data-theme={theme}>
      <Navbartop switchTheme={switchTheme} user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={!user ? <Home /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/welcome"
          element={user ? <Welcome user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route path="/local/:id" element={<LocalInfo />} />
      </Routes>
    </div>
  );
}

export default App;
