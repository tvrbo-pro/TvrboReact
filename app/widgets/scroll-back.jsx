import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@withRouter
class ScrollBack extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        children: PropTypes.object.isRequired
    }
    constructor(props){
        super(props);

        this.tops = {};
    }

    componentDidUpdate(prevProps) {
        // if the route changes
        if (this.props.location !== prevProps.location) {
            // store the current route's position
            this.tops[prevProps.location.pathname] = [ window.scrollX, window.scrollY ];

            // recover the new route's position if already stored
            if(this.tops[this.props.location.pathname]) { // already stored
                window.scrollTo(this.tops[this.props.location.pathname][0] || 0, this.tops[this.props.location.pathname][1] || 0);
            }
            else { // first time
                window.scrollTo(0, 0);
            }
        }
    }

    render() {
        return this.props.children
    }
}

export default ScrollBack
