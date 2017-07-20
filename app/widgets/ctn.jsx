import React, { Component } from "react";

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
  max: React.PropTypes.string.isRequired
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
  padding: React.PropTypes.string,
  flexClass: React.PropTypes.string,
  bgTint: React.PropTypes.string
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
  max: React.PropTypes.string.isRequired,
  bgTint: React.PropTypes.string
};
