import React from "react";
import { ComboBox } from "../../components/ComboBox/ComboBox";
import { ClientEditForm } from "../../components/ClientEditForm/ClientEditForm";
import "./EditClients.css";
export const EditClients = ({
  clients,
  setClients,
  selected,
  setSelected,
  initialState,
}) => {
  const handleClick = (e) => {
    e.preventDefault();

    document.querySelector("form").setAttribute("data-new", "true");
    // resetting form with selected variable
    setSelected(initialState);
    document.querySelector(".client-action-message").innerHTML =
      "Creating new client";
    document.querySelector(".submit-form-info").innerHTML = "";
    document.querySelector(".submit-form").style.display = "block";
    document.querySelector(".delete").style.display = "none";
    if (document.querySelector(".delete-client")) {
      document.querySelector(".delete-client").style.display = "none";
      document.querySelector(".cancel-delete-client").style.display = "none";
    }
  };

  return (
    <div className="edit-client w-full flex flex-col items-center justify-center">
      <div className="flex w-full items-center mb-10">
        <ComboBox
          singleSelection={true}
          clients={clients}
          selected={selected}
          setSelected={setSelected}
          initialState={initialState}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 ml-4 pt-2 hover:cursor-pointer"
          onClick={handleClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <ClientEditForm
        selected={selected}
        setSelected={setSelected}
        clients={clients}
        setClients={setClients}
        initialState={initialState}
      />
    </div>
  );
};
