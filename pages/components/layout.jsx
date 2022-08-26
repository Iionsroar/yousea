import Head from 'next/head';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ProTip from '../../src/ProTip';
import Link from '../../src/Link';
import Copyright from '../../src/Copyright';
import MenuAppBar from './appBar';

export const siteTitle = 'Yousea';

export default function Layout({ children, home }) {
    return (
        <Container maxWidth="sm">
            <Head>
                <meta
                    name="description"
                    content="Expore your world in seas??"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle,
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />

            </Head>
            <MenuAppBar />
            <main>{children}</main> 
            {!home && (
                <div align="center">
                    <Button variant="contained" component={Link} noLinkStyle href="/">
                        Go to the main page
                    </Button>
                </div>
            )}
            <Container>
                <ProTip />
                <Copyright />
            </Container>
        </Container>
    );
}