import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Track from './Track'
import {Container, Row, Col } from "react-bootstrap";

function App() {
    return (
        <body>
        <Container>
            <Row className="justify-content-sm-center">
                <Col md="auto">
                    <Track/>
                </Col>
            </Row>
        </Container>
        </body>

    );
}

export default App;

