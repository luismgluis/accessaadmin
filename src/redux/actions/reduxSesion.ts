import GroupType from "../../types/GroupType";
import UserType from "../../types/UserType";

const setCurrentUser = (user: UserType) => (dispatch: any) => {
  dispatch({
    type: "setCurrentUser",
    payload: user,
  });
};

const setCurrentGroup = (group: GroupType) => (dispatch: any) => {
  dispatch({
    type: "setCurrentGroup",
    payload: group,
  });
};
export const reduxSesion = {
  setCurrentUser,
  setCurrentGroup,
};
