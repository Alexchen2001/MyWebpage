import avatar from './assets/avatar.jpg';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

function ProfileAvatar() {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4} className="text-center">
                    {/* Bootstrap utility classes to constrain size */}
                    <Image
                        src={avatar}
                        roundedCircle
                        className="img-fluid" // Makes the image responsive
                        style={{
                            width: '300px',
                            height: '300px',
                        }}
                        alt="Profile Avatar"
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default ProfileAvatar;