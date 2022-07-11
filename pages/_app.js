import { useState, useEffect } from 'react';

import '../styles/globals.scss';
import '../styles/reviews.scss';
import Layout from '../components/Layout/Layout';

import AppContext from '../AppContext';

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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>

  )


}

export default MyApp
