import { ExperimentResult, FileData } from "@/web/types";

interface ExperimentActionProps {
    fileList: FileData[];
    isFinished: boolean;
    imageRef: React.RefObject<HTMLImageElement | null>;
    gazeDataRef: React.RefObject<any[]>;
    webgazer: any;
    onExperimentComplete: (data: ExperimentResult[]) => void;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    setExperimentData: React.Dispatch<React.SetStateAction<ExperimentResult[]>>;
    experimentData: ExperimentResult[],
    currentImage: FileData
}

export const useExperimentAction = ({
    imageRef,
    gazeDataRef,
    setCurrentIndex,
    setExperimentData,
    currentImage
}: ExperimentActionProps) => {


    const captureData = () => {

        if (!imageRef.current) return;

        const imageElement = imageRef.current;
        const rect = imageElement.getBoundingClientRect();

        const imageDimensions = {
            width: rect.width,
            height: rect.height,
            x_screen: rect.left,
            y_screen: rect.top,
        };


        const result: ExperimentResult = {
            imageName: currentImage.name,
            imageDimensions,
            gazeData: [...gazeDataRef.current],
            timestamp: Date.now(),
        } as ExperimentResult;


        setExperimentData(prevData => [...prevData, result]);

        gazeDataRef.current = [];

        setCurrentIndex(prevIndex => prevIndex + 1);
    };


    return {
        captureData,
    };
}