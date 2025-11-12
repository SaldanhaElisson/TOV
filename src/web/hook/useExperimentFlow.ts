import { useState } from 'react';
import { FileData } from '@/web/types';
import Swal from 'sweetalert2';

type ExperimentStage = 'experiment_setup' | 'calibration' | 'experiment_run';

interface ExperimentFlow {
    stage: ExperimentStage;
    handleSetupComplete: () => void;
    handleCalibrationComplete: () => void;
    handleRestart: () => void;

}

interface ExperimentFlowProps {
    fileList: FileData[];
    webgazer: any;

}

export const useExperimentFlow = ({ fileList, webgazer }: ExperimentFlowProps): ExperimentFlow => {

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

    const handleRestart = async () => {
        await webgazer.clearData();
        window.location.reload();

    };

    const handleCalibrationComplete = async () => {

        await Swal.fire({
            title: "Calibração Concluída!",

            html: `
            <p class="text-gray-700 mb-4">
                O rastreamento ocular está ativo e pronto.
            </p>
            <p class="text-base font-semibold text-gray-800">
                A primeira imagem será exibida após sua confirmação.
            </p>
            <p class="text-sm text-red-600 mt-2 p-2 bg-red-50 rounded-md">
                <span class="font-bold">Atenção:</span> Pressione a tecla
                <kbd class="px-2 py-1 text-base font-semibold text-black bg-gray-200 border border-gray-400 rounded-lg shadow-sm">ESPAÇO</kbd>
                para salvar os dados e avançar para a próxima imagem.
            </p>
        `,

            icon: 'success',
            showCancelButton: false,
            confirmButtonText: "Iniciar Experimento",
            allowOutsideClick: false,
            allowEscapeKey: false,

            buttonsStyling: false,
            customClass: {
                confirmButton: 'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2',
                htmlContainer: 'text-left'
            }
        });

        setStage('experiment_run');
    };

    return {
        stage,
        handleSetupComplete,
        handleCalibrationComplete,
        handleRestart
    };
};