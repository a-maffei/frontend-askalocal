import "./App.css";
import { useState, useEffect } from "react";
import Signup from "./components/SignUp";
import Login from "./components/LogIn";
import Home from "./components/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbartop from "./components/Navbartop";
import LocalInfo from "./components/LocalInfo";
import Welcome from "./components/Welcome";
import Categories from "./components/Categories";
import PostDisplay from "./components/PostDisplay";
import CategoryHome from "./components/CategoryHome";
import LocalForm from "./components/LocalForm";

function App() {
  const [user, setUser] = useState(null);
  const [local, setLocal] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [input, setInput] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    if (!local) {
      setLocal(JSON.parse(localStorage.getItem("local")));
    }
  }, [user, local]);

  return (
    <div className="App" data-theme={theme}>
      <Navbartop
        switchTheme={switchTheme}
        user={user}
        setUser={setUser}
        local={local}
        setLocal={setLocal}
      />
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              !local ? (
                <Home
                  searchedPosts={searchedPosts}
                  setSearchedPosts={setSearchedPosts}
                  input={input}
                  setInput={setInput}
                />
              ) : (
                <Navigate to="/form" />
              )
            ) : (
              <Navigate to="/welcome" />
            )
          }
        />
        <Route
          path="/categories"
          element={
            <Categories
              searchedPosts={searchedPosts}
              setSearchedPosts={setSearchedPosts}
              input={input}
              setInput={setInput}
            />
          }
        />
        <Route
          path="/welcome"
          element={
            user ? (
              <Welcome user={user} input={input} setInput={setInput} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {
          <Route
            path="/form"
            element={
              local ? (
                <LocalForm local={local} setLocal={setLocal} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        }
        <Route
          path="/categories/:category"
          element={
            <CategoryHome
              searchedPosts={searchedPosts}
              setSearchedPosts={setSearchedPosts}
              input={input}
              setInput={setInput}
            />
          }
        />
        <Route
          path="/user-login"
          element={
            !user ? (
              <Login setUser={setUser} urlPath="user" />
            ) : (
              <Navigate to="/welcome" />
            )
          }
        />
        <Route
          path="/user-signup"
          element={
            !user ? (
              <Signup user={user} setUser={setUser} urlPath="user" />
            ) : (
              <Navigate to="/welcome" />
            )
          }
        />
        <Route
          path="/local-login"
          element={
            !local ? (
              <Login setLocal={setLocal} local={local} urlPath="local" />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/local-signup"
          element={
            !local ? (
              <Signup setLocal={setLocal} local={local} urlPath="local" />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/local/:id" element={<LocalInfo />} />
      </Routes>
    </div>
  );
}

export default App;
