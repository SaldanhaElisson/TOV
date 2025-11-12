import { useKeyboardAdvance } from "./useKeyboardAdvance";
import { useTimeAdvance } from "./useTimeAdvance";

interface UseTrialAdvanceProps {
    isFreeTime: boolean;
    onCaptureData: () => void;
    currentIndex: number;
    timeLimitMs?: number;
}

export const useStrategyNavigation = ({
    isFreeTime,
    onCaptureData,
    currentIndex,
    timeLimitMs,
}: UseTrialAdvanceProps) => {

    console.log("é livre", isFreeTime)

    if (isFreeTime) {
        useKeyboardAdvance('Space', onCaptureData);
    }


    if (!isFreeTime) {
        useTimeAdvance({
            isFreeTime: isFreeTime,
            onCaptureData,
            currentIndex: currentIndex,
            timeLimitMs: timeLimitMs,
        });
    }

};