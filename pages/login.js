import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { authenticateUser } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { getFavourites } from '@/lib/userData';

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');
    const router = useRouter();
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    async function updateAtom() {
        setFavouritesList(await getFavourites());
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await authenticateUser(user, password);
            await updateAtom();
            router.push('/');
        } catch (err) {
            setWarning(err.message);
        }
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h2>Login</h2>
                    <p>Enter your login information below:</p>
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
                        <Button variant="primary" type="submit">Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
