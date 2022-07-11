import styles from '../styles/Home/Home.module.scss';
import Landing from '../components/Home/01_Landing';
import USP from '../components/Home/02_USP';
import Statistics from '../components/Home/03_Statistics';
import Courses from '../components/Home/04_Courses';
import Reviews from '../components/Home/05_Reviews';
import { useEffect, useContext } from 'react';
import AppContext from '../AppContext';

export default function Home() {
  const value = useContext(AppContext);
  let { bgColor } = value.state;
  let { setBgColor } = value;

  useEffect(() => {
    setBgColor("#FFFDFD")
  })
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
