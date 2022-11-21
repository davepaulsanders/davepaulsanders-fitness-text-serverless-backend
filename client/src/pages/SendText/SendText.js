import React from "react";
import { ComboBox } from "../../components/ComboBox/ComboBox";
import { SingleTextForm } from "../../components/SingleTextForm/SingleTextForm";
export const SendText = ({
  clients,
  selected,
  setSelected,
  selectedGroup,
  setSelectedGroup,
}) => {
  return (
    <div>
      <ComboBox
        singleSelection={false}
        clients={clients}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      <SingleTextForm
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
    </div>
  );
};
