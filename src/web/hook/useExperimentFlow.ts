import { useState, useCallback } from 'react';
import { FileData } from '@/web/types';
import Swal from 'sweetalert2';

type ExperimentStage = 'experiment_setup' | 'calibration' | 'experiment_run';


interface ExperimentFlow {
    stage: ExperimentStage;
    handleSetupComplete: () => void;
    handleCalibrationComplete: () => void;

}

interface ExperimentFlowProps {
    fileList: FileData[];

}
export const useExperimentFlow = ({ fileList }: ExperimentFlowProps): ExperimentFlow => {

    const [stage, setStage] = useState<ExperimentStage>('experiment_setup');

    const handleSetupComplete = async () => {

        if (fileList.length < 1) {

            await Swal.fire({
                title: "Arquivos Ausentes",
                text: "Por favor, selecione pelo menos um arquivo (imagem) para configurar o experimento.",
                icon: 'warning',
                confirmButtonText: "Entendi",
                allowOutsideClick: false,
                allowEscapeKey: false,

                buttonsStyling: false,

                customClass: {
                    confirmButton: 'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2'
                }
            });

            return;
        }

        setStage('calibration');
    };

    const handleCalibrationComplete = useCallback(() => {

        setStage('experiment_run');
    }, []);

    return {
        stage,
        handleSetupComplete,
        handleCalibrationComplete,
    };
};