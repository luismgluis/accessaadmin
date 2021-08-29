import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useWindowSize } from "@react-hook/window-size/throttled";
import utils from "../../libs/utils/utils";

const TAG = "USE WINDOW RESIZE";

export function useWindowSizeOLD(enabled: boolean = false) {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  const initialMount = useRef(true);
  const counter = useRef(0);
  // useEffect(() => {
  //   // Handler to call on window resize
  //   function handleResize() {
  //     // Set window width/height to state
  //     setSize([window.innerWidth, window.innerHeight]);
  //   }
  //   // Add event listener
  //   if (enabled) window.addEventListener("resize", handleResize);
  //   // Call handler right away so state gets updated with initial window size
  //   handleResize();
  //   // Remove event listener on cleanup
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []); // Empty array ensures that effect is only run on mount

  useLayoutEffect(() => {
    if (!initialMount.current) {
      return;
    }
    function updateSize() {
      counter.current++;
      const copy = counter.current;
      setTimeout(() => {
        if (copy !== counter.current) return;
        counter.current++;
        setSize([window.innerWidth, window.innerHeight]);
      }, 150);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    initialMount.current = false;
    return () => {
      initialMount.current = true;
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  return size;
}

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl";
export function useScreenSize(enabled: boolean = false) {
  const [size, setSize] = useState<ScreenSize>("xs");

  const [winX, winY] = useWindowSize(); //enabled);
  const [winSize, setWinSize] = useState({ x: 0, y: 0 });
  const winSizeRef = useRef({ x: 0, y: 0 });
  // console.log(TAG, winX);
  useEffect(() => {
    const winss = winSizeRef.current;
    if (!enabled) return;
    if (winX !== winss.x) {
      winSizeRef.current.x = winX;
      if (winSize.x !== winX) {
        setWinSize({ ...winSize, x: winX });
        return;
      }
    }
    if (winY !== winss.y) {
      winSizeRef.current.y = winY;
      if (winSize.y !== winY) {
        setWinSize({ ...winSize, y: winY });
        return;
      }
    }
  }, [winY, winX, winSize, enabled]);

  type responseType = {
    size: ScreenSize;
    winX: number;
    winY: number;
    maxSize: (size: ScreenSize) => boolean;
    minSize: (size: ScreenSize) => boolean;
  };

  useEffect(() => {
    // return;
    if (winX < 576) {
      if (size !== "xs") setSize("xs");
    } else if (winX < 768) {
      if (size !== "sm") setSize("sm");
    } else if (winX < 960) {
      if (size !== "md") setSize("md");
    } else if (winX < 1140) {
      if (size !== "lg") setSize("lg");
    } else if (winX >= 1140) {
      if (size !== "xl") setSize("xl");
    }
  }, [winX, size]);

  const maxSize = useCallback(
    (mySize: ScreenSize) => {
      if (winX > 576 && mySize === "xs") {
        return false;
      }
      if (winX > 768 && mySize === "sm") {
        return false;
      }

      if (winX > 960 && mySize === "md") {
        return false;
      }

      if (winX > 1140 && mySize === "lg") {
        return false;
      }

      if (winX > 1140 && mySize === "xl") {
        return true;
      }

      return true;
    },
    [winX]
  );

  const minSize = useCallback(
    (mySize: ScreenSize) => {
      if (winX > 0 && mySize === "xs") {
        return true;
      } //576 768 960 1140

      if (winX > 576 && mySize === "sm") {
        return true;
      }

      if (winX > 768 && mySize === "md") {
        return true;
      }

      if (winX > 960 && mySize === "lg") {
        return true;
      }

      if (winX > 1140 && mySize === "xl") {
        return true;
      }

      return false;
    },
    [winX]
  );

  const [response, setResponse] = useState<responseType>({
    size: "xs",
    winX: 0,
    winY: 0,
    maxSize,
    minSize,
  });

  useEffect(() => {
    const newResponse = {
      size,
      winX: winSize.x,
      winY: winSize.y,
      maxSize,
      minSize,
    };
    if (utils.objects.hasDiferences(response, newResponse)) {
      // console.log(TAG, "has diferences");
      setResponse(newResponse);
    }
  }, [size, winSize, maxSize, response, minSize]);
  // console.log(TAG, "response", response.size);
  return response;
}
