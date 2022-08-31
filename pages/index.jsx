import * as React from 'react';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Send from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ref, set, push, onValue } from 'firebase/database';
import { onAuthStateChanged } from "firebase/auth";
import Layout from './components/layout';
import Link from '../src/Link';
import { db, auth } from '../src/initFirebaseClientSDK';

export default function Index() {
  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/;
  const [user, setUser] = React.useState(null);
  const [url, setUrl] = React.useState('http://url.com');
  const [urls, setUrls] = React.useState([]); 
  const [tagsInDb, setTagsInDb] = React.useState([]); 
  const [urlsInDb, setUrlsInDb] = React.useState([]); 
  
  const urlListRef = ref(db, 'urls');
  const tagListRef = ref(db, 'tags');
  
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        onValue(tagListRef, (snapshot) => {
          const data = Object.values(snapshot.val());
          setTagsInDb(data.map(k => {
            if (k['email'] == user.email) {
              return k['tag'];
            }
          }));
        });
        onValue(urlListRef, (snapshot) => {
          const data = Object.values(snapshot.val());
          setUrlsInDb(data.map(k => {
            if (k['email'] == user.email) {
              return k['url'];
            }
          }));
        });
      } else {
        setUser(null);
      }
    });
  }, [user, url]);
  
  // TODO: SEND delete request ONCLICK of undo button
  const urlItems = urls.map(url =>
      <Alert 
        key={url}
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        Added {url}
      </Alert>
  )

  const handleEnter = (event) => {
    if (event.key == "Enter") {
      handleSubmit(event);
    }
  }
  
  const writeNewUrl = (url, tags) => {
    if (!urlsInDb.includes(url)) {
      const newUrlRef = push(urlListRef);
      set(newUrlRef, {
        "url": url,
        "email": user.email,
        "tags": tags
      });
    }

    for (const tag of tags) {
      if (!tagsInDb.includes(tag)) {
        const newTagRef = push(tagListRef);
        set(newTagRef, {
          "tag": tag,
          "email": user.email
        });
      };
    }
  }

  const handleSubmit = (event) => {
    const val = event.target.value.split(" ");
    const inputUrl = val[0];
    const inputTags = val.slice(1);

    setUrl(inputUrl);
    if (validUrl.test(inputUrl)) {
      if (!urls.includes(inputUrl)) {
        setUrls(urls.concat(inputUrl));
        writeNewUrl(inputUrl, inputTags);
      }
      event.target.value = '';
    }
  }

  return (
    <Layout home>
      <Head>
        <title>Home</title>
      </Head>
      <Box align="center" sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home
        </Typography>

        <TextField 
          id="url"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton><Send /></IconButton>
              </InputAdornment>
            )
          }}
          error={ !validUrl.test(url) && Boolean(url)}
          helperText={!validUrl.test(url) && Boolean(url) ? "URL is not correct" : ""}
          onBlur={handleSubmit}
          onKeyPress={handleEnter}
          variant="standard"
          size="medium" 
          type="url"
          label="URL + Tags (Space separated)"
          placeholder='http://github.com tag-1 next-js tag-3' 
          fullWidth 
        />
      </Box>

      <Stack sx={{ width: '100%' }} spacing={1}>
          { urlItems }
      </Stack>

      <Box align="center" sx={{ my: 4 }}>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
      </Box>
    </Layout>
  );
}
