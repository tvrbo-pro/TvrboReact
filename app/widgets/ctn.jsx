import React from "react";
import PropTypes from "prop-types";

export const CtnMaxWidth = ({ children, max }) => {
  const styles = {
    width: "100%",
    maxWidth: max,
    margin: "0 auto"
  };
  return (
    <div style={styles}>
      {children}
    </div>
  );
};

CtnMaxWidth.propTypes = {
  children: PropTypes.array,
  max: PropTypes.string.isRequired
};

export const CtnViewport = ({ children, padding, flexClass, bgTint }) => {
  const styles = {
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: 0,
    left: 0,
    padding: padding,
    backgroundColor: bgTint ? bgTint : "transparent",
    zIndex: -1
  };
  return (
    <div style={styles} className={flexClass ? flexClass : ""}>
      {children}
    </div>
  );
};

CtnViewport.propTypes = {
  children: PropTypes.array,
  padding: PropTypes.string,
  flexClass: PropTypes.string,
  bgTint: PropTypes.string
};

export const CtnAbsoluteCenter = ({ children, max, bgTint }) => {
  const styles = {
    width: "100%",
    maxWidth: max,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: bgTint ? bgTint : "transparent"
  };
  return (
    <div style={styles}>
      {children}
    </div>
  );
};

CtnAbsoluteCenter.propTypes = {
  children: PropTypes.array,
  max: PropTypes.string.isRequired,
  bgTint: PropTypes.string
};
