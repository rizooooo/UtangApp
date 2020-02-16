const INITIAL_STATE = {
  currentUser: null,
  error: null,
};
const ReviewReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    // case UserActionTypes.SIGN_IN_SUCCESS:
    //   return {
    //     ...state,
    //     currentUser: action.payload,
    //     error: null,
    //   };
    // case UserActionTypes.SIGN_OUT_SUCCESS:
    //   return {
    //     ...state,
    //     currentUser: null,
    //     error: null,
    //   };
    // case UserActionTypes.SIGN_IN_FAILURE:
    // case UserActionTypes.SIGN_OUT_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };

    default:
      return state;
  }
};

export default ReviewReducer;
