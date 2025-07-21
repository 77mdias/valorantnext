import { redirect } from 'next/navigation';

import stylesHero from './components/scss/Hero.module.scss';
import styles from './page.module.scss';

import { createClient } from '@/src/lib/supabase/server';
import yoru from '@/public/yoru.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


export default async function ProtectedPage() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getClaims();
	if (error || !data?.claims) {
		redirect('/auth/login');
	}

	return (
		<>
			<section className={`${stylesHero.hero}`} style={{ backgroundImage: `url(${yoru.src})` }}>
				<div className={`${stylesHero.heroContent}`}>
					<h1>Domine a Função Dueslita</h1>
					<p>Aprenda técnicas avançadas com a melhor comunidade de Valorant</p>
					<button className={`${stylesHero.heroButton}`}>
						Assistir Agora <FontAwesomeIcon icon={faPlay} />
					</button>
				</div>
			</section>
			<section className={`${styles.lessonsGrid}`}>
				<h2>Aulas Recomendadas</h2>

				<div className={`${styles.carouselContainer}`}>
					<button className={`${styles.carouselButton}`} id="prevBtn">
						<FontAwesomeIcon icon={faChevronLeft} />
					</button>
					<div className={`${styles.carouselCards}`} id="cardsCarousel">
						<div className={`${styles.cardsWrapper}`}>
							
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
