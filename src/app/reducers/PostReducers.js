export const FeedListReducer = (state = { skits: [] }, action) =>{
  switch (action.type) {
    case "ADD_POST":
      return [{ feeds: action.payload.skit }, ...state.skits];
    default:
      return state;
  }
}
