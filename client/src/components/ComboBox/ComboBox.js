import { Fragment, useState } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export const ComboBox = ({
  singleSelection,
  clients,
  selected,
  setSelected,
  selectedGroup,
  setSelectedGroup,
}) => {
  // state for autocomplete
  const [query, setQuery] = useState("");
  const checkClientButton = (e) => {
    if (singleSelection === true) {
      e.preventDefault();
      document.querySelector(".submit-form-info").innerHTML = "";
      document.querySelector(".client-action-message").innerHTML =
        "Updating client";
      document.querySelector(".submit-form").style.display = "block";
      document.querySelector(".delete").style.display = "block";
      if (document.querySelector(".delete-client")) {
        document.querySelector(".delete-client").style.display = "none";
        document.querySelector(".cancel-delete-client").style.display = "none";
      }
    }
  };

  // filtered list
  const filteredPeople =
    query === ""
      ? clients
      : clients.filter((client) =>
          client.lastName
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  if (clients) {
    return (
      <div className="w-full">
        <Combobox
          value={singleSelection === false ? selectedGroup : selected}
          onChange={singleSelection === false ? setSelectedGroup : setSelected}
          multiple={singleSelection ? false : true}
        >
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              {singleSelection === true ? (
                <Combobox.Input
                  placeholder="Choose a client to edit"
                  className="overflow-a w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  displayValue={(selected) =>
                    selected.firstName !== ""
                      ? `${selected.firstName} ${selected.lastName}\u00A0\u00A0\u00A0\u00A0\u00A0 ☀${selected.daysElapsed}`
                      : null
                  }
                  onChange={(event) => setQuery(event.target.value)}
                />
              ) : (
                <Combobox.Input
                  placeholder="Choose clients to send messages to!"
                  className="overflow-a w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  displayValue={(people) =>
                    selectedGroup
                      .map((person) => person.firstName + " " + person.lastName)
                      .join(", ")
                  }
                  onChange={(event) => setQuery(event.target.value)}
                />
              )}

              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Combobox.Options
              onClick={checkClientButton}
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 right-0 focus:outline-none sm:text-sm"
            >
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((client) => (
                  <Combobox.Option
                    key={client._id}
                    className={({ active }) =>
                      ` relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={client}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {`${client.firstName} ${client.lastName}
                            \u00A0\u00A0\u00A0\u00A0\u00A0☀${client.daysElapsed}
                            `}
                        </span>
                        {selected ? (
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
