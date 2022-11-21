import React from "react";
import { useNavigate } from "react-router-dom";
import "./ClientEditForm.css";
const moment = require("moment");

const emptyValidation = require("../../utils/emptyValidation");

export const ClientEditForm = ({
  selected,
  setSelected,
  clients,
  setClients,
}) => {
  const lstoken = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.querySelector("form");
    // getting selected id to add to form data object
    const selectedWithId = { ...selected };
    selectedWithId._id = form.getAttribute("data-id");

    if (form.hasAttribute("data-new")) {
      createClient(selected);
    } else {
      updateClient(selectedWithId);
    }
  };

  const updateClient = async (data) => {
    const emptyCheck = emptyValidation(data);
    if (emptyCheck === false) {
      document.querySelector(".submit-form-info").style.color = "red";
      document.querySelector(".submit-form-info").innerHTML =
        "Please fill out all fields!";
      return;
    }
    try {
      const updatedClient = await fetch("http://localhost:3001/api/clients", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: lstoken },
        body: JSON.stringify(data),
      });

      const updatedClientInfo = await updatedClient.json();
      if (updatedClientInfo.errors) {
        document.querySelector(".submit-form-info").style.color = "red";
        document.querySelector(".submit-form-info").innerHTML = `${
          Object.values(updatedClientInfo.errors)[0].message
        }`;
      } else {
        document.querySelector(".submit-form-info").color = "green";
        document.querySelector(".submit-form-info").innerHTML =
          "Client updated!";
        // Update client in state without hitting server again
        const tempClientsList = [...clients];
        const newClientsList = tempClientsList.map((client) =>
          client._id === updatedClientInfo._id
            ? (client = updatedClientInfo)
            : client
        );
        setSelected(updatedClientInfo);
        setClients(newClientsList);
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  const createClient = async (data) => {
    const emptyCheck = emptyValidation(data);
    if (emptyCheck === false) {
      return;
    }
    try {
      const newClient = await fetch("http://localhost:3001/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: lstoken },
        body: JSON.stringify(data),
      });

      const newClientInfo = await newClient.json();
      if (newClientInfo.errors) {
        document.querySelector(".submit-form-info").style.color = "red";
        document.querySelector(".submit-form-info").innerHTML = `${
          Object.values(newClientInfo.errors)[0].message
        }`;
      } else {
        document.querySelector(".submit-form-info").style.color = "green";
        document.querySelector(".submit-form-info").innerHTML = "Client added!";
        setClients((clients) => [...clients, newClientInfo]);
      }
    } catch (err) {
      navigate("/");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    // id of specific client

    document.querySelector(".delete-client").style.display = "block";
    document.querySelector(".cancel-delete-client").style.display = "block";
    document.querySelector(".submit-form").style.display = "none";
    document.querySelector(".delete").style.display = "none";
  };

  const deleteClientConfirm = async (e) => {
    e.preventDefault();
    const id = document.querySelector("form").getAttribute("data-id");

    if (e.target.innerHTML === "Delete") {
      try {
        const deleteClient = await fetch("http://localhost:3001/api/clients", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: lstoken,
          },
          body: JSON.stringify({ id }),
        });

        if (deleteClient.errors) {
          document.querySelector(".submit-form-info").style.color = "red";
          document.querySelector(".submit-form-info").innerHTML = `${
            Object.values(deleteClient.errors)[0].message
          }`;
        } else {
          document.querySelector(".submit-form-info").style.color = "green";
          document.querySelector(".submit-form-info").innerHTML =
            "Client deleted";
          const oldClientsList = [...clients];
          const removedClientList = oldClientsList.filter(
            (client) => client._id !== id
          );
          setClients(removedClientList);
          setSelected(clients[0]);
        }
      } catch (err) {
        navigate("/");
      }
    }
    document.querySelector(".delete-client").style.display = "none";
    document.querySelector(".cancel-delete-client").style.display = "none";
    document.querySelector(".submit-form").style.display = "block";
    document.querySelector(".delete").style.display = "block";
  };

  return (
    <form
      className="rounded-md shadow p-4 mb-20"
      onSubmit={handleSubmit}
      data-id={selected._id}
    >
      <h2 className="text-left client-action-message text-3xl pt-2 pb-5">
        Updating Client
      </h2>
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="flex flex-col mb-2">
          <label htmlFor="first-name" className="text-left mb-1">
            First Name
          </label>
          <input
            id="first-name"
            className="form-input py-2 shadow-inner mr-1"
            type="text"
            name="firstName"
            value={selected.firstName}
            onChange={(e) =>
              setSelected({ ...selected, firstName: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="last-name" className="text-left mb-1">
            Last Name
          </label>
          <input
            id="last-name"
            className="form-input py-2 shadow-inner ml-1"
            type="text"
            name="lastName"
            value={selected.lastName}
            onChange={(e) =>
              setSelected({ ...selected, lastName: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col mb-2">
          <label htmlFor="email" className="text-left mb-1">
            Email
          </label>
          <input
            id="email"
            className="form-input py-2 shadow-inner truncate mr-1"
            type="text"
            name="email"
            value={selected.email}
            onChange={(e) =>
              setSelected({ ...selected, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="phone-number" className="text-left mb-1">
            Phone
          </label>
          <input
            id="phone-number"
            className="form-input py-2 shadow-inner ml-1"
            type="text"
            name="phoneNumber"
            value={selected.phoneNumber}
            onChange={(e) =>
              setSelected({ ...selected, phoneNumber: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mb-2">
        <label htmlFor="weight-loss" className="text-left mb-1">
          Weight Loss Goals
        </label>
        <textarea
          id="weight-loss"
          className="form-input py-2 shadow-inner w-full"
          type="text"
          name="weightLossGoals"
          value={selected.weightLossGoals}
          onChange={(e) =>
            setSelected({ ...selected, weightLossGoals: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col mb-5">
          <label htmlFor="days-elapsed" className="text-left mb-1">
            Days Elapsed
          </label>
          <input
            id="days-elapsed"
            className="form-input py-2 shadow-inner mr-1"
            type="text"
            name="daysElapsed"
            value={selected.daysElapsed}
            onChange={(e) =>
              setSelected({ ...selected, daysElapsed: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="spend-total" className="text-left mb-1">
            Spend Total
          </label>
          <input
            id="spend-total"
            className="form-input py-2 shadow-inner ml-1"
            type="text"
            name="spendTotal"
            value={selected.spendTotal}
            onChange={(e) =>
              setSelected({ ...selected, spendTotal: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col mb-5">
          <label htmlFor="spend-total" className="text-left mb-1">
            Start Date
          </label>
          <input
            id="spend-total"
            className="form-input py-2 shadow-inner ml-1"
            type="text"
            name="spendTotal"
            value={moment(selected.startDate).format("MM/DD/YYYY")}
            onChange={(e) =>
              setSelected({ ...selected, startDate: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="spend-total" className="text-left mb-1">
            Coach
          </label>
          <input
            id="spend-total"
            className="form-input py-2 shadow-inner ml-1"
            type="text"
            name="spendTotal"
            value={selected.coach}
            onChange={(e) =>
              setSelected({ ...selected, coach: e.target.value })
            }
          />
        </div>
      </div>
      <p className="submit-form-info mb-4"></p>
      <div className="flex items-center">
        <button
          type="submit"
          className="submit-form bg-blue-400 hover:bg-blue-500 text-xl py-2 w-full"
        >
          Submit
        </button>
        <button
          className="delete-client bg-red-500 text-xl py-2 w-full"
          onClick={deleteClientConfirm}
        >
          Delete
        </button>
        <button
          className="cancel-delete-client bg-slate-500 text-xl py-2 w-full"
          onClick={deleteClientConfirm}
        >
          Cancel
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="delete w-6 h-6 ml-3 hover:cursor-pointer"
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
