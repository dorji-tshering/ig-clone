import '../styles/globals.css'
import '../styles/cssgram.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import RouteLoader from '../loaders/RouteLoader'
import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout: (page: ReactElement<any, string | JSXElementConstructor<any>>) => ReactElement<any, string | JSXElementConstructor<any>>
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const [routeChanging, setRouteChanging] = useState(false)
    const router = useRouter()

    // get layout of page if it exists, else return the page
    const getLayout = Component.getLayout ?? ((page) => page)

    // remove the initial loader after page is hydrated
    useEffect(() => {
        const loader = document.getElementById('initial-loader')
        loader?.remove()
    },[])

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setRouteChanging(true)
        }
    
        const handleRouteChangeEnd = () => {
            setRouteChanging(false)
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
        <>
            <SessionProvider session={pageProps.session}>
                <RecoilRoot>
                    <Head>
                        <title>InstaClone</title>
                        <link rel="icon" href="/images/insta-mobile-logo.png" />
                        <meta name="robots" content="noindex"/>
                    </Head>
                    {routeChanging && <RouteLoader />}
                    <Layout>
                        { getLayout(<Component {...pageProps} />) }
                    </Layout>
                </RecoilRoot>
            </SessionProvider>
        </>
    )
}

export default MyApp
