import React from "react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  const navigateURL = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("clients")) {
      navigate("/clients");
    }
    if (e.target.classList.contains("one-time")) {
      navigate("/send");
    }
    if (e.target.classList.contains("daily-edit")) {
      navigate("/edit-text");
    }
  };
  return (
    <div>
      <div className="flex flex-col shadow rounded-md justify-center items-center p-6 bg-white">
        <h2 className="mb-12 text-4xl">Welcome Bonnie and Will!</h2>

        <button
          className="one-time bg-blue-400 hover:bg-blue-500 text-xl w-3/4 mb-3 py-2 px-3 rounded-md"
          onClick={navigateURL}
        >
          Send one-time messages
        </button>

        <button
          className="daily-edit bg-blue-400 hover:bg-blue-500 text-xl w-3/4 mb-3 py-2 rounded-md"
          onClick={navigateURL}
        >
          Edit daily messages
        </button>
        <button
          className="clients bg-blue-400 hover:bg-blue-500 text-xl w-3/4 py-2 rounded-md"
          onClick={navigateURL}
        >
          Edit clients
        </button>
      </div>
    </div>
  );
};
