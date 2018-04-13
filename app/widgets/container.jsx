import React from "react";
import PropTypes from "prop-types";

const Container = ({ children, xs, sm, md, lg, xl, className, ...props }) => (
	<div {...props}>
		<div className={className ? className + " container" : "container"}>
			<style jsx>
				{`
					.container {
						margin-right: auto;
						margin-left: auto;
						width: 100%;
						${xs ? `max-width: ${xs}px;` : ""};
					}
					@media (min-width: 576px) {
						.container {
							max-width: ${sm || xs || 560}px;

						}
					}
					@media (min-width: 768px) {
						.container {
							max-width: ${md || sm || xs || 750}px;
						}
					}
					@media (min-width: 992px) {
						.container {
							max-width: ${lg || md || sm || xs || 920}px;
						}
					}
					@media (min-width: 1200px) {
						.container {
							max-width: ${xl || lg || md || sm || xs || 980}px;
						}
					}
				`}
			</style>
			{children}
		</div>
	</div>
);
Container.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
	xs: PropTypes.number,
	sm: PropTypes.number,
	md: PropTypes.number,
	lg: PropTypes.number,
	xl: PropTypes.number
};

export default Container;
