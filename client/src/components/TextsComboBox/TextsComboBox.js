import { Fragment, useState } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export const TextsComboBox = ({ texts, selectedText, setSelectedText }) => {
  const [query, setQuery] = useState("");
  const filteredTexts =
    query === ""
      ? texts
      : texts.filter((text) =>
          text.messageText
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleClick = (e) => {
    document.querySelector(".message-form-info").innerHTML = "";
    document.querySelector(".text-action").classList.add("hidden");
    document.querySelector(".text-action").innerHTML = "";
    document
      .querySelectorAll(".messageDay")
      .forEach((x) => x.classList.add("hidden"));
    document.querySelector(".delete").style.display = "block";
    document
      .querySelectorAll(".submit-form")
      .forEach((x) => (x.style.display = "block"));

    if (
      document.querySelector(".delete-message").classList.contains("hidden")
    ) {
      return;
    }
    document.querySelector(".delete-message").classList.add("hidden");
    document.querySelector(".cancel-delete-message").classList.add("hidden");
  };
  if (texts && selectedText) {
    return (
      <div className="w-full">
        <Combobox value={selectedText} onChange={setSelectedText}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={(text) =>
                  text.messageText !== "" ? `Day ${text.messageDay}` : null
                }
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>

            <Combobox.Options
              onClick={handleClick}
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 right-0 focus:outline-none sm:text-sm"
            >
              {filteredTexts.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredTexts.map((text) => (
                  <Combobox.Option
                    key={text._id}
                    className={({ active }) =>
                      `relative cursor-default select-none right-0 py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={text}
                  >
                    {({ selectedText, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selectedText ? "font-medium" : "font-normal"
                          }`}
                        >
                          Day {text.messageDay}
                        </span>
                        {selectedText ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
    );
  }
};
