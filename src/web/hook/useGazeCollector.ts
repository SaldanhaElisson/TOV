import { useEffect, useRef } from "react";
import { GazePoint } from "@/web/types";

export const useGazeCollector = (webgazer: any, currentIndex: number) => {
    const gazeDataRef = useRef<GazePoint[]>([]);

    useEffect(() => {
        gazeDataRef.current = [];
        const gazeListener = (data: any, elapsedTime: number) => {

            if (data == null) return;

            if (webgazer.util && webgazer.util.bound) {
                webgazer.util.bound(data);
            }

            const typedData = data as { x: number, y: number, t: number };

            gazeDataRef.current.push({
                x: typedData.x,
                y: typedData.y,
                timestamp: Date.now(),
                elapsedTime: elapsedTime,
            });
        };

        webgazer.setGazeListener(gazeListener);

        return () => {
            webgazer.clearGazeListener();
        };
    }, [webgazer, currentIndex]);

    return gazeDataRef;
};