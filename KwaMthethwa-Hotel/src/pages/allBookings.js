import React, { useState, useEffect } from "react";
import Footer from "../components/footer/footer";
// eslint-disable-next-line
import { fetchAllBookings } from "../features/bookingsSlice";
// eslint-disable-next-line
import { updateReceipt, getReceiptByRef } from "../features/receiptSlice";
import FilterBTN from "../components/filterBTN";
import { useSelector, useDispatch } from "react-redux";

export default function AllBookings() {
  const [active, setActive] = useState(null);
  const { allBookings, allUnpaidBooking, allPaidBooking } = useSelector(
    (store) => store.bookings
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("Rendering total: ");
    dispatch(fetchAllBookings());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div id="mainView">
        <div className=" w3-card-4 w3-round-large w3-white">
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
              Client Boookings
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
              {allBookings.map((booking) => (
                <div className="b" style={{}}></div>
              ))}
            </div>
          ) : null}
          {active === "Paid" ? <div></div> : null}
          {active === "Unpaid" ? <div></div> : null}
        </div>
      </div>
      <Footer />
    </>
  );
}
