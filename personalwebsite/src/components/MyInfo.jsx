import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import InfoPic from "./assets/infoPic.jpg"; // Replace with the actual path to your avatar
import Resume from "./assets/Resume_Alexander Chen.pdf"; // Replace with the actual path to your resume

function AboutMe() {
    return (
        <Container fluid className="py-5 bg-light">
            <Container>
                <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                    {/* Left Section - Image */}
                    <Col md={5} className="text-center mb-4 mb-md-0">
                        <img
                            src={InfoPic}
                            alt="Profile Avatar"
                            className="img-fluid rounded border"
                            style={{ maxWidth: "300px" }}
                        />
                    </Col>
                    {/* Right Section - Content */}
                    <Col md={7} className="text-center text-md-start">
                        <h2 className="fw-bold text-dark mb-4">About Me</h2>
                        <Row className="justify-content-center justify-content-md-start mb-4">
                            <Col xs={10} sm={6} lg={4}>
                                <Card className="bg-dark text-white text-center p-3">
                                    <Card.Body>
                                        <Card.Title className="fw-bold">Experience</Card.Title>
                                        <Card.Text>12 Month Internship</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={10} sm={6} lg={4}>
                                <Card className="bg-dark text-white text-center p-3">
                                    <Card.Body>
                                        <Card.Title className="fw-bold">Projects</Card.Title>
                                        <Card.Text>50+ Completed</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={10} sm={6} lg={4}>
                                <Card className="bg-dark text-white text-center p-3">
                                    <Card.Body>
                                        <Card.Title className="fw-bold">Volunteer</Card.Title>
                                        <Card.Text>10+ Completed</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <p>
                            Good to see you here! I’m Alexander Chen, but you can call me Alex. I’m an approachable
                            software engineer with a dream of transitioning into a teaching profession later in my career.
                            As a Pacific Islander who journeyed across the globe to Washington, I strive to bring cultural
                            diversity and a unique user perspective to the world of coding.
                        </p>
                        <p>
                            I’m a recent graduate who completed an incredible, exploratory adventure at Seattle
                            University, and I’m continuing my journey of honing my artistic touch in software development.
                            Let’s just say, who doesn’t love Agile workflows? I thrive in collaborative environments, so if
                            you’re someone who embraces this framework—hooray for the Agile league!
                        </p>
                        {/* Button to Open or Download Resume */}
                        <a href={Resume} download className="btn btn-primary mt-3">
                            <i className="bi bi-download"></i> Download CV
                        </a>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default AboutMe;