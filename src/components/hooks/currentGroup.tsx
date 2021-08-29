import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import utils from "../../libs/utils/utils";
import { reduxSesion } from "../../redux/actions/reduxSesion";
import GroupType from "../../types/GroupType";

const TAG = "useCurrentGroup";
export function useCurrentGroup() {
  const [group, setgroup] = useState<GroupType>(new GroupType("", null));

  useSelector((store: any) => {
    try {
      const newgroup: GroupType = store.reducerSesion.currentGroup;
      if (!utils.objects.isEmpty(newgroup)) {
        if (!newgroup.isEmpty()) {
          if (group.id !== newgroup.id) {
            setgroup(new GroupType(newgroup.id, newgroup.exportToUpload()));
          }
        }
        return new GroupType(newgroup.id, newgroup);
      }
    } catch (error) {
      console.log(TAG, error);
    }
    return new GroupType("", null);
  });

  return group;
}

export function useSetCurrentGroup() {
  const dispatch = useDispatch();
  const callBack = useCallback(
    (group: GroupType) => {
      dispatch(reduxSesion.setCurrentGroup(group));
    },
    [dispatch]
  );
  return callBack;
}
