import React from "react";
import PropTypes from "prop-types";

const Card = ({ title, image, children, className, ...props }) => {
	if (image && title) {
		return (
			<div className={className ? className + " card" : "card"} {...props}>
				<div className="card-image" style={{backgroundImage: "url(" + image + ")"}} />
				<div className="card-title">{title}</div>
				<div className="card-body">{children}</div>
			</div>
		)
	}
	else if (title) {
		return (
			<div className={className ? className + " card" : "card"} {...props}>
				{title ? <div className="card-title">{title}</div> : null}
				<div className="card-body">{children}</div>
			</div>
		)
	}
	else {
		return (
			<div className={className ? className + " card" : "card"} {...props}>
				<div className="card-body">{children}</div>
			</div>
		)
	}

};
Card.propTypes = {
	title: PropTypes.node,
	image: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.any
};

export default Card;
