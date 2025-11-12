import CreateExperiment from './components/experiment/create/CreateExperiment'
import WebgazerCalibration from "./components/experiment/calibration/WebgazerCalibration"
import { ThemeProvider } from "./components/provider/theme/ThemeProvider"
import { calculatePrecision } from "./utils/caculatePrecision"
import { useExperimentFlow } from './hook/useExperimentFlow';
import { useState } from 'react';
import { ExperimentResult, FileData } from '@/web/types';
// @ts-ignore:
import webgazer from "webgazer"
import ExperimentRun from './components/experiment/experimentRun/ExperimentRun';
import { useExperimentDataExport } from '@/web/hook/useExperimentDataExport';
import { useWebgazer } from './hook/useWebgazer';


function App() {
    const [fileList, setFileList] = useState<FileData[]>([]);

    const [isRandom, setIsRandom] = useState<boolean>(false);

    const [isFreeTime, setIsFreeTime] = useState<boolean>(false);

    const { isWebgazerStarted } = useWebgazer({ webgazer });

    const { stage, handleSetupComplete, handleCalibrationComplete, handleRestart } = useExperimentFlow({ fileList, webgazer });

    const { exportDataAndDownload } = useExperimentDataExport();

    const handleExperimentComplete = (finalData: ExperimentResult[]) => {
        exportDataAndDownload(finalData, "webgazer_gaze_data");
    };

    function shuffleArray<T>(array: T[]): T[] {
        const shuffledArray = [...array];

        let currentIndex = shuffledArray.length;
        let randomIndex: number;

        while (currentIndex !== 0) {


            randomIndex = Math.floor(Math.random() * currentIndex);

            currentIndex--;

            [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
                shuffledArray[randomIndex], shuffledArray[currentIndex]
            ];
        }

        return shuffledArray;
    }

    const renderContent = () => {
        switch (stage) {

            case 'experiment_setup':
                return <CreateExperiment
                    handleSetupComplete={handleSetupComplete}
                    fileList={fileList}
                    setFileList={setFileList}
                    setIsRandom={setIsRandom}
                    setIsFreeTime={setIsFreeTime}
                />;

            case 'calibration':
                return <WebgazerCalibration
                    isWebgazerStarted={isWebgazerStarted}
                    webgazer={webgazer}
                    calculatePrecision={calculatePrecision}
                    handleCalibrationComplete={handleCalibrationComplete}
                />;

            case 'experiment_run':
                return <ExperimentRun
                    onRestartSetup={handleRestart}
                    onExperimentComplete={handleExperimentComplete}
                    webgazer={webgazer}
                    fileList={isRandom ? shuffleArray(fileList) : fileList}
                    isRandom={isRandom}
                    isFreeTime={isFreeTime}
                />;
        }
    };

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                {renderContent()}
            </div>
        </ThemeProvider>
    );
}

export default App;
