import { Html, Head, Main, NextScript } from 'next/document'
import InitialLoader from '../loaders/InitialLoader'
import styles from '../utils/initialLoader'

export default function Document() {
    return (
        <Html lang='en'>
            <Head> 
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap" crossOrigin="anonymous" rel="stylesheet"/>
                <style>
                    {styles}
                </style>
            </Head>
            <body> 
                <InitialLoader/>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}