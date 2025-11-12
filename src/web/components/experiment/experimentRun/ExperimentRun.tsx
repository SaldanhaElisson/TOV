import { useExperimentAction } from '@/web/hook/useExperimentAction';
import { useGazeCollector } from '@/web/hook/useGazeCollector';
import { useStrategyNavigation } from '@/web/hook/useStrategyNavigation';
import { ExperimentResult, FileData } from '@/web/types';
import { FC, useRef, useState } from 'react';
import { Button } from '../../ui/button';

interface ExperimentRunProps {
    webgazer: any,
    fileList: FileData[],
    isRandom: boolean,
    isFreeTime: boolean,
    onExperimentComplete: (finalData: ExperimentResult[]) => void,
    onRestartSetup: () => void,
}

const MAX_IMAGE_STYLE: React.CSSProperties = {
    width: '90%',
    height: '90vh',
    marginTop: '30px',
};

const ExperimentRun: FC<ExperimentRunProps> = ({ webgazer, fileList, onExperimentComplete, onRestartSetup, isFreeTime }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const [experimentData, setExperimentData] = useState<ExperimentResult[]>([]);

    const imageRef = useRef<HTMLImageElement>(null);


    const currentImage = fileList[currentIndex];
    const isFinished = currentIndex > fileList.length - 1;

    const gazeDataRef = useGazeCollector(webgazer, currentIndex);



    const { captureData } = useExperimentAction({
        imageRef,
        gazeDataRef,
        setCurrentIndex,
        setExperimentData,
        experimentData,
        currentImage
    });

    useStrategyNavigation({ currentIndex, isFreeTime, onCaptureData: captureData, timeLimitMs: 5000, })


    if (isFinished) {
        onExperimentComplete(experimentData)
    }

    if (isFinished) {
        return (
            <div className="flex flex-col items-center justify-center w-screen h-screen  bg-background text-center p-8">
                <h2 className="text-3xl font-bold mb-4">Experimento Finalizado!</h2>
                <p className="mb-6 text-gray-400">Os dados foram capturados e exportados.</p>

                <Button
                    onClick={onRestartSetup}
                    variant="default"
                    size="lg"
                >
                    Reiniciar Configuração
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-screen h-screen bg-background overflow-hidden">

            <div className="flex justify-center items-center grow">
                <img
                    ref={imageRef}
                    src={currentImage.url}
                    alt={`Imagem de teste: ${currentImage.name}`}
                    style={MAX_IMAGE_STYLE}
                    className="object-contain"
                />
            </div>

        </div>
    );
}

export default ExperimentRun