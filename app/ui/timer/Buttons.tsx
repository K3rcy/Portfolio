'use client';
import { useState, useRef } from 'react';
export function Timer() {
    const [milliseconds, setMilliseconds] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const start = () => {
        if (intervalRef.current) return; // already running

        setRunning(true);
        intervalRef.current = setInterval(() => {
            setMilliseconds(x => x + 1);
        }, 10);
    };

    const stop = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setRunning(false);
    };

    const reset = () => {
        stop();
        setMilliseconds(0);
    };

    return (
        <div>
            <div className="text-center my-4 text-[15px] sm:text-xl">{milliseconds/100}</div>
            <div className="flex gap-4 sm:gap-8 my-4">
                <button className={`flex-1 bg-violet-900 rounded-3xl h-12 sm:rounded-full sm:h-15`} onClick={start} disabled={running}>Start</button>
                <button className={`flex-1 bg-violet-900 rounded-3xl h-12 sm:rounded-full sm:h-15`} onClick={stop} disabled={!running}>Stop</button>
                <button className={`flex-1 bg-violet-900 rounded-3xl h-12 sm:rounded-full sm:h-15`} onClick={reset} disabled={milliseconds === 0 && !running}>Reset</button>
            </div>
        </div>
    );
}