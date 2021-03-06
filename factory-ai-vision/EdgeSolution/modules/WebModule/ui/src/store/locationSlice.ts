import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import Axios from 'axios';
import { State } from 'RootStateType';

export type Location = {
  id: number;
  name: string;
  description: string;
  is_demo: boolean;
};

const locationsAdapter = createEntityAdapter<Location>();

export const getLocations = createAsyncThunk<any, boolean, { state: State }>(
  'locations/get',
  async (isDemo) => {
    const response = await Axios.get(`/api/locations?is_demo=${Number(isDemo)}`);
    return response.data;
  },
  {
    condition: (_, { getState }) => getState().locations.ids.length === 0,
  },
);

export const postLocation = createAsyncThunk('locations/post', async (newLocation: Omit<Location, 'id'>) => {
  const response = await Axios.post(`/api/locations/`, newLocation);
  return response.data;
});

export const deleteLocation = createAsyncThunk('locations/delete', async (id: number) => {
  await Axios.delete(`/api/locations/${id}/`);
  return id;
});

const locationSlice = createSlice({
  name: 'locations',
  initialState: locationsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocations.fulfilled, locationsAdapter.setAll)
      .addCase(postLocation.fulfilled, locationsAdapter.addOne)
      .addCase(deleteLocation.fulfilled, locationsAdapter.removeOne);
  },
});

const { reducer } = locationSlice;

export default reducer;

export const {
  selectAll: selectAllLocations,
  selectById: selectLocationById,
} = locationsAdapter.getSelectors<State>((state) => state.locations);
