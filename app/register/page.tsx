"use client";

import React, { SyntheticEvent, useState } from "react";
import Layout from "../layout";
import { useRouter } from "next/navigation";

const Register = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");
  const [passMismatch, setPassMisMatch] = useState("");

  const validateName = (name) => {
    return name.length >= 5;
  };

  const validateEmail = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/;
    return password.length >= 8 && passwordRegex.test(password);
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!validateName(name)) {
      // alert();
      setNameError("Name must have at least 5 characters");
      return;
    } else {
      setNameError("");
    }
    if (!validatePassword(password)) {
      setPassError(
        "Password must be at least 8 characters long and contain one lowercase letter, one uppercase letter, one digit, and one special character."
      );
      return;
    } else {
      setPassError("");
    }

    if (!validateEmail(email)) {
      alert("include enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setPassMisMatch("Password and Confirm Password do not match");

      return;
    } else {
      setPassMisMatch("");
    }

    await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    await router.push("/login");
  };

  return (
    <>
      <div className="h-screen">
        <form onSubmit={submit}>
          <div className="form-signin w-100 h-100 flex justify-center">
            <div className="px-8 p-4 bg-gray-50 w-96 flex flex-col gap-5 justify-center items-center">
              <h1 className="text-xl">Please register</h1>

              <label className="input-group input-group-vertical">
                <span>Name</span>
                <span className="text-red-400 text-xs label-text-alt">
                  {nameError}
                </span>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="input-group input-group-vertical">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="info@site.com"
                  className="input input-bordered"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="input-group  input-group-vertical">
                <span>Password</span>
                <span className="text-red-400 text-xs label-text-alt">
                  {passError}
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label className="input-group  input-group-vertical">
                <span>Password</span>
                <span className="text-red-400 text-xs label-text-alt">
                  {passMismatch}
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>

              <button
                className="w-75 h-14 btn btn-lg btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
