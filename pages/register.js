import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { registerUser } from '@/lib/authenticate';

export default function Register() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [warning, setWarning] = useState('');
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await registerUser(user, password, password2);
            router.push('/login');
        } catch (err) {
            setWarning(err.message);
        }
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h2>Register</h2>
                    <p>Register for an account:</p>
                    {warning && <Alert variant="danger">{warning}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>User:</Form.Label>
                            <Form.Control
                                type="text"
                                value={user}
                                id="userName"
                                name="userName"
                                onChange={(e) => setUser(e.target.value)}
                                placeholder="Enter username"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password2}
                                id="password2"
                                name="password2"
                                onChange={(e) => setPassword2(e.target.value)}
                                placeholder="Confirm password"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Register</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
