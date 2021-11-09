import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: 'idle',
  entities: [],
}

export const fetchEarthquakes = createAsyncThunk(
  'earthquakes/fetchEarthquakes',
  async ({startDate, endDate}, thunkAPI) => {
    console.log("requets", startDate, endDate);
    const requestUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}`;
    const response = await axios.get(requestUrl);
    console.log("response", response);

    return response.data.features;
  }
)

export const earthquakesSlice = createSlice({
  name: 'earthquakes',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchEarthquakes.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities = action.payload;
    })
    .addCase(fetchEarthquakes.rejected, (state, action) => {
      console.log("errr", action.error)
    })    
  },  
})

export const store = configureStore({
  reducer: {
    earthquakes: earthquakesSlice.reducer,
  },
});
