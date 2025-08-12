'use client';

import { useEffect, useState } from "react";
import Hero from "./sections/Hero";
import ProgressSection from "./sections/ProgressSection";
import styles from "./page.module.scss";

export default function Progress() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <>
      {/* HERO SECTION */}
      <Hero />

      {/* PROGRESS SECTION */}
      <ProgressSection />
    </>
)

}