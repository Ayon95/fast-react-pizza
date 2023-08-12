import { getAddress } from "@/services/apiGeocoding";
import { Position } from "@/types/index";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  username: string;
  addressStatus: "idle" | "loading" | "error";
  position: Position | null;
  address: string;
  addressError: string;
};

const initialState: InitialState = {
  username: "",
  addressStatus: "idle",
  position: null,
  address: "",
  addressError: "",
};

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position: Position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it in the order form, so that the user can correct it if it's wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  // this will be action.payload for fulfilled state
  return { position, address };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAddress.pending, state => {
      state.addressStatus = "loading";
    });

    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.addressStatus = "idle";
      state.position = action.payload.position;
      state.address = action.payload.address;
    });

    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.addressStatus = "error";
      state.addressError = `${action.error.message}. Please type in your address.`;
    });
  },
});

function getPosition() {
  return new Promise<GeolocationPosition>(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
