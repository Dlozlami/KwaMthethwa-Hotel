import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRoom } from "../../features/roomsSlice";
import { IoCloseCircle } from "react-icons/io5";

export default function AddRoom({ visible, close}) {

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rateInCents, setRateInCents] = useState(0);
  const [image, setImage] = useState("");
  const [num_guest, setNum_guest] = useState(0);
  const [num_bedroom, setNum_bedroom] = useState(0);
  const [floorSpace, setFloorSpace] = useState(0);
  const [bedType, setBedType] = useState("");

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

  const handleAddRoom = () => {
    dispatch(createRoom({
      title:title,
      description:description,
      rateInCents:rateInCents,
      image:image,
      num_guest:num_guest,
      num_bedroom:num_bedroom,
      floorSpace:floorSpace,
      bedType:bedType,
    }));
    setImage("");
    setNum_guest(0);
    setTitle("");
    setBedType("");
    setNum_bedroom(0);
    setDescription("");
    setFloorSpace(0);
    setRateInCents(0);
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
            <h2>Add a new room</h2>
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
          <div style={{backgroundColor:'white',padding:'50px',justifyContent:'center',width:'50vw'}}>

                    <label htmlFor="title"> Title</label>
                    <input type="text" id="title"  value={title} onChange={(event)=>setTitle(event.target.value)} />
                    <br />
                    <label htmlFor="rateInCents">Rate in cents</label>
                    <input type="number" id="rateInCents"  value={rateInCents} onChange={(event)=>setRateInCents(event.target.value)} />
                    <br />
                    <label htmlFor="num_guest">num_guest</label>
                    <input type="number" id="num_guest"  value={num_guest} onChange={(event)=>setNum_guest(event.target.value)} />
                    <br />
                    <label htmlFor="num_bedroom">num_bedroom</label>
                    <input type="number" id="num_bedroom"  value={num_bedroom} onChange={(event)=>setNum_bedroom(event.target.value)} />
                    <br />
                    <label htmlFor="pic">Upload photo</label>
                    <input type="file" accept="image/*" id="pic" onChange={handleImageUpload} />
                    <br />
                    <label htmlFor="floorSpace"> floorSpace</label>
                    <input type="number" id="floorSpace"  value={floorSpace} onChange={(event)=>setFloorSpace(event.target.value)} />
                    <br />
                    <label htmlFor="bedType">bedType</label>
                    <input type="text" id="bedType"  value={bedType} onChange={(event)=>setBedType(event.target.value)} />
                    <br />
                    <label htmlFor="description">description</label>
                    <textarea id="description"  value={description} onChange={(event)=>setDescription(event.target.value)} ></textarea>
                    <br /><br />
                    <button onClick={handleAddRoom} style={{ marginRight: '5vw' }} className="w3-btn w3-border w3-border-black w3-round-large">
                        Add a room
                    </button><br /><br /><br />
                    </div>
        </div>
      </div>
    </div>
  );
}
