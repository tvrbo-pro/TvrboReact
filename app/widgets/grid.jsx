import React from "react";
import PropTypes from "prop-types";

export const Row = ({ children, className, start,
    center,
    end,
    top,
    middle,
    bottom,
    around,
    between, reverse, ...props }) => {
    const extraClassNames = (className || "").split(" ");
    extraClassNames.push("row");

    if (start) extraClassNames.push("start-" + start);
    if (center) extraClassNames.push("center-" + center);
    if (end) extraClassNames.push("end-" + end);
    if (top) extraClassNames.push("top-" + top);
    if (middle) extraClassNames.push("middle-" + middle);
    if (bottom) extraClassNames.push("bottom-" + bottom);
    if (around) extraClassNames.push("around-" + around);
    if (between) extraClassNames.push("between-" + between);

    if (reverse) extraClassNames.push("reverse");

    return (
        <div className={extraClassNames.join(" ")} {...props}>
            {children}
        </div>
    )
};
Row.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    start: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
    center: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
    end: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
    top: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
    middle: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
    bottom: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
    around: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
    between: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
    reverse: PropTypes.bool
};

export const Col = ({ children, className = "col-xs", xs = 12, sm, md, lg, offset,
    first,
    last, ...props }) => {
    const extraClassNames = (className || "").split(" ");
    if (xs) extraClassNames.push("col-xs-" + xs);
    if (sm) extraClassNames.push("col-sm-" + sm);
    if (md) extraClassNames.push("col-md-" + md);
    if (lg) extraClassNames.push("col-lg-" + lg);

    if (offset) {
        if (offset.xs) extraClassNames.push("col-xs-offset-" + offset.xs);
        if (offset.sm) extraClassNames.push("col-sm-offset-" + offset.sm);
        if (offset.md) extraClassNames.push("col-md-offset-" + offset.md);
        if (offset.lg) extraClassNames.push("col-lg-offset-" + offset.lg);
    }
    if (first) extraClassNames.push("first-" + first);
    if (last) extraClassNames.push("last-" + last);

    return (
        <div className={extraClassNames.join(" ")} {...props}>
            {children}
        </div>
    )
};
Col.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    offset: PropTypes.shape({ xs: PropTypes.number, sm: PropTypes.number, md: PropTypes.number, lg: PropTypes.number }),
    first: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
    last: PropTypes.oneOf(["xs", "sm", "md", "lg"])
};

