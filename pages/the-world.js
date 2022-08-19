import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

export default function TheWorld() {
    return (
        <>
            <Head>
                <title>The World</title>
            </Head>
            <h1>The World</h1>
            <h2>
                <Link href="/">Back to Home</Link>
            </h2>
            <Image 
                src="https://pbs.twimg.com/media/FZAPioMaUAYfeK7?format=png&name=900x900" 
                alt="Test"
                width={250}
                height={350}
            ></Image>
        </>
    );
}