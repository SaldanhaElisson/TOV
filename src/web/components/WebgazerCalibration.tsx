import React, { useEffect } from 'react';
import { useCalibration } from '@/web/hook/useCalibration';
import { WebGazer } from '@/web/hook/useWebgazer';

interface WebgazerCalibrationProps {
    webgazer: WebGazer;
    isWebgazerStarted: boolean;
    onCalibrationComplete: () => void;
    calculatePrecision: (past50Array: [number[], number[]], windowWidth: number, windowHeight: number) => number;
}

export const WebgazerCalibration: React.FC<WebgazerCalibrationProps> = ({
    webgazer,
    isWebgazerStarted,
    onCalibrationComplete,
    calculatePrecision
}) => {
    const {
        calibrationPoints,
        handleCalPointClick,
        CALIBRATION_POINTS,
        CLICKS_REQUIRED,
        startCalibrationFlow,
        stage
    } = useCalibration({
        webgazer,
        isWebgazerStarted,
        handleCalibrationComplete: onCalibrationComplete,
        calculatePrecision
    });

    useEffect(() => {
        if (isWebgazerStarted) {
            startCalibrationFlow();
        }
    }, [isWebgazerStarted]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!isWebgazerStarted) return null;

    return (
        <div className="fixed inset-0 z-9999 pointer-events-none">
            {stage === 'calibrating' && CALIBRATION_POINTS.map((point) => {
                const clicks = calibrationPoints[point.id] || 0;
                const isCompleted = clicks >= CLICKS_REQUIRED;

                if (isCompleted) return null;

                return (
                    <button
                        key={point.id}
                        id={point.id}
                        onClick={(e) => {
                            const x = e.clientX;
                            const y = e.clientY;

                            webgazer.recordScreenPosition(x, y, 'click');
                            handleCalPointClick(point.id);
                        }}
                        style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                        className="absolute w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 
                                   border-2 border-white shadow-md cursor-pointer pointer-events-auto
                                   flex items-center justify-center text-xs text-white font-bold transition-all"
                    >
                        {clicks}/{CLICKS_REQUIRED}
                    </button>
                );
            })}
        </div>
    );
};