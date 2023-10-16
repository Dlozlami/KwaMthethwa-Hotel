import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  rooms: [],
  roomImages: [
    require("./images/00.jpg"),
    require("./images/01.jpg"),
    require("./images/02.jpg"),
    require("./images/03.jpg"),
    require("./images/04.jpg"),
    require("./images/05.jpg"),
    require("./images/06.jpg"),
    require("./images/07.jpg"),
  ],
  loading: false,
  error: null,
};

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  try {
    const response = await axios.get(`http://localhost:8080/rooms/`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async (newRoomData) => {
    console.log("rooms/createRoom ");
    try {
      const response = await axios.post(
        `http://localhost:8080/rooms/`,
        newRoomData
      );
      alert("Room successfully added!");
      console.log("Added a room: ", newRoomData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async (updateData) => {
    console.log("Updated room ID: ", updateData);
    try {
      const response = await axios.patch(
        `http://localhost:8080/rooms/${updateData[1]}`,
        updateData[0]
      );
      alert("Room successfully updated!");
      console.log("Updated room: ", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async (roomId) => {
    try {
      await axios.delete(`http://localhost:8080/rooms/${roomId}`);
      alert("Room successfully deleted!");
      console.log("Deleted room: _id/", roomId);
      return roomId;
    } catch (error) {
      throw error;
    }
  }
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    // Define any synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
        state.rooms.forEach((room) => {
          room.image = state.roomImages.pop();
        });
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        const updatedRoomIndex = state.rooms.findIndex(
          (room) => room.id === action.payload.id
        );
        if (updatedRoomIndex !== -1) {
          state.rooms[updatedRoomIndex] = action.payload;
        }
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      });
  },
});

export default roomsSlice.reducer;

//export const { /* Define any synchronous actions if needed */ } = roomsSlice.actions;