import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    const [state, setState] = useState({
        isRouteChanging: false,
        loadingKey: 0,
    })

    const router = useRouter();

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setState((prevState) => ({
                ...prevState,
                isRouteChanging: true,
                loadingKey: prevState.loadingKey ^ 1,
            }))
        }
    
        const handleRouteChangeEnd = () => {
            setState((prevState) => ({
                ...prevState,
                isRouteChanging: false,
            }))
        }
    
        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeEnd);
        router.events.on('routeChangeError', handleRouteChangeEnd);
    
        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeEnd);
            router.events.off('routeChangeError', handleRouteChangeEnd);
        }
      }, [router.events])

    return (
        <SessionProvider session={pageProps.session}>
            <RecoilRoot>
                <Loader isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </RecoilRoot>
        </SessionProvider>
    )
}

export default MyApp
