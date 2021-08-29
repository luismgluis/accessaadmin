import React, { useEffect, useLayoutEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import Api from "../../../api/Api";
import UserType from "../../../types/UserType";
import { useCurrentUser, useSetCurrentUser } from "../../hooks/currentUser";
const TAG = "PRIVATE ROUTE";
type PrivateRouteProps = {
  component: React.FC<any>;
  path?: string;
};
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  path,
}) => {
  const history = useHistory();
  const me = useCurrentUser();
  const setMe = useSetCurrentUser();

  useEffect(() => {
    console.log(TAG, "mememe");
    if (me.isEmpty()) {
      Api.app.getCurrentUser((user) => {
        if (!user) {
          history.push("/login");
          return;
        }
        const uid = user?.uid;
        if (uid)
          Api.database.user
            .getUser(uid)
            .then((user) => {
              if (!user.isEmpty()) {
                setMe(user);
                return;
              }
              history.push("/login");
            })
            .catch((err) => {
              history.push("/login");
            });
      });
      return;
    }
  }, [me, setMe, history]);

  return <>{!me.isEmpty() && <Component />}</>;

  // return (
  //   <>
  //     {token !== null && (
  //       <Route
  //         path={path}
  //         exact={true}
  //         render={(props) =>
  //           token ? (
  //             <Component {...props} />
  //           ) : (
  //             <Redirect
  //               to={{ pathname: "/login", state: { from: props.location } }}
  //             />
  //           )
  //         }
  //       ></Route>
  //     )}
  //   </>
  // );
};
export default PrivateRoute;
