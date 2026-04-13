import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import { Provider } from 'jotai';
import RouteGuard from '@/components/RouteGuard';

const fetcher = async (...args) => {
  const response = await fetch(...args);

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return response.json();
};

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </Layout>
      </SWRConfig>
    </Provider>
  );
}
