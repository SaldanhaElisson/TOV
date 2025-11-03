import { useState, useCallback } from 'react';
import Swal from 'sweetalert2';

interface CalPoint { id: string; x: number; y: number; }
interface CalibrationState { [key: string]: number; }

const CALIBRATION_POINTS: CalPoint[] = [
  { id: 'Pt1', x: 50, y: 50 }, { id: 'Pt2', x: 10, y: 10 }, { id: 'Pt3', x: 90, y: 10 },
  { id: 'Pt4', x: 10, y: 50 }, { id: 'Pt5', x: 90, y: 50 }, { id: 'Pt6', x: 10, y: 90 },
  { id: 'Pt7', x: 50, y: 90 }, { id: 'Pt8', x: 90, y: 90 }, { id: 'Pt9', x: 50, y: 10 },
];
const CLICKS_REQUIRED = 5;

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

interface CalibrationHooks {
    webgazer: any, 
    isWebgazerStarted: boolean;
    onCalibrationComplete: () => void;
    calculatePrecision: (storedPoints: any[]) => number;
}

export const useCalibration = ({
    webgazer,
    isWebgazerStarted, 
    onCalibrationComplete, 
    calculatePrecision
}: CalibrationHooks) => {

    const [calibrationPoints, setCalibrationPoints] = useState<CalibrationState>({});
    const [pointCalibrateCount, setPointCalibrateCount] = useState(0);
    const [stage, setStage] = useState<'initial' | 'calibrating' | 'measuring' | 'complete'>('initial');
    const [accuracy, setAccuracy] = useState<number | null>(null);

    const calcAccuracy = useCallback(async () => {
        if (!webgazer) return;

        setStage('measuring');

        await Swal.fire({
            title: "Preparando Medição",
            text: "Mantenha o olhar fixo no ponto central. A medição começará em instantes.",
            icon: 'info', showConfirmButton: false, timer: 500, timerProgressBar: true, allowOutsideClick: false,
        });

        webgazer.params.storingPoints = true;
        await sleep(5000);
        webgazer.params.storingPoints = false;

        const past50 = webgazer.getStoredPoints();
        const precision_measurement = calculatePrecision(past50);
        setAccuracy(precision_measurement);
        setStage('complete');

        Swal.fire({
            title: `Sua Precisão é de ${precision_measurement.toFixed(2)}%`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Recalibrar",
            allowOutsideClick: false,
        }).then(result => {
            if (result.isConfirmed) {
                onCalibrationComplete(); 
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                webgazer.clearData();
                setCalibrationPoints({});
                setPointCalibrateCount(0);
                setAccuracy(null);
                setStage('initial'); 
            }
        });
    }, [onCalibrationComplete, calculatePrecision]);

    const handleCalPointClick = useCallback((id: string, clientX: number, clientY: number) => {
        if (stage !== 'calibrating' || !webgazer) return;
        
        webgazer.recordScreenPosition(clientX, clientY, 'click');

        setCalibrationPoints(prev => {
            const newClicks = (prev[id] || 0) + 1;
            const newPoints = { ...prev, [id]: newClicks };

            if (newClicks === CLICKS_REQUIRED) {
                setPointCalibrateCount(prevCount => {
                    const newCount = prevCount + 1;
                    if (newCount >= CALIBRATION_POINTS.length) {
                        calcAccuracy();
                    }
                    return newCount;
                });
            }
            return newPoints;
        });
    }, [stage, calcAccuracy]);

    const startCalibrationFlow = async () => {
        await webgazer.showPredictionPoints(true).showVideo(false)

        if (!isWebgazerStarted) {
            alert("Webcam não iniciada ou permissão negada. Por favor, recarregue e tente novamente.");
            return;
        }
        
        Swal.fire({
            title: "Calibration",
            text: `Clique em cada um dos ${CALIBRATION_POINTS.length} pontos ${CLICKS_REQUIRED} vezes.`,
            showCancelButton: false,
            confirmButtonText: "Confirmar"
        }).then(async result => {
            if (result.isConfirmed) {
                setStage('calibrating');
            }
        });
    };

    return {
        stage,
        calibrationPoints,
        pointCalibrateCount,
        accuracy,
        startCalibrationFlow,
        handleCalPointClick,
        CALIBRATION_POINTS,
        CLICKS_REQUIRED,
    };
}