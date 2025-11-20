'use client';
import styles from '@/app/ui/sites.module.css';
import { useState, useRef } from 'react';
export function Timer() {
    const [milliseconds, setMilliseconds] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);

    const start = () => {
        if (intervalRef.current) return; // already running

        setRunning(true);
        intervalRef.current = setInterval(() => {
            setMilliseconds(x => x + 1);
        }, 10);
    };

    const stop = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setRunning(false);
    };

    const reset = () => {
        stop();
        setMilliseconds(0);
    };

    return (
        <div className="stopwatch">
            <div className="timer-display">{milliseconds/100}</div>
            <div className="timer-buttons">
                <button className={styles.main_button} onClick={start} disabled={running}>Start</button>
                <button className={styles.main_button} onClick={stop} disabled={!running}>Stop</button>
                <button className={styles.main_button} onClick={reset} disabled={milliseconds === 0 && !running}>Reset</button>
            </div>
        </div>
    );
}