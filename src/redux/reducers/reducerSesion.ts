import GroupType from "../../types/GroupType";
import UserType from "../../types/UserType";

type InitialStateSesion = {
  currentUser: UserType;
  currentGroup: GroupType;
};
const INITIAL_STATE: InitialStateSesion = {
  currentUser: new UserType("", null),
  currentGroup: new GroupType("", null),
};
const reducerSesion = (
  state: InitialStateSesion = INITIAL_STATE,
  action: any
) => {
  switch (action.type) {
    case "setCurrentUser":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "setCurrentGroup":
      return {
        ...state,
        currentGroup: action.payload,
      };
    default:
      return state;
  }
};
export default reducerSesion;
