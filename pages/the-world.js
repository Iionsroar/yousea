import Link from 'next/link'

export default function TheWorld() {
    return (
        <>
            <h1>The World</h1>
            <h2>
                <Link href="/">Back to Home</Link>
            </h2>
        </>
    );
}