import { OverviewCardProps } from '../../../../types/valorant';
import styles from './OverviewCard.module.scss';

export default function OverviewCard({ 
  icon, 
  label, 
  value, 
  subtitle, 
  className = '' 
}: OverviewCardProps) {
  return (
    <div className={`${styles.overviewCard} ${className}`}>
      <div className={styles.iconContainer}>
        {icon}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.label}>{label}</h3>
        <div className={styles.value}>{value}</div>
        {subtitle && (
          <p className={styles.subtitle}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}
