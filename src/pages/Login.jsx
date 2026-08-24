import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  //useRef -> to link
  const emailInput = useRef();
  const passwordInput = useRef();
  const navigate = useNavigate();

  let users = [
    {
      id: 1,
      email: "makarios@gmail.com",
      password: 1234,
      balance: 0,
      transaction: [],
    },
    {
      id: 2,
      email: "makarios2@gmail.com",
      password: 12345,
      balance: 0,
      transaction: [],
    },
  ];

  localStorage.setItem("users", JSON.stringify(users));

  const login = (event) => {
    event.preventDefault();
    let email = emailInput.current.value;
    let password = passwordInput.current.value;
    let users = JSON.parse(localStorage.getItem("users"));
    let userIsHere = users.some((el) => {
      return el.email == email && el.password == password;
    });

    if (userIsHere) {
      alert("Login");
      navigate("/profile");
    } else {
      alert("wrong Email or Password");
    }
  };
  return (
    <div className="bg-gray-900 flex items-center w-full h-screen justify-center">
      <form
        onSubmit={login}
        className=" p-10 shadow rounded-2xl flex flex-col gap-6 bg-black/30"
      >
        <h1 className="text-black w-125 text-center bg-gray-700 p-3 rounded-2xl">
          Welcome user Please Login
        </h1>
        <input
          ref={emailInput}
          className="input w-full bg-gray-700 rounded-2xl"
          placeholder="Please Enter your Email"
          type="email"
        />
        <input
          ref={passwordInput}
          className="input w-full bg-gray-700 rounded-2xl"
          placeholder="Please Enter your Password"
          type="password"
        />
        <button className="btn btn-outline btn-success rounded-2xl">Login</button>
      </form>
    </div>
  );
}
