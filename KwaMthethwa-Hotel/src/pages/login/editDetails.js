import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/login/loginSlice";
import { IoCloseCircle } from "react-icons/io5";

export default function EditDetails({ visible, close }) {
  const { userData } = useSelector((store) => store.login);
  const dispatch = useDispatch();
  const [name, setName] = useState(userData.name);
  const [surname, setSurname] = useState(userData.surname);
  const [birthday, setBirthday] = useState(userData.birthday);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  //const [password, setPassword] = useState("");

  const handleUserUpdate = () => {
    const newData = {
      name: name,
      surname: surname,
      email: email,
      birthday: birthday,
      phone: phone,
    };
    dispatch(updateUser([userData.id, newData]));
    setName("");
    setSurname("");
    setEmail("");
    setPhone("");
    setBirthday("");
    close();
  };

  return (
    <div
      className="modal"
      style={{
        display: visible ? "block" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: "20px",
        zIndex: 10,
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          width: "90vw",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            border: "none",
            borderBottom: "1px black solid",
            backgroundColor: "#d4af37",
          }}
        >
          <div>
            <h2>Edit your details</h2>
          </div>
          <div>
            <button
              className="close-button"
              onClick={close}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              <IoCloseCircle size={30} />
            </button>
          </div>
        </div>

        <div
          style={{
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginBottom: "10px",
            }}
          >
            <label style={{ marginBottom: "10px", marginRight: "10px" }}>
              Name:
              <br />
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <br />
            <label style={{ marginBottom: "10px", marginRight: "10px" }}>
              Surname:
              <br />
              <input
                type="text"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
              />
            </label>

            <br />
            <label style={{ marginBottom: "10px", marginRight: "10px" }}>
              Email:
              <br />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <br />
            <label style={{ marginBottom: "10px", marginRight: "10px" }}>
              Phone:
              <br />
              <input
                type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>
            <br />
            <label style={{ marginBottom: "10px", marginRight: "10px" }}>
              Birthday:
              <br />
              <input
                type="date"
                value={birthday}
                onChange={(event) => setBirthday(event.target.value)}
              />
            </label>
          </div>
          <button
            className="w3-ripple"
            style={{
              fontSize: "15px",
              padding: "10px",
              backgroundColor: "#006c67",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              textDecoration: "none",
              height: "5vh",
              marginRight: "3vw",
            }}
            onClick={handleUserUpdate}
          >
            Save changes
          </button>
          <button
            className="w3-ripple"
            style={{
              fontSize: "15px",
              padding: "10px",
              backgroundColor: "#006c67",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              textDecoration: "none",
              height: "5vh",
            }}
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
