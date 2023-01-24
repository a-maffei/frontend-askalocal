import "./App.css";
import { useState, useEffect } from "react";
import SignUp from "./components/SignUp";
import LogIn from "./components/logIn";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={!user ? <LogIn setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp setUser={setUser} /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
