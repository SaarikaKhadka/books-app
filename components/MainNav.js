import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { readToken, removeToken } from '@/lib/authenticate';
import { useRouter } from 'next/router';

export default function MainNav() {
    const router = useRouter();
    const token = readToken();

    function logout() {
        removeToken();
        router.push('/login');
    }

    return (
        <>
            <Navbar className="fixed-top navbar-dark bg-dark" expand="lg">
                <Container>
                    <Navbar.Brand>Saarika Khadka</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} href="/">Books</Nav.Link>
                            <Nav.Link as={Link} href="/about">About</Nav.Link>
                        </Nav>
                        {token && (
                            <Nav>
                                <NavDropdown title={token.userName} id="nav-dropdown">
                                    <NavDropdown.Item as={Link} href="/favourites">Favourites</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        )}
                        {!token && (
                            <Nav>
                                <Nav.Link as={Link} href="/register">Register</Nav.Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}
