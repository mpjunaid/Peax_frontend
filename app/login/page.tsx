"use client";

import React, { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("click");
    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    try {
      const login_response = await response.json();
      console.log("Response:", login_response);
      if (login_response.jwt) {
        setAuth(true);
        router.push("/");
      } else if (login_response.detail) {
        setErrorMessage(login_response.detail); // Set the error message
      } else {
        console.log("Unknown response data:", login_response);
      }
    } catch (error) {
      console.error("Error:", "Login value error");
    }
  };

  return (
    <>
      <div className="h-screen">
        <form onSubmit={submit}>
          <div className="form-signin w-100 h-100 flex justify-center">
            <div className="px-8 p-4 bg-gray-50 w-96 flex flex-col gap-10 justify-center items-center">
              <h1 className="text-xl">Please sign in</h1>

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
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <h1 className="text-red-400" id="Errordisplay">
                {errorMessage}
              </h1>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
