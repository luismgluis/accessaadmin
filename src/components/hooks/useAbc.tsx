import { useState } from "react";
import { useSelector } from "react-redux";
import lenguages from "../../languages/lenguages";
type LanguageType = typeof lenguages.spanish;

export function useAbc() {
  const [abc, setAbc] = useState<LanguageType>(lenguages.spanish);

  useSelector((store: any) => {
    try {
      const lng = store.reducerGeneralValues.language;
      if (typeof lng !== "undefined") {
        if (lng !== null) {
          setAbc(lng);
        }
      }
      return lng;
    } catch (error) {}
    return 0;
  });

  return abc;
}
