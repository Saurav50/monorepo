import React from "react";
import { Signup } from "@repo/ui/Signup";
import axios from "axios";

const signup = () => {
  // const signup =
  return (
    <div>
      <Signup
        onClick={async (username, password) => {
          try {
            const response = await axios.post("/api/signup", {
              username,
              password,
            });

            localStorage.setItem("token", response.data.token);
          } catch (error: {}) {
            console.log(error.response.data.message);
          }
        }}
      />
    </div>
  );
};

export default signup;
