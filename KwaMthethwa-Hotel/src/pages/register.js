import React, { useState } from "react";
import { addUser } from "../features/register/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/footer/footer";

export default function Register() {
  const { userAdded } = useSelector((store) => store.register);
  const dispatch = useDispatch();

  //eslint-disable-next-line
  const [inputValues, setInputValues] = useState({
    password: "",
    name: "",
    surname: "",
    email: "",
    birthday: "",
    phone: "",
  });

  const add = () => {
    const updatedInputValues = {
      password: document.getElementById("pwd").value,
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,

      birthday: document.getElementById("birthday").value,

      phone: document.getElementById("phone").value,
    };

    setInputValues(updatedInputValues);

    dispatch(addUser(updatedInputValues));
  };

  if (userAdded) {
    document.getElementById("addEmployeeBTN").disabled = true;
    document.getElementById("pwd").value = "";
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("email").value = "";

    document.getElementById("birthday").value = "";

    document.getElementById("phone").value = "";
    document.getElementById("addEmployeeBTN").disabled = false;
  }

  const checkEmail = (event) => {
    let email = event.target.value.split(" ")[0];
    // eslint-disable-next-line
    var newRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    email.match(newRegex)
      ? (document.getElementById("invalidEmail").style.display = "none")
      : (document.getElementById("invalidEmail").style.display = "inline");
  };

  return (
    <>
      <div id="mainView">
        <div className="formStyles" style={{ overflow: "auto" }}>
          <div
            style={{
              border: "none",
              borderBottom: "1px black solid",
              marginRight: 30,
            }}
          >
            <h1
              style={{
                fontWeight: "500",
                color: "darkGray",
              }}
            >
              Sign up
            </h1>
            <p>Create a new account to access our services.</p>
            <br />
          </div>
          <br />
          <div style={{ marginRight: 30 }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
            <br />
            <br />
            <label htmlFor="surname">Surname</label>
            <input type="text" id="surname" />
            <br />
            <br />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={(e) => checkEmail(e)} />
            <br />
            <span
              className="w3-text-red"
              id="invalidEmail"
              style={{ display: "none" }}
            >
              * This is not a valid email address.
            </span>
            <br />
            <label htmlFor="bio">Password</label>
            <input type="password" id="pwd" />
            <br />
            <br />
          </div>
          <div>
            <label htmlFor="birthday">Date of birth</label>
            <input type="date" id="birthday" placeholder="e.g. 20/12/1952" />
            <br />
            <br />

            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" />
            <br />
            {userAdded ? (
              <div className="w3-panel w3-green w3-round-small w3-padding-16">
                Sign up is successful!
              </div>
            ) : (
              ""
            )}
            <br />
            <button
              id="addEmployeeBTN"
              onClick={add}
              style={{ marginRight: "5vw", padding: "10px" }}
              className="limeButton w3-border w3-border-black w3-ripple w3-round-large"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
