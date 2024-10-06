import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritePets: [],
};

const favoriteSlice = createSlice({
  name: "favoriteSlice",
  initialState,
  reducers: {
    toggleFavorites: (state, action) => {
      const petId = action.payload;
      if (state.favoritePets.includes(petId)) {
        state.favoritePets = state.favoritePets.filter((id) => id !== petId);
      } else {
        state.favoritePets.push(petId);
      }
    },
  },
});

export const { toggleFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
