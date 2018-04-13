import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ title, image, children, className, link, ...props }) => {
	if (image && title) {
		return (
			<div className={className ? className + " card" : "card"} {...props}>
				{
					link ? <Link to={link}><div className="card-image" style={{ backgroundImage: "url(" + image + ")" }} /></Link> :
						<div className="card-image" style={{ backgroundImage: "url(" + image + ")" }} />
				}
				{
					link ? <div className="card-title"><Link to={link}>{title}</Link></div> :
						<div className="card-title">{title}</div>
				}
				<div className="card-body">{children}</div>
			</div>
		)
	}
	else if (title) {
		return (
			<div className={className ? className + " card" : "card"} {...props}>
				{
					link ? <div className="card-title"><Link to={link}>{title}</Link></div> :
						<div className="card-title">{title}</div>
				}
				<div className="card-body">{children}</div>
			</div>
		)
	}
	else {
		return (
			<div className={className ? className + " card" : "card"} {...props}>
				{
					link ? <Link to={link}><div className="card-body">{children}</div></Link> :
						<div className="card-body">{children}</div>
				}
			</div>
		)
	}

};
Card.propTypes = {
	title: PropTypes.node,
	image: PropTypes.string,
	link: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.any
};

export default Card;
