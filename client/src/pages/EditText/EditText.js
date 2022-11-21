import React from "react";

import { TextsComboBox } from "../../components/TextsComboBox/TextsComboBox";
import { EditDailyMessageForm } from "../../components/EditDailyMessageForm/EditDailyMessageForm";
export const EditText = ({
  texts,
  setTexts,
  selectedText,
  setSelectedText,
  initialState,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    setSelectedText(initialState);
    const dayInput = document.querySelectorAll(".messageDay");
    dayInput.forEach((x) => x.classList.remove("hidden"));
    document.querySelector(".text-action").classList.remove("hidden");
    document.querySelector(".text-action").innerHTML =
      "Creating new daily message";
    document.querySelector(".delete").style.display = "none";
    document.querySelector(".submit-form").style.display = "block";
    document.querySelector(".delete-message").classList.add("hidden");
    document.querySelector(".cancel-delete-message").classList.add("hidden");
  };

  if (texts && selectedText) {
    return (
      <div>
        <div className="flex items-center">
          <TextsComboBox
            texts={texts}
            selectedText={selectedText}
            setSelectedText={setSelectedText}
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
        <EditDailyMessageForm
          texts={texts}
          setTexts={setTexts}
          selectedText={selectedText}
          setSelectedText={setSelectedText}
          initialState={initialState}
        />
      </div>
    );
  }
};
