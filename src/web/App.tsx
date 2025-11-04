import CreateExperiment from './components/experiment/create/CreateExperiment'
import WebgazerCalibration from "./components/experiment/calibration/WebgazerCalibration"
import {ThemeProvider} from "./components/provider/theme/ThemeProvider"
import {calculatePrecision} from "./utils/caculatePrecision"
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
    
    const { isWebgazerStarted } = useWebgazer({ webgazer });
    const { stage, handleSetupComplete, handleCalibrationComplete, handleRestart } = useExperimentFlow({fileList, setFileList, webgazer});
    const { exportDataAndDownload } = useExperimentDataExport();

    const handleExperimentComplete = (finalData: ExperimentResult[]) => {        
        exportDataAndDownload(finalData, "webgazer_gaze_data");

    };

    const renderContent = () => {
        switch (stage) {
            
            case 'experiment_setup':
                return <CreateExperiment  handleSetupComplete={handleSetupComplete} fileList={fileList} setFileList={setFileList} />; 

            case 'calibration':
                return <WebgazerCalibration  isWebgazerStarted={isWebgazerStarted} webgazer={webgazer} calculatePrecision={calculatePrecision}  handleCalibrationComplete={handleCalibrationComplete} />;

            case 'experiment_run':
                return <ExperimentRun onRestartSetup={handleRestart} onExperimentComplete={handleExperimentComplete} webgazer={webgazer} fileList={fileList}/>;
        }
    };

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="w-screen h-screen">
                {renderContent()}
            </div>
        </ThemeProvider>
    );
}

export default App;
