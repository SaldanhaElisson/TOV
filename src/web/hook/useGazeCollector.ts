import { useEffect, useRef } from "react";
import { GazePoint } from "@/web/types";
import { WebGazer, GazeData } from "./useWebgazer";

export const useGazeCollector = (webgazer: WebGazer, currentIndex: number) => {
    const gazeDataRef = useRef<GazePoint[]>([]);
    const smoothingBuffer = useRef<Array<{ x: number; y: number }>>([]);
    const BUFFER_SIZE = 7;

    useEffect(() => {
        gazeDataRef.current = [];
        smoothingBuffer.current = [];

        const gazeListener = (data: GazeData | null, elapsedTime: number) => {
            if (data == null) return;

            if (webgazer.util && webgazer.util.bound) {
                webgazer.util.bound(data);
            }

            // Add to smoothing buffer
            smoothingBuffer.current.push({ x: data.x, y: data.y });

            // Maintain buffer size
            if (smoothingBuffer.current.length > BUFFER_SIZE) {
                smoothingBuffer.current.shift();
            }

            // Calculate Average (Smoothing)
            const buffer = smoothingBuffer.current;
            const avgX = buffer.reduce((sum, p) => sum + p.x, 0) / buffer.length;
            const avgY = buffer.reduce((sum, p) => sum + p.y, 0) / buffer.length;

            gazeDataRef.current.push({
                x: avgX,
                y: avgY,
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