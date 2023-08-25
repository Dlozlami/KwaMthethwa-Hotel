import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/bookingsSlice";
import { IoCloseCircle } from "react-icons/io5";

export default function BookingsModal({ visible, close, user }) {
  const { userData } = useSelector((store) => store.login);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [birthday, setBirthday] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);

  const handleUserUpdate = () => {
    const newData = {};

    console.log("New user details update: ");
    dispatch(updateUser([newData, userData.id]));
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
          }}
        >
          <div>
            <h2>Edit personal details</h2>
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
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <label style={{ marginBottom: "10px" }}>
              Name:
              <br />
              <input
                type="date"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <br />
            <label style={{ marginBottom: "10px" }}>
              Departure Date:
              <br />
              <input
                type="date"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
              />
            </label>

            <label style={{ marginBottom: "10px" }}>
              Guests:
              <br />
              <select
                value={numGuests}
                onChange={(event) =>
                  setNumGuests(parseInt(event.target.value, 10))
                }
              >
                <option value={1}>1 guest</option>
                <option value={2}>2 guests</option>
              </select>
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
            onClick={handleRoomBooking}
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
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
