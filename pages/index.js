/*********************************************************************************
*  WEB422 – Assignment 3
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Saarika Khadka Student ID: 162656235 Date: 2026/04/09
*
*  Vercel App (Deployed) Link: ___________________________________________________
********************************************************************************/

import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Pagination, Table } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const router = useRouter();

  const author = 'Terry Pratchett';

  const { data } = useSWR(`https://openlibrary.org/search.json?author=${encodeURIComponent(author)}&page=${page}&limit=10`);

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  function previous() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function next() {
    setPage(page + 1);
  }

  return (
    <>
      <PageHeader text={`Novels by ${author}`} />
      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {pageData.docs && pageData.docs.map((book) => (
            <tr key={book.key} onClick={() => router.push(book.key)}>
              <td>{book.title}</td>
              <td>{book.first_publish_year || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
