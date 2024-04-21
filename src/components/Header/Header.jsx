import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  // DOUBT : there is slight difference between the usage of
  //         state.auth.status  in this project and the
  //         reduxToolTodo project , why ?
  // ANS:Because , when we compare todoSlice.js in the reduxToolTodo project
  //     we can see that in the initial state we are passing todos
  //     which is an array of objects , because we need to hold
  //     many objects in that array , whereas in this project ,we
  //     see that there are 2 states that are status and userData
  //     and we are accessing status here , that is the reason behind
  //     our confusion

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header
      className="py-3 shadow bg-gray-200 "
      style={{
        position: "fixed",
        width: "100%",
        top: "0",
        zIndex: "100",
        backgroundColor: "#1e1e1e",
      }}
    >
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex ml-auto text-white">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
