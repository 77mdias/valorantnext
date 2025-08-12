'use client'

import Hero from "./sections/Hero";
import Grid from "./sections/Grid/Grid";
import Strategy from "./sections/Strategy";
import { useState, useEffect } from "react";
import styles from './page.module.scss'

export default function Functions() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 450);
  }, []);

  if (loading) {
		return (
			<div className={styles.loadingContainer}>
				<div className={styles.spinner}></div>
				<p>Carregando agentes...</p>
			</div>
		);
	}

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* GRID DE FUNÇÕES */}
      <Grid />

      {/* ESTRATÉGIAS */}
      <Strategy />
    </>
  )
}