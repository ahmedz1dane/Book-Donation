import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // TODO: make it more easy

    // if(authStatus === true){
    //     navigate("/")
    // }else if(authStatus === false){
    //     navigate("/login")
    // }

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading ...</h1> : <>{children}</>;
}

//  WHAT I UNDERSTOOD ABOUT THIS PAGE :

// Suppose if both authentication and authStatus are false
// we know that useeEffect will only be runned ater the initial
// render or if one of its dependencies change
// so  1st we can see that Loading will be shown
// then the useEffect will be executed , then we can see that
// both the conditions are not met therefore Loader will be
// initialized to false therefore while executing the return
// part it becomes false the children component wil be runned

// DOUBT : why there is a need to use this component , why cant we
//         do without this component ?
