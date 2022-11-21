import { fireEvent, render, screen, waitFor, rerender } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {});
test("renders", () => {
  render(<App />);
  const app = screen.getByText("Welcome Bonnie and Will!");
  expect(app).toBeInTheDocument();
});
test("login form appears", () => {
  render(<App />);
  const loginForm = screen.getByTestId("login-form");
  expect(loginForm).toBeInTheDocument();
});

test("username input appears", () => {
  render(<App />);
  const usernameInput = screen.getByLabelText("Username");
  expect(usernameInput).toBeInTheDocument();
});
test("password input appears", () => {
  render(<App />);
  const usernameInput = screen.getByLabelText("Password");
  expect(usernameInput).toBeInTheDocument();
});
test("login button appears", () => {
  render(<App />);
  const button = screen.getByText("Login");
  expect(button).toBeInTheDocument();
});

test("username should change", () => {
  render(<App />);
  const usernameInput = screen.getByLabelText("Username");
  const testValue = "test";
  fireEvent.change(usernameInput, { target: { value: testValue } });
  expect(usernameInput.value).toBe(testValue);
});

test("password should change", () => {
  render(<App />);
  const passwordInput = screen.getByLabelText("Password");
  const testValue = "test";
  fireEvent.change(passwordInput, { target: { value: testValue } });
  expect(passwordInput.value).toBe(testValue);
});

test("error appears when button is clicked with empty inputs", () => {
  render(<App />);
  const button = screen.getByText("Login");
  fireEvent.click(button);
  const error = screen.getByTestId("error");
  expect(error.textContent).toBe("Please fill out all fields!");
});

test("failed login with fetch produces error message", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: "Error message" }),
      })
    );
    render(<App />);
  
    const testValue = "test";
    const usernameInput = screen.getByLabelText("Username"); 
    const passwordInput = screen.getByLabelText("Password");
    const button = screen.getByText("Login");
    const error = screen.getByTestId("error");
    //filling out fields and attempting log in
  
    fireEvent.change(usernameInput, { target: { value: testValue } });
    fireEvent.change(passwordInput, { target: { value: testValue } });
    fireEvent.click(button);
    await waitFor(() => screen.findByTestId("error"));
    expect(error.textContent).toBe("Error message");
  });

test("succesful login with fetch redirects to /landing", async () => {
  const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ userToken: "Bearer 2309gis09gis093gi" }),
    })
  );
  render(<App />);
  const testValue = "test";
  const usernameInput = screen.getByLabelText("Username");
  const passwordInput = screen.getByLabelText("Password");
  const button = screen.getByText("Login");
  // filling out fields and attempting log in

  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(button);
  // need to wait for the browser to redirect
  await waitFor(() => screen.findByText("Send one-time messages"));
  expect(window.location.pathname).toBe("/landing");
});


