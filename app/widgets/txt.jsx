import React from "react";
import PropTypes from "prop-types";

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
  children: PropTypes.array,
  tint: PropTypes.string.isRequired
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

Bold.propTypes = {
  children: PropTypes.array
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

Underline.propTypes = {
  children: PropTypes.array
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

Uppercase.propTypes = {
  children: PropTypes.array
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

CursorPointer.propTypes = {
  children: PropTypes.array
};

