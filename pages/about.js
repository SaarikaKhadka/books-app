import Link from 'next/link';
import { Card } from 'react-bootstrap';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export default function About(props) {
  return (
    <>
      <PageHeader text="About the Developer: Saarika Khadka" />
      <Card>
        <Card.Body>
          <p>
            Hi! I'm Saarika Khadka, a web development student passionate about building modern web applications.
            This project showcases my skills in Next.js, React, and working with external APIs.
          </p>
          <p>
            One of my favorite books is "The Colour of Magic" by Terry Pratchett. It's the first book in the Discworld series,
            which combines fantasy and humor in a unique way. The story follows Rincewind, a failed wizard, and Twoflower,
            the Disc's first tourist, on their chaotic adventures through the fantastical Discworld.
          </p>
        </Card.Body>
      </Card>
      <br />
      <BookDetails book={props.book} />
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch('https://openlibrary.org/works/OL453657W.json');
  const data = await response.json();

  return {
    props: {
      book: data
    }
  };
}
