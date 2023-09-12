import React, { useState, useEffect } from "react";
import Footer from "../components/footer/footer";
import { fetchBookingsByID } from "../features/bookingsSlice";
import FilterBTN from "../components/filterBTN";
import { useSelector, useDispatch } from "react-redux";
import AllBookingsCard from "../components/allBookingsCard";
import { useParams } from "react-router-dom";

export default function UserBookings() {
  const [active, setActive] = useState(null);
  const [reloadBookings, setReloadBookings] = useState(true);
  const { bookingsCart, userUnpaidBooking, userPaidBooking } = useSelector(
    (store) => store.bookings
  );
  const ref = useParams().id;
  const dispatch = useDispatch();

  console.log("Rendering params: ", ref);

  useEffect(() => {
    //console.log("Rendering total: ");
    dispatch(fetchBookingsByID(ref));
    // eslint-disable-next-line
  }, []);

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
              Transaction History
            </h1>
            <p>
              Use the controls below to view all bookings, unpaid bookings or
              paid bookings
            </p>
            <br />
            <div>
              <FilterBTN active={active} setActive={setActive} name={"All"} />
              <FilterBTN active={active} setActive={setActive} name={"Paid"} />
              <FilterBTN
                active={active}
                setActive={setActive}
                name={"Unpaid"}
              />
            </div>
            <br />
          </div>
          <br />
          {active === "All" ? (
            <div>
              {bookingsCart.map((booking) => (
                <AllBookingsCard
                  key={booking._id}
                  booking={booking}
                  reload={() => setReloadBookings(!reloadBookings)}
                />
              ))}
            </div>
          ) : null}
          {active === "Paid" ? (
            <div>
              {userPaidBooking.map((booking) => (
                <AllBookingsCard
                  key={booking._id}
                  booking={booking}
                  reload={() => setReloadBookings(!reloadBookings)}
                />
              ))}
            </div>
          ) : null}
          {active === "Unpaid" ? (
            <div>
              {userUnpaidBooking.map((booking) => (
                <AllBookingsCard
                  key={booking._id}
                  booking={booking}
                  reload={() => setReloadBookings(!reloadBookings)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
}
