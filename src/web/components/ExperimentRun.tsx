import React, { useRef, useEffect, useState } from 'react';
import { WebGazer } from '@/web/hook/useWebgazer';
import { FileData, ExperimentResult } from '@/web/types';
import { useGazeCollector } from '@/web/hook/useGazeCollector';
import { useExperimentAction } from '@/web/hook/useExperimentAction';
import { useStrategyNavigation } from '@/web/hook/useStrategyNavigation';

interface ExperimentRunProps {
    webgazer: WebGazer;
    fileList: FileData[];
    onExperimentComplete: (data: ExperimentResult[]) => void;
}

export const ExperimentRun: React.FC<ExperimentRunProps> = ({
    webgazer,
    fileList,
    onExperimentComplete
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [experimentData, setExperimentData] = useState<ExperimentResult[]>([]);
    const imageRef = useRef<HTMLImageElement>(null);

    const gazeDataRef = useGazeCollector(webgazer, currentIndex);

    const currentImage = fileList[currentIndex];
    const isFinished = currentIndex >= fileList.length;

    useEffect(() => {
        if (webgazer) {
            webgazer.showVideo(false);
            webgazer.showPredictionPoints(false);
        }
    }, [webgazer]);

    useEffect(() => {
        if (isFinished) {
            onExperimentComplete(experimentData);
        }
    }, [isFinished, experimentData, onExperimentComplete]);

    const { captureData } = useExperimentAction({
        fileList,
        isFinished,
        imageRef,
        gazeDataRef,
        webgazer,
        onExperimentComplete,
        setCurrentIndex,
        setExperimentData,
        experimentData,
        currentImage
    });

    useStrategyNavigation({
        isFreeTime: true,
        onCaptureData: captureData,
        currentIndex
    });

    if (isFinished || !currentImage) return null;

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-900 overflow-hidden relative">
            <img
                ref={imageRef}
                src={currentImage.url}
                alt="Stimulus"
                className="max-h-full max-w-full object-contain pointer-events-none select-none"
            />

        </div>
    );
};