import { useState, useEffect, useCallback } from 'react';

// Define the WebGazer interface to replace 'any'
export interface WebGazer {
    setRegression: (type: string) => WebGazer;
    showVideo: (show: boolean) => WebGazer;
    saveDataAcrossSessions: (save: boolean) => WebGazer;
    showPredictionPoints: (show: boolean) => WebGazer;
    begin: () => Promise<void>;
    end: () => WebGazer;
    clearData: () => WebGazer;
    setGazeListener: (listener: (data: GazeData | null, elapsedTime: number) => void) => WebGazer;
    clearGazeListener: () => WebGazer;
    recordScreenPosition: (x: number, y: number, eventType: string) => void;
    getStoredPoints: () => [number[], number[]];
    removeMouseEventListeners: () => void;
    addMouseEventListeners: () => void;
    util: {
        bound: (data: GazeData) => void;
    };
    params: {
        showVideo: boolean;
        mirrorVideo: boolean;
        storingPoints: boolean;
    }
}

export interface GazeData {
    x: number;
    y: number;
    t?: number;
}

interface WebGazerHookProps {
    webgazer: WebGazer;
}

export const useWebgazer = ({ webgazer }: WebGazerHookProps) => {
    const [isWebgazerStarted, setIsWebgazerStarted] = useState(false)

    const initializeWebgazer = useCallback(async () => {
        try {
            // CRITICAL: Clear previous calibration data to prevent systemic bias (offset)
            // from previous sessions where head position might have been different.
            webgazer.clearData();

            await webgazer.setRegression("ridge")
                .showVideo(false)
                .saveDataAcrossSessions(false)
                .showPredictionPoints(false)
                .begin();

            const canvas = document.getElementById("plotting_canvas");

            if (canvas instanceof HTMLCanvasElement) {
                // Ensure 1:1 mapping with Viewport to match WebGazer's clientXY output
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                // Tailwind-equivalent styling for fixed viewport overlay
                canvas.style.position = 'fixed';
                canvas.style.top = '0';
                canvas.style.left = '0';
                canvas.style.pointerEvents = 'none'; // Ensure clicks pass through to UI
                canvas.style.zIndex = '9999';
            }

            setIsWebgazerStarted(true)
        } catch (e) {
            console.error("Falha ao iniciar o WebGazer. Permissão da webcam negada ou erro", e)
            setIsWebgazerStarted(false)
            alert("Erro: Permissão da webcam não concedida. Não é possível iniciar a calibração.");
        }
    }, [webgazer])

    useEffect(() => {
        initializeWebgazer()

        return () => {
            // Ensure we stop execution but keep the object ready for restart if needed
            // Note: clearData is handled on mount, not unmount, to allow for potential analysis if needed right after.
            if (isWebgazerStarted) {
                webgazer.end();
            }
        }
    }, [initializeWebgazer, isWebgazerStarted, webgazer])

    return { isWebgazerStarted }
}
