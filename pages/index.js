import styles from '../styles/Home/Home.module.scss';
import Landing, { scrollToElement } from '../components/Home/01_Landing';
import USP from '../components/Home/02_USP';
import Statistics from '../components/Home/03_Statistics';
import Courses from '../components/Home/04_Courses';
import Reviews from '../components/Home/05_Reviews';
import { useEffect, useContext } from 'react';
import AppContext from '../AppContext';

export default function Home() {
  const value = useContext(AppContext);
  let { setBgColor } = value;

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let { section } = params
    if (section == "courses") {
      scrollToElement("#home-courses-container")
    }
    setBgColor("#FFFDFD")
  }, [])

  return (
    <div id="home-container" className={styles.container}>
      <Landing />
      <USP />
      <Statistics />
      <Courses />
      <Reviews />
    </div>
  )
}
