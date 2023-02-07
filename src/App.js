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
import Footer from "./components/Footer";
import YourInfo from "./components/YourInfo";

function App() {
  const [user, setUser] = useState(null);
  const [local, setLocal] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [input, setInput] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [selectedValue, setSelectedValue] = useState("City");

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
    // setTheme(JSON.parse(localStorage.getItem("theme")));
    localStorage.setItem("theme", theme);
  }, [user, local, theme]);

  return (
    <div className="App" data-theme={theme}>
      <div className="page-container">
        <div className="content-wrapper" id="top">
          <Navbartop
            switchTheme={switchTheme}
            user={user}
            setUser={setUser}
            local={local}
            setLocal={setLocal}
          />
          <Routes>
            {/* Landing page rerouting based on whethere you're signed in/up as user or local */}
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
                      selectedValue={selectedValue}
                      setSelectedValue={setSelectedValue}
                    />
                  ) : !local.isComplete ? (
                    <Navigate to="/form" />
                  ) : (
                    <Navigate to="/yourinfo" local={local} />
                  )
                ) : (
                  <Navigate to="/welcome" user={user} />
                )
              }
            />

            {/* Log in and sign ups */}

            <Route
              path="/user-login"
              element={
                !user ? (
                  <Login setUser={setUser} urlPath="user" />
                ) : (
                  <Navigate to="/welcome" user={user} local={local} />
                )
              }
            />
            <Route
              path="/user-signup"
              element={
                !user ? (
                  <Signup user={user} setUser={setUser} urlPath="user" />
                ) : (
                  <Navigate to="/welcome" user={user} local={local} />
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
                ) : local.isComplete ? (
                  <Navigate to="/yourinfo" local={local} />
                ) : (
                  <Navigate to="/form" local={local} />
                )
              }
            />

            {/* Paths reserved for users */}
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
            <Route
              path="/categories"
              element={
                <Categories
                  searchedPosts={searchedPosts}
                  setSearchedPosts={setSearchedPosts}
                  input={input}
                  setInput={setInput}
                  selectedValue={selectedValue}
                  setSelectedValue={setSelectedValue}
                  user={user}
                  local={local}
                />
              }
            />

            <Route
              path="/categories/:category"
              element={
                user || local ? (
                  <CategoryHome
                    searchedPosts={searchedPosts}
                    setSearchedPosts={setSearchedPosts}
                    input={input}
                    setInput={setInput}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    user={user}
                    local={local}
                  />
                ) : (
                  <Login urlPath="user" setUser={setUser} />
                )
              }
            />

            <Route
              path="/local/:id"
              element={
                user || local ? (
                  <LocalInfo user={user} local={local} />
                ) : (
                  <Login urlPath="user" setUser={setUser} />
                )
              }
            />

            {/* Paths reserved for  locals */}
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
            <Route
              path="/yourinfo"
              element={local ? <YourInfo local={local} /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
