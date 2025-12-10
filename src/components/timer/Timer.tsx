import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type TimerProps = {
    start?: boolean;
    seconds: number;
    onFinish?: () => void;
};

export const Timer: React.FC<TimerProps> = React.memo(
    ({ start, seconds, onFinish }) => {
        const [timeLeft, setTimeLeft] = useState(seconds);
        const startTimeRef = useRef<number>(0);

        // Устанавливаем стартовое время синхронно и безопасно
        useLayoutEffect(() => {
            if (start) {
                setTimeLeft(seconds);
                startTimeRef.current = performance.now();
            }
        }, [start, seconds]);

        useEffect(() => {
            if (!start) return;

            let frameId: number;

            const tick = (now: number) => {
                const elapsed = Math.floor((now - startTimeRef.current) / 1000);
                const remaining = seconds - elapsed;

                if (remaining <= 0) {
                    setTimeLeft(0);
                    onFinish?.();
                    cancelAnimationFrame(frameId);
                    return;
                }

                setTimeLeft(remaining);
                frameId = requestAnimationFrame(tick);
            };

            frameId = requestAnimationFrame(tick);

            return () => cancelAnimationFrame(frameId);
        }, [start, seconds, onFinish]);

        return <span>{timeLeft}s</span>;
    }
);
