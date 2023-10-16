import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateRoom } from "../../features/roomsSlice";
import { IoCloseCircle } from "react-icons/io5";

export default function EditRoomModal({ visible, close, room }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(room.title);
  const [description, setDescription] = useState(room.description);
  const [rateInCents, setRateInCents] = useState(room.rateInCents);
  const [image, setImage] = useState(room.image);
  const [num_guest, setNum_guest] = useState(room.num_guest);
  const [num_bedroom, setNum_bedroom] = useState(room.num_bedroom);
  const [floorSpace, setFloorSpace] = useState(room.floorSpace);
  const [bedType, setBedType] = useState(room.bedType);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const photoReader = new FileReader();
      photoReader.onload = () => {
        setImage(photoReader.result);
      };
      photoReader.readAsDataURL(file);
    }
  };
  //console.log("Room to edit: ", room._id);
  const handleSaveChanges = () => {
    dispatch(
      updateRoom([
        {
          title: title,
          description: description,
          rateInCents: rateInCents,
          num_guest: num_guest,
          num_bedroom: num_bedroom,
          floorSpace: floorSpace,
          bedType: bedType,
        },
        room._id,
      ])
    );
    setImage("");
    setNum_guest(0);
    setTitle("");
    setBedType("");
    setNum_bedroom(0);
    setDescription("");
    setFloorSpace(0);
    setRateInCents(0);
    close();
  };

  return (
    <div
      className="modal"
      style={{
        display: visible ? "block" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
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
            backgroundColor: "#d4af37",
          }}
        >
          <div>
            <h2>Edit room</h2>
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
            overflow: "scroll",
            height: "80vh",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "50px",
              justifyContent: "center",
              width: "50vw",
            }}
          >
            <label htmlFor="title"> Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <br />
            <br />
            <label htmlFor="rateInCents">Rate in cents</label>
            <input
              type="number"
              id="rateInCents"
              value={rateInCents}
              onChange={(event) => setRateInCents(event.target.value)}
            />
            <br />
            <br />
            <label htmlFor="num_guest">Number of guests</label>
            <input
              type="number"
              id="num_guest"
              value={num_guest}
              onChange={(event) => setNum_guest(event.target.value)}
            />
            <br />
            <br />
            <label htmlFor="num_bedroom">Number of bedrooms</label>
            <input
              type="number"
              id="num_bedroom"
              value={num_bedroom}
              onChange={(event) => setNum_bedroom(event.target.value)}
            />
            <br />
            {/* <label htmlFor="pic">Upload photo</label>
            <input
              type="file"
              accept="image/*"
              id="pic"
              onChange={handleImageUpload}
            /> */}
            <br />
            <label htmlFor="floorSpace">
              {" "}
              Floor space m<sup>2</sup>
            </label>
            <input
              type="number"
              id="floorSpace"
              value={floorSpace}
              onChange={(event) => setFloorSpace(event.target.value)}
            />
            <br />
            <br />
            <label htmlFor="bedType">Bed type</label>
            <input
              type="text"
              id="bedType"
              value={bedType}
              onChange={(event) => setBedType(event.target.value)}
            />
            <br />
            <br />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
            <br />
            <br />
            <button
              onClick={handleSaveChanges}
              style={{
                fontSize: "15px",
                padding: "10px",
                backgroundColor: "#006c67",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                textDecoration: "none",
                marginRight: "5vw",
              }}
              className="w3-btn w3-border w3-border-black w3-round-large"
            >
              Save changes
            </button>
            <button
              onClick={close}
              style={{
                fontSize: "15px",
                padding: "10px",
                backgroundColor: "#006c67",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                textDecoration: "none",
                marginRight: "5vw",
              }}
              className="w3-btn w3-border w3-border-black w3-round-large"
            >
              Cancel
            </button>
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
