import React from "react";
import PropTypes from "prop-types";

const cardStyle = `
.card {
	max-width: 100%;
	border-radius: 4px;
	border: #e6e6e6 1px solid;
	margin-bottom: 10px;
	background-color: white;
}

.card .card-image {
	width: 100%;
	height: 100px;
	background-size: cover;
}
.card .card-title {
	border-bottom: #e6e6e6 1px solid;
	font-weight: bold;
	padding: 10px;
}
.card .card-body {
	padding: 15px 10px;
	font-size: 13px;
}
`;

const Card = ({ title, image, children, className, ...props }) => {
	if (image && title) {
		console.log({backgroundImage: image})
		return (
			<div className={className ? className + " card" : "card"} {...props}>
				<style jsx> {cardStyle} </style>
				<div className="card-image" style={{backgroundImage: "url(" + image + ")"}} />
				<div className="card-title">{title}</div>
				<div className="card-body">{children}</div>
			</div>
		)
	}
	else if (title) {
		return (
			<div className={className ? className + " card" : "card"} {...props}>
				<style jsx> {cardStyle} </style>
				{title ? <div className="card-title">{title}</div> : null}
				<div className="card-body">{children}</div>
			</div>
		)
	}
	else {
		return (
			<div className={className ? className + " card" : "card"} {...props}>
				<style jsx> {cardStyle} </style>
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
