import { useEffect } from 'react';

const DEFAULT_TIME_LIMIT_MS = 10000;

interface UseTimeAdvanceProps {
    isFreeTime: boolean;
    onCaptureData: () => void;
    currentIndex: number;
    timeLimitMs?: number;

}

export const useTimeAdvance = ({

    isFreeTime,
    onCaptureData,
    currentIndex,
    timeLimitMs = DEFAULT_TIME_LIMIT_MS,
}: UseTimeAdvanceProps) => {

    useEffect(() => {
        if (isFreeTime) {
            return;
        }

        const timerId = setTimeout(() => {

            onCaptureData();

        }, timeLimitMs);


        return () => {
            clearTimeout(timerId);
        };

    }, [
        isFreeTime,
        onCaptureData,
        currentIndex,
        timeLimitMs
    ]);
};