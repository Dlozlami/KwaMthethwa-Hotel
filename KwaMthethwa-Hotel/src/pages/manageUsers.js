import React, { useState, useEffect } from "react";
import Footer from "../components/footer/footer";
import { getAllUsers } from "../features/login/loginSlice";
import FilterBTN from "../components/filterBTN";
import { useSelector, useDispatch } from "react-redux";
import AllUsersCard from "../components/allUsersCard";

export default function ManageUsers() {
  const [active, setActive] = useState(null);
  const [reloadBookings, setReloadBookings] = useState(true);
  const { allUsers, clientUsers, adminUsers } = useSelector(
    (store) => store.login
  );

  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("Rendering total: ");
    dispatch(getAllUsers());
    // eslint-disable-next-line
  }, [reloadBookings]);

  return (
    <>
      <div id="mainView">
        <div
          className=" w3-card-4 w3-round-large w3-white"
          style={{ width: "90%" }}
        >
          <div
            style={{
              border: "none",
              borderBottom: "1px black solid",
              backgroundColor: "#d4af37",
              padding: 20,
            }}
          >
            <h1
              style={{
                fontWeight: "500",
              }}
            >
              Manage Users
            </h1>
            <p>
              Use the controls below to view client and add admin privileges.
            </p>
            <br />
            <div>
              <FilterBTN active={active} setActive={setActive} name={"All"} />
              <FilterBTN
                active={active}
                setActive={setActive}
                name={"Clients"}
              />
              <FilterBTN active={active} setActive={setActive} name={"Admin"} />
            </div>
            <br />
          </div>
          <br />
          {active === "All" ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {allUsers.length === 0 ? (
                <div style={{ padding: 20 }}>
                  <p>No people to display.</p>
                </div>
              ) : (
                allUsers.map((user) => (
                  <AllUsersCard
                    key={user._id}
                    user={user}
                    reload={() => setReloadBookings(!reloadBookings)}
                  />
                ))
              )}
            </div>
          ) : null}

          {active === "Clients" ? (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {clientUsers.length === 0 ? (
                <div style={{ padding: 20 }}>
                  <p>No clients to display.</p>
                </div>
              ) : (
                clientUsers.map((user) => (
                  <AllUsersCard
                    key={user._id}
                    user={user}
                    reload={() => setReloadBookings(!reloadBookings)}
                  />
                ))
              )}
            </div>
          ) : null}

          {active === "Admin" ? (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {adminUsers.length === 0 ? (
                <div style={{ padding: 20 }}>
                  <p>No admins to display.</p>
                </div>
              ) : (
                adminUsers.map((user) => (
                  <AllUsersCard
                    key={user._id}
                    user={user}
                    reload={() => setReloadBookings(!reloadBookings)}
                  />
                ))
              )}
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
}
