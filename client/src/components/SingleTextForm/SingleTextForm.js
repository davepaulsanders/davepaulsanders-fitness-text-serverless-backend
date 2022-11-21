import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SingleTextForm.css";
const emptyValidation = require("../../utils/emptyValidation");

export const SingleTextForm = ({ selectedGroup, setSelectedGroup }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ messageText: "", mediaLink: "" });
  const clearForm = (e) => {
    e.preventDefault();
    setMessage({ messageText: "", mediaLink: "" });
    setSelectedGroup([]);
    document.querySelector(".message-form-info").innerHTML = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageBody = { message, selectedGroup };
    const lstoken = localStorage.getItem("jwt");

    const fieldsFilled = emptyValidation(message);
    if (fieldsFilled === false) {
      document.querySelector(".message-form-info").style.color = "red";
      document.querySelector(".message-form-info").innerHTML =
        "Please fill out all fields!";
      return;
    }

    try {
      // This route pre-serverless was /singletext
      const messageToSend = await fetch(
        "https://nyv0w4diy4.execute-api.us-east-1.amazonaws.com/dev/singletext",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: lstoken,
          },
          body: JSON.stringify(messageBody),
        }
      );
      const messageToSendJSON = await messageToSend.json();

      if (messageToSendJSON.errors) {
        document.querySelector(".message-form-info").style.color = "red";
        document.querySelector(".message-form-info").innerHTML = `${
          Object.values(messageToSendJSON.errors)[0].message
        }`;
      } else {
        document.querySelector(".message-form-info").style.color = "green";
        document.querySelector(".message-form-info").innerHTML =
          "Message sent!";
      }
    } catch (err) {
      navigate("/");
    }
  };

  return (
    <form
      className="message-form rounded-md shadow p-4  mt-10 mb-20"
      onSubmit={handleSubmit}
    >
      <h2 className="text-left client-action-message text-3xl pt-2 pb-5">
        Sending custom message
      </h2>
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="flex flex-col mb-2 w-full">
          <label htmlFor="message-text" className="text-left mb-1">
            Message Text
          </label>
          <textarea
            id="message-text"
            className="form-input py-2 shadow-inner mb-4"
            type="text"
            name="firstName"
            value={message.messageText}
            onChange={(e) =>
              setMessage({ ...message, messageText: e.target.value })
            }
          />
          <label htmlFor="img-link" className="text-left mb-1">
            Image Link (optional)
          </label>
          <input
            id="img-link"
            className="form-input py-2 shadow-inner mr-1"
            type="text"
            name="firstName"
            value={message.mediaLink}
            onChange={(e) =>
              setMessage({ ...message, mediaLink: e.target.value })
            }
          />
        </div>
      </div>
      <p className="message-form-info mb-4"></p>
      <div className="flex items-center">
        <button
          type="submit"
          className="submit-form bg-blue-400 hover:bg-blue-500 text-xl py-2 w-full"
        >
          Submit
        </button>
        <button
          type="submit"
          className="submit-form bg-slate-400 hover:bg-slate-500 text-xl py-2 w-full"
          onClick={clearForm}
        >
          Clear
        </button>
      </div>
    </form>
  );
};
