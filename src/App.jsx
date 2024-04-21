import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getCurrentuser()
      //01 DOUBT: what data will be fetched by getCurrentUser
      //        and from where it gets ?
      // ANS: data will be like $id , name ,email ,logintime etc
      //      refer redux to understand this
      .then((userData) => {
        //02 DOUBT  : is it necessary to use then ?
        // ANS : so we will be able to handle the
        //       result of the data returned
        if (userData) {
          dispatch(login({ userData }));
          // here we need to destructure and send
          // cause if we doesnt do like that , when we login
          // there wont be an object named userData in the
          // payload instead data will be stored individually
          // in the payload . This will result in a problem
          // cause there are many situations in other component
          // we are accessing the data using userData . So if
          // doesnt do like this , it will cause error
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div
      className="min-h-screen flex flex-wrap
      content-between bg-gray-100"
    >
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
