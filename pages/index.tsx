import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed';

const Home: NextPage = () => {

    return (
        <div className="mt-5 lg:mt-10">
            <Head>
                <title>Instagram 3.0</title>
                <meta name="description" content="Instagram clone homepage" />
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            <Feed/>
        </div>
    )
}

export default Home;
