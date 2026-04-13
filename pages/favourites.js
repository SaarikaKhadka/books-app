import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import { Card, Row, Col } from 'react-bootstrap';

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    if (!favouritesList) return null;

    return (
        <>
            <PageHeader text="My Favourites" />
            {favouritesList.length === 0 ? (
                <p>Nothing Here</p>
            ) : (
                <Row className="gy-4">
                    {favouritesList.map((workId) => (
                        <Col key={workId} xs={12} sm={6} md={4} lg={3}>
                            <Card>
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>
                                        {workId}
                                    </Card.Title>
                                    <Link href={`/works/${workId}`} className="btn btn-sm btn-outline-primary">
                                        View Details
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}
