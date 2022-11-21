import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({ getClients, getTexts, loggedIn, setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (localStorage.getItem("jwt") !== null) {
    navigate("/landing");
  }

  const handleSubmit = async (e) => {
    const body = { username, password };
    e.preventDefault();
    // if any fields are empty
    if (username === "" || password === "") {
      document.querySelector(".error-message").style.color = "red";
      document.querySelector(".error-message").innerHTML =
        "Please fill out all fields!";
      return;
    }
    const token = await fetch(
      "https://nyv0w4diy4.execute-api.us-east-1.amazonaws.com/dev/api/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const tokenResponse = await token.json();

    if (tokenResponse.error) {
      document.querySelector(".error-message").style.color = "red";
      document.querySelector(".error-message").innerHTML = tokenResponse.error;
    } else {
      localStorage.setItem("jwt", tokenResponse.userToken);
      setLoggedIn(true);
      await getClients();
      await getTexts();
      navigate("/landing");
    }
  };
  return (
    <form
      data-testid="login-form"
      className="p-6 shadow bg-white"
      onSubmit={handleSubmit}
    >
      <h1 className="text-left mb-6 text-2xl font-bold">
        Welcome Bonnie and Will!
      </h1>
      <div className="flex flex-col mb-2">
        <label htmlFor="username" className="text-left mb-1">
          Username
        </label>
        <input
          id="username"
          className="form-input py-2 shadow-inner"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-5">
        <label htmlFor="password" className="text-left mb-1">
          Password
        </label>
        <input
          id="password"
          className="form-input py-2 shadow-inner"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <p data-testid="error" className="error-message mb-4"></p>
      <button
        type="submit"
        className="bg-blue-400 hover:bg-blue-500 text-xl py-2 w-full rounded-md"
      >
        Login
      </button>
    </form>
  );
};
