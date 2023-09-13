import React, { useState } from "react";
import { useDispatch } from "react-redux";
import EditUsersDetails from "../pages/login/editUsersDetails";
import { deleteUser, getAllUsers } from "../features/login/loginSlice";
import { LuEdit, LuTrash2, LuReceipt } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function AllUsersCard({ user, reload }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(user._id));
    dispatch(getAllUsers());
    reload();
  };
  return (
    <>
      <div
        id="allUserCard"
        className="w3-card w3-round-large"
        style={{ marginBottom: 10, marginRight: 10 }}
      >
        <div
          style={{
            padding: "20px",
          }}
        >
          <h2
            style={{
              borderBottom: "1px gray solid",
              color: "gray",
              fontWeight: 700,
            }}
          >
            {user.name} {user.surname}
            <br />
          </h2>
          {user.admin ? (
            <p style={{ color: "#ee6352", fontWeight: 700 }}>Admin</p>
          ) : (
            <p style={{ color: "#006c67", fontWeight: 700 }}>Client</p>
          )}
        </div>
        <div
          style={{
            padding: 20,
          }}
        >
          <p>
            <span style={{ color: "dimgray" }}>Email: </span> {user.email}
          </p>
          <p>
            <span style={{ color: "dimgray" }}>Telephone: </span> {user.phone}
          </p>
          <p>
            <span style={{ color: "dimgray" }}>Birthday: </span> {user.birthday}
          </p>
        </div>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#F2F2F2",
          }}
        >
          <LuEdit
            size={20}
            style={{ marginRight: "3vw" }}
            className="w3-ripple"
            onClick={openModal}
          />
          <LuTrash2
            size={20}
            style={{ marginRight: "3vw" }}
            className="w3-ripple"
            onClick={handleDeleteUser}
          />
          <LuReceipt
            size={20}
            className="w3-ripple"
            onClick={() => navigate(`/userbookings/${user._id}`)}
          />
        </div>
      </div>
      <EditUsersDetails user={user} visible={modalVisible} close={closeModal} />
    </>
  );
}
