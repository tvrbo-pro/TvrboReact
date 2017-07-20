import React, { Component } from "react";

export const FontMegrim = ({ children, uppercase, sizeClass }) => {
  const styles = {
    fontFamily: "Megrim, cursive",
    textTransform: uppercase ? "uppercase" : "none"
  };
  return (
    <span style={styles} className={sizeClass}>
      {children}
    </span>
  );
};

FontMegrim.propTypes = {
  uppercase: React.PropTypes.bool
};

export const Color = ({ children, tint }) => {
  const styles = {
    color: tint
  };
  return (
    <span style={styles}>
      {children}
    </span>
  );
};

Color.propTypes = {
  tint: React.PropTypes.string.isRequired
};

export const Bold = ({ children }) => {
  const styles = {
    fontWeight: 700
  };
  return (
    <span style={styles}>
      {children}
    </span>
  );
};

export const Underline = ({ children }) => {
  const styles = {
    textDecoration: "underline"
  };
  return (
    <span style={styles}>
      {children}
    </span>
  );
};

export const Uppercase = ({ children }) => {
  const styles = {
    textTransform: "uppercase"
  };
  return (
    <span style={styles}>
      {children}
    </span>
  );
};

export const CursorPointer = ({ children }) => {
  const styles = {
    cursor: "pointer"
  };
  return (
    <span style={styles}>
      {children}
    </span>
  );
};

