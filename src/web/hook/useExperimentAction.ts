import { ExperimentResult, FileData } from "@/web/types";
import { useCallback } from "react"; // 🚨 Importa useCallback

interface ExperimentActionProps {
    currentIndex: number;
    fileList: FileData[];
    isFinished: boolean;
    imageRef: React.RefObject<HTMLImageElement | null>;
    gazeDataRef: React.RefObject<any[]>;
    webgazer: any;
    onExperimentComplete: (data: ExperimentResult[]) => void;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    setExperimentData: React.Dispatch<React.SetStateAction<ExperimentResult[]>>;
}

export const useExperimentAction = ({
    currentIndex,
    fileList,
    isFinished,
    imageRef,
    gazeDataRef,
    webgazer,
    onExperimentComplete,
    setCurrentIndex,
    setExperimentData,
}: ExperimentActionProps) => {
    
    const captureAndAdvance = useCallback(() => {

        if (isFinished || !imageRef.current) return;

        const imageElement = imageRef.current;
        const rect = imageElement.getBoundingClientRect();

        const imageDimensions = {
            width: rect.width,
            height: rect.height,
            x_screen: rect.left,
            y_screen: rect.top,
        };

        const currentImage = fileList[currentIndex];

        const result: ExperimentResult = {
            imageName: currentImage.name,
            imageDimensions,
            gazeData: [...gazeDataRef.current],
        } as ExperimentResult;

        let isLastImage = false;

        setExperimentData(prevData => {
            const newExperimentData = [...prevData, result];
            
            isLastImage = (currentIndex + 1) >= fileList.length;

            if (isLastImage) {
                webgazer.end();
                onExperimentComplete(newExperimentData); 
            }
            return newExperimentData;
        });

        gazeDataRef.current = [];
        if (!isLastImage) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }

    }, [
        currentIndex, 
        isFinished, 
        fileList, 
        imageRef, 
        gazeDataRef, 
        webgazer, 
        onExperimentComplete, 
        setExperimentData, 
        setCurrentIndex 
    ]);

    return captureAndAdvance;
};