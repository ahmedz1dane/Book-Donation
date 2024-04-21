import React from "react";
import { Signup as SignupComponent } from "../components";

function Signup() {
  return (
    <div
      className="py-8"
      style={{
        backgroundImage: `url('https://images.alphacoders.com/132/1326370.png')`, // Replace this URL with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "95vh",
      }}
    >
      <SignupComponent />
    </div>
  );
}

export default Signup;
