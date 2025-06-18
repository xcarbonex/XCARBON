import React, { useRef, useEffect } from "react";
import Scrollbar from "react-scrollbars-custom";
import { useTheme } from "../ThemeProvider";
import { useLocation } from "react-router-dom";

function ScrollBarWrapper({ children, width='100%', height='100%' }) {
  const { theme } = useTheme();
  const scrollbarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <Scrollbar
      ref={scrollbarRef}
      maximalThumbSize={200}
      removeTracksWhenNotUsed={true}
      mobileNative={true}
      style={{ width: width, height: height }}
      trackYProps={{
        renderer: ({ elementRef, style, ...restProps }) => (
          <span
            {...restProps}
            ref={elementRef}
            style={{
              ...style,
              width: "4px",
              right: "2px",
              backgroundColor: theme == "dark" ? "#262626" : "#e0e0e0",
              borderRadius: "50px",
            }}
          />
        ),
      }}
      thumbYProps={{
        renderer: ({ elementRef, style, ...restProps }) => (
          <div
            {...restProps}
            ref={elementRef}
            style={{
              ...style,
              backgroundColor: "#999",
              borderRadius: "50px",
              width: "4px",
            }}
          />
        ),
      }}
    >
      {children}
    </Scrollbar>
  );
}

export default ScrollBarWrapper;
