import "./App.css";
import { useState, useEffect } from "react";

import { Header } from "./components/Header/Header";
import { Login } from "./components/Login/Login";
import { Landing } from "./pages/Landing/Landing";
import { EditClients } from "./pages/EditClients/EditClients";
import { EditText } from "./pages/EditText/EditText";
import { SendText } from "./pages/SendText/SendText";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const initialStateClient = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    weightLossGoals: "",
    daysElapsed: "",
    spendTotal: "",
    coach: "",
    startDate: "",
  };
  const initialStateText = {
    _id: "",
    messageText: "",
    messageDay: "",
    mediaLink: "",
  };

  const [loggedIn, setLoggedIn] = useState();
  // selected client for client edit
  const [selected, setSelected] = useState(initialStateClient);
  // selected text for text edit
  const [selectedText, setSelectedText] = useState(initialStateText);
  // selected clients for message send
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [clients, setClients] = useState();
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("jwt") !== null) {
      setLoggedIn(true);
      if (clients === undefined) getClients();
      getTexts();
    }
  }, []);
  
  const getClients = async () => {
    const lstoken = localStorage.getItem("jwt");
    try {
      const response = await fetch(
        "https://nyv0w4diy4.execute-api.us-east-1.amazonaws.com/dev/api/clients",
        {
          headers: { Authorization: lstoken },
        }
      );
      const clients = await response.json();
      setClients(clients);
      setSelected(clients[0]);
      setSelectedGroup([clients[0], clients[1]]);
    } catch (err) {
      console.log(err);
    }
  };
  const getTexts = async () => {
    const lstoken = localStorage.getItem("jwt");
    try {
      const response = await fetch(
        "https://nyv0w4diy4.execute-api.us-east-1.amazonaws.com/dev/api/messages",
        {
          headers: { Authorization: lstoken },
        }
      );
      const textResponseJSON = await response.json();
      setTexts(textResponseJSON);
      setSelectedText(textResponseJSON[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div data-testid="app" className="App flex flex-col items-center">
      <Router>
        {loggedIn === true ? <Header /> : null}
        <div className="flex justify-center items-center mt-10">
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route
              path="/"
              element={
                <Login
                  getClients={getClients}
                  getTexts={getTexts}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                />
              }
            />
            <Route
              path="/send"
              element={
                <SendText
                  clients={clients}
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                />
              }
            />
            <Route
              path="/clients"
              element={
                <EditClients
                  clients={clients}
                  setClients={setClients}
                  selected={selected}
                  setSelected={setSelected}
                  initialState={initialStateClient}
                />
              }
            />
            <Route
              path="/edit-text"
              element={
                <EditText
                  texts={texts}
                  setTexts={setTexts}
                  selectedText={selectedText}
                  setSelectedText={setSelectedText}
                  initialState={initialStateText}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
