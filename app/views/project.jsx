import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import Container from '../widgets/container';
import Card from '../widgets/card';
import { Row, Col } from "../widgets/grid";
import { capitalize } from "../lib/util";

@connect(({ entries }) => ({ entries }))
class Project extends Component {
    static propTypes = {
        entries: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    render() {
        const entry = this.props.entries.find(e => e._id == this.props.match.params.id);
        if (!entry) {
            this.props.history.replace("/not-found");
            return null;
        }

        return (
            <Container id="project">
                <h2>{entry.name}</h2>
                <Row>
                    <Col sm={12} md={8}>
                        <Card title="Readme.md">
                            <div dangerouslySetInnerHTML={{ __html: entry.content }} style={{ paddingLeft: 10, paddingRight: 10, overflowX: "scroll" }} />
                        </Card>
                    </Col>
                    <Col sm={12} md={4}>
                        <Card title="About">
                            <h4>Description</h4>
                            <p>{entry.description}</p>
                            <h4>Last updated</h4>
                            <p>{capitalize(entry.lastChange)}</p>
                            <h4>Recent activity</h4>
                            <img src={entry.image} style={{ maxHeight: 80, marginBottom: 10 }} />
                        </Card>
                    </Col>
                </Row>


            </Container>
        );
    }
}

export default Project;
