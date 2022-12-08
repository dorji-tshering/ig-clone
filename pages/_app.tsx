import '../styles/globals.css';
import '../styles/cssgram.css'
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react';
import { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout: (page: ReactElement<any, string | JSXElementConstructor<any>>) => ReactElement<any, string | JSXElementConstructor<any>>
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const [state, setState] = useState({
        isRouteChanging: false,
        loadingKey: 0,
    })

    // get layout of page if it exists, else return the page
    const getLayout = Component.getLayout ?? ((page) => page)

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
                        { getLayout(<Component {...pageProps} />) }
                    </Layout>
                </RecoilRoot>
            </SessionProvider>
        
    )
}

export default MyApp
