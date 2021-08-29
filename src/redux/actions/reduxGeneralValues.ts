import { HomeCurrentScreen } from "../../types/HomeCurrentScreen";

const setTotalHeight = (totalHeight: number) => (dispatch: any) => {
  dispatch({
    type: "setTotalHeight",
    payload: totalHeight,
  });
};

const setTheme = (themeNum: number) => (dispatch: any) => {
  dispatch({
    type: "setTheme",
    payload: themeNum,
  });
};

const setLanguage = (language: string) => (dispatch: any) => {
  dispatch({
    type: "setLanguage",
    payload: language,
  });
};

const setHomeNavigation =
  (screen: HomeCurrentScreen, parms: any) => (dispatch: any) => {
    dispatch({
      type: "setHomeNavigation",
      payload: { screen: screen, parms: parms },
    });
  };

export const reduxGeneralValues = {
  setTotalHeight,
  setTheme,
  setLanguage,
  setHomeNavigation,
};
