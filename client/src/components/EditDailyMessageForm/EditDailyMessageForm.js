import React from "react";
import { useNavigate } from "react-router-dom";
import emptyValidation from "../../utils/emptyValidation";
import "./EditDailyMessageForm.css";

export const EditDailyMessageForm = ({
  texts,
  setTexts,
  selectedText,
  setSelectedText,
  initialState,
}) => {
  const navigate = useNavigate();

  // clear form back to original daily message
  const clearForm = (e) => {
    e.preventDefault();

    const prevVersionText = [...texts];
    const filteredPrev = prevVersionText.filter((text) =>
      text._id === selectedText._id ? text : null
    );
    const filteredText = filteredPrev[0];

    if (filteredText === undefined) {
      setSelectedText(initialState);
    } else {
      setSelectedText({ ...selectedText, ...filteredText });
    }

    document.querySelector(".message-form-info").innerHTML = "";
  };

  // update texts
  const handleSubmit = async (e) => {
    e.preventDefault();
    const lstoken = localStorage.getItem("jwt");

    const fieldsFilled = emptyValidation(selectedText);
    if (fieldsFilled === false) {
      document.querySelector(".message-form-info").style.color = "red";
      document.querySelector(".message-form-info").innerHTML =
        "Please fill out all fields!";
      return;
    }

    // If the message already exists in the database and is just being updated:
    if (document.querySelector(".text-action").classList.contains("hidden")) {
      try {
        const updatedMessage = await fetch(
          "http://localhost:3001/api/messages",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: lstoken,
            },
            body: JSON.stringify(selectedText),
          }
        );

        const updatedMessageJSON = await updatedMessage.json();
        if (updatedMessageJSON.errors) {
          document.querySelector(".message-form-info").style.color = "red";
          document.querySelector(".message-form-info").innerHTML = `${
            Object.values(updatedMessageJSON.errors)[0].message
          }`;
        } else {
          const tempTextsList = [...texts];
          const newTextsList = tempTextsList.map((text) =>
            text._id === updatedMessageJSON._id
              ? (text = updatedMessageJSON)
              : text
          );
          setTexts(newTextsList);
          setSelectedText(updatedMessageJSON);
          document.querySelector(".message-form-info").style.color = "green";
          document.querySelector(".message-form-info").innerHTML =
            "Text updated!";
        }
      } catch (err) {
        navigate("/");
      }
    } else {
      // if we are creating a new daily message:
      try {
        const lstoken = localStorage.getItem("jwt");
        const body = { ...selectedText };
        delete body._id;
        const newDailyMessage = await fetch(
          "http://localhost:3001/api/messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: lstoken,
            },
            body: JSON.stringify(body),
          }
        );
        const newDailyMessageJSON = await newDailyMessage.json();

        if (newDailyMessageJSON.errors) {
          document.querySelector(".message-form-info").style.color = "red";
          document.querySelector(".message-form-info").innerHTML = `${
            Object.values(newDailyMessageJSON.errors)[0].message
          }`;
        } else {
          const tempTextsList = [...texts];
          tempTextsList.push(newDailyMessageJSON);
          setTexts(tempTextsList);
          setSelectedText(newDailyMessageJSON);
          document.querySelector(".message-form-info").style.color = "green";
          document.querySelector(".message-form-info").innerHTML =
            "Text created!";
        }
      } catch (err) {
        navigate("/");
      }
    }
  };
  const handleDelete = (e) => {
    e.preventDefault();
    document.querySelector(".delete-message").classList.remove("hidden");
    document.querySelector(".cancel-delete-message").classList.remove("hidden");
    document.querySelector(".submit-form").style.display = "none";
    document.querySelector(".clear-form").style.display = "none";
    document.querySelector(".delete").style.display = "none";
  };

  const deleteDailyConfirm = async (e) => {
    e.preventDefault();

    if (e.target.classList.contains("cancel-delete-message")) {
      document.querySelector(".delete-message").classList.add("hidden");
      document.querySelector(".cancel-delete-message").classList.add("hidden");
      document.querySelector(".submit-form").style.display = "block";
      document.querySelector(".clear-form").style.display = "block";
      document.querySelector(".delete").style.display = "block";
    } else {
      try {
        const lstoken = localStorage.getItem("jwt");

        const _id = document.querySelector("form").getAttribute("data-id");

        const deletedMessage = await fetch(
          "http://localhost:3001/api/messages",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: lstoken,
            },
            body: JSON.stringify({ _id }),
          }
        );
        const deletedMessageJSON = await deletedMessage.json();

        if (deletedMessageJSON.errors) {
          document.querySelector(".message-form-info").style.color = "red";
          document.querySelector(".message-form-info").innerHTML = `${
            Object.values(deletedMessageJSON.errors)[0].message
          }`;
        } else {
          document.querySelector(".message-form-info").style.color = "green";
          document.querySelector(".message-form-info").innerHTML =
            "Text deleted";
          const oldTextsList = [...texts];
          const removedTextsList = oldTextsList.filter(
            (text) => text._id !== _id
          );
          setTexts(removedTextsList);
          setSelectedText(texts[0]);
        }
      } catch (err) {
        navigate("/");
      }
    }
  };
  return (
    <form
      className="message-form rounded-md shadow p-4  mt-10 mb-20"
      onSubmit={handleSubmit}
      data-id={selectedText._id}
    >
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="flex flex-col mb-2 w-full">
          <p className="hidden text-action text-left text-3xl pt-2 pb-5"></p>
          <label htmlFor="day" className="messageDay text-left mb-1 hidden">
            Day
          </label>
          <input
            className="messageDay form-input py-2 shadow-inner mb-4 hidden"
            type="text"
            value={selectedText.messageDay}
            onChange={(e) =>
              setSelectedText({ ...selectedText, messageDay: e.target.value })
            }
          />
          <label htmlFor="message-text" className="text-left mb-1">
            Message Text
          </label>
          <textarea
            id="message-text"
            className="form-input py-2 shadow-inner mb-4"
            type="text"
            name="firstName"
            value={selectedText.messageText}
            onChange={(e) =>
              setSelectedText({ ...selectedText, messageText: e.target.value })
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
            value={selectedText.mediaLink}
            onChange={(e) =>
              setSelectedText({ ...selectedText, mediaLink: e.target.value })
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
          className="submit-form clear-form bg-slate-400 hover:bg-slate-500 text-xl py-2 w-full"
          onClick={clearForm}
        >
          Clear changes
        </button>
        <button
          className="delete-message bg-red-500 text-xl py-2 w-full hidden"
          onClick={deleteDailyConfirm}
        >
          Delete
        </button>
        <button
          className="cancel-delete-message bg-slate-500 text-xl py-2 w-full hidden"
          onClick={deleteDailyConfirm}
        >
          Cancel
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="delete w-12 h-12 ml-3 hover:cursor-pointer"
          onClick={handleDelete}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
    </form>
  );
};
