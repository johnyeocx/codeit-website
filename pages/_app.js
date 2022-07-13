import { useState, useEffect } from 'react';

import '../styles/globals.scss';
import '../styles/reviews.scss';
import Layout from '../components/Layout/Layout';

import AppContext from '../AppContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState(null);
  const [bgColor, setBgColor] = useState("#FFFDFD")
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof (window) == undefined) return;

    setIsMobile(window.innerWidth < 950);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })
    setLoaded(true);

    const handleScreenResize = () => {
      setIsMobile(window.innerWidth < 950);
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleScreenResize);
    return () => {
      window.removeEventListener('resize', handleScreenResize);
    }
  }, [])

  if (!loaded) {
    return <div></div>;
  }

  return (
    <AppContext.Provider
      value={{
        state: {
          isMobile,
          bgColor,
          dimensions
        },
        setIsMobile: setIsMobile,
        setBgColor: setBgColor
      }}
    >
      <Head>
        <title>CodeIT Academy</title>
        <link rel="icon" href="/logo.png" />
        <div>Icon made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0</div>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>

  )


}

export default MyApp
