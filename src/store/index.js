import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: 'idle',
  entities: [],
  currentRequestId: undefined,
  error: null,  
  selectedEarthquake: null,
  startDate: null,
  endDate: null,
  sortOption: { value: "newest", label: "Newest First" }
}

export const fetchEarthquakes = createAsyncThunk(
  'earthquakes/fetchEarthquakes',
  async ({startDate, endDate}) => {
    const requestUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&limit=100`;
    const response = await axios.get(requestUrl);

    return response.data.features;
  }
)

export const earthquakesSlice = createSlice({
  name: 'earthquakes',
  initialState,
  reducers: {
    setSelectedEarthquake: (state, action) => {
      state.selectedEarthquake = action.payload
    },    
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchEarthquakes.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
        state.error = null;
      }
    })    
    .addCase(fetchEarthquakes.fulfilled, (state, action) => {
      const { requestId } = action.meta;

      if (
        state.loading === 'pending' &&
        state.currentRequestId === requestId
      ) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
      }
    })
    .addCase(fetchEarthquakes.rejected, (state, action) => {
      const { requestId } = action.meta;

      if (
        state.loading === 'pending' &&
        state.currentRequestId === requestId
      ) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    })    
  },  
})

// Action creators are generated for each case reducer function
export const { setSelectedEarthquake, setStartDate, setEndDate, setSortOption } = earthquakesSlice.actions

export const store = configureStore({
  reducer: {
    earthquakes: earthquakesSlice.reducer,
  },
});
