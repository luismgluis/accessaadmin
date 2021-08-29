import { useCallback, useMemo } from "react";
import { useAlert } from "react-alert";

export function useCustomAlert() {
  const alert = useAlert();

  const info = useCallback(
    (text: string, title: string = "", timeOut = 5000) => {
      const data = {
        text,
        title,
      };
      alert.info(JSON.stringify(data), {
        timeout: timeOut, // custom timeout just for this one alert
        onOpen: () => {
          console.log("hey");
        }, // callback that will be executed after this alert open
        onClose: () => {
          console.log("closed");
        }, // callback that will be executed after this alert is removed
      });
    },
    [alert]
  );
  const error = useCallback(
    (text: string, descrip: string = "") => {
      if (typeof descrip !== "string") {
        descrip = "";
      }
      const data = {
        text,
        title: descrip,
      };
      alert.error(JSON.stringify(data), {
        timeout: 3000, // custom timeout just for this one alert
        onOpen: () => {
          console.log("hey");
        }, // callback that will be executed after this alert open
        onClose: () => {
          console.log("closed");
        }, // callback that will be executed after this alert is removed
      });
    },
    [alert]
  );
  const success = useCallback(
    (text: string, title: string = "") => {
      const data = {
        text,
        title,
      };
      alert.success(JSON.stringify(data), {
        timeout: 2000, // custom timeout just for this one alert
        onOpen: () => {
          console.log("hey");
        }, // callback that will be executed after this alert open
        onClose: () => {
          console.log("closed");
        }, // callback that will be executed after this alert is removed
      });
    },
    [alert]
  );
  const loading = useCallback(
    (text: string, title: string = "") => {
      const data = {
        text,
        title,
      };
      const al = alert.info(JSON.stringify(data), {
        timeout: 60000, // custom timeout just for this one alert
        onOpen: () => {
          console.log("hey");
        }, // callback that will be executed after this alert open
        onClose: () => {
          console.log("closed");
        }, // callback that will be executed after this alert is removed
      });

      return () => {
        al.close();
      };
    },
    [alert]
  );
  // const [data] = useState({ info, error, success });
  const data = useMemo(() => {
    return { info, error, success, loading };
  }, [info, error, success, loading]);

  return data;
}
