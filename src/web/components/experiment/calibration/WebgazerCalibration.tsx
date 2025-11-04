import { FC } from 'react';
import CalibrationPoint from './CalibrationPoint';
import { useCalibration } from '../../../hook/useCalibration';
import { Button } from '../../ui/button';

interface WebgazerCalibrationProps {
    webgazer: any,
    isWebgazerStarted: boolean,
    handleCalibrationComplete: () => void;
    calculatePrecision: (past50Array: [number[], number[]], windowWidth: number, windowHeight: number) => number
}

const WebgazerCalibration: FC<WebgazerCalibrationProps> = ({
    webgazer,
    handleCalibrationComplete,
    isWebgazerStarted,
    calculatePrecision
}) => {


    const {
        stage,
        calibrationPoints,
        pointCalibrateCount,
        startCalibrationFlow,
        handleCalPointClick,
        CALIBRATION_POINTS,
        CLICKS_REQUIRED,
    } = useCalibration({
        webgazer,
        isWebgazerStarted,
        handleCalibrationComplete,
        calculatePrecision,
    });

    if (stage === 'initial') {
        return (
            <div className="text-white text-center p-8">
                <h2 className="text-xl mb-4">Inicie a Calibração</h2>
                <p className="mb-6">Clique no botão abaixo para iniciar o processo.</p>
                <Button
                    onClick={startCalibrationFlow}
                    disabled={!isWebgazerStarted}                >
                    {isWebgazerStarted ? 'Iniciar Calibração' : 'Aguardando Webcam...'}
                </Button>
            </div>
        );
    }

    if (stage === 'calibrating' || stage === 'measuring') {
        return (
            <div
                className="webgazer-calibration-area w-screen h-screen absolute top-0 left-0 bg-black"
            >
                <p className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white z-10">
                    {stage === 'calibrating'
                        ? `Clique no ponto (Concluídos: ${pointCalibrateCount} de ${CALIBRATION_POINTS.length})`
                        : "Mantendo Precisão. Olhe para o centro."
                    }
                </p>

                {stage === 'calibrating' && CALIBRATION_POINTS.map((point) => (
                    <CalibrationPoint
                        key={point.id}
                        id={point.id}
                        x={point.x}
                        y={point.y}
                        clicks={calibrationPoints[point.id] || 0}
                        isDisabled={(calibrationPoints[point.id] || 0) >= CLICKS_REQUIRED}
                        handleClick={handleCalPointClick}
                    />
                ))}

                {stage === 'measuring' && (
                    <Button
                        variant="ghost"

                        className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-600 z-1001 p-0 hover:bg-red-600 opacity-90 animate-pulse"

                        onClick={(e) => e.stopPropagation()}
                        tabIndex={-1}
                        aria-label="Ponto de fixação central para medição"
                    />
                )}
            </div>
        );
    }

}

export default WebgazerCalibration