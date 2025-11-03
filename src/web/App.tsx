import CreateExperiment from './components/experiment/create/CreateExperiment'
import WebgazerCalibration from "./components/experiment/calibration/WebgazerCalibration"
import {ThemeProvider} from "./components/provider/theme/ThemeProvider"
import {calculatePrecision} from "./utils/caculatePrecision"
import { useExperimentFlow } from './hook/useExperimentFlow';
import { useState } from 'react';
import { FileData } from '@/web/types';

function App() {
    const [fileList, setFileList] = useState<FileData[]>([]);
    
    const { stage, handleSetupComplete, handleCalibrationComplete } = useExperimentFlow({fileList});

    const renderContent = () => {
        switch (stage) {
            
            case 'experiment_setup':
                return <CreateExperiment handleSetupComplete={handleSetupComplete} fileList={fileList} setFileList={setFileList} />; 

            case 'calibration':
                return <WebgazerCalibration calculatePrecision={calculatePrecision}  handleCalibrationComplete={handleCalibrationComplete} />;

            case 'experiment_run':
                return <p> aqui </p>;
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
