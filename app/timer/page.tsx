import styles from '@/app/ui/sites.module.css';
import {Timer} from '@/app/ui/timer/Buttons';
export default function Home() {
  return (
    <div>
      <h2 className={styles.main_h2}>Timer</h2>
      <p>  
          <Timer />
      </p>
    </div>
  );
}