import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import utils from "../../libs/utils/utils";
import { reduxSesion } from "../../redux/actions/reduxSesion";
import UserType from "../../types/UserType";

const TAG = "useCurrentUser";
export function useCurrentUser() {
  const [user, setUser] = useState<UserType>(new UserType("", null));

  useSelector((store: any) => {
    try {
      const newUser: UserType = store.reducerSesion.currentUser;
      if (!utils.objects.isEmpty(newUser)) {
        if (!newUser.isEmpty()) {
          if (user.id !== newUser.id) {
            setUser(new UserType(newUser.id, newUser.exportToUpload()));
          }
        }
        return new UserType(newUser.id, newUser);
      }
    } catch (error) {
      console.log(TAG, error);
    }
    return new UserType("", null);
  });

  return user;
}

export function useSetCurrentUser() {
  const dispatch = useDispatch();
  const callBack = useCallback(
    (user: UserType) => {
      dispatch(reduxSesion.setCurrentUser(user));
    },
    [dispatch]
  );
  return callBack;
}
