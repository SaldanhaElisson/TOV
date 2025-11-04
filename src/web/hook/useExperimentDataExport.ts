import { ExperimentResult } from "@/web/types";
import { convertToCsvString } from "@/web/utils/convertToCsvString";

export const useExperimentDataExport = () => {
    
    const exportDataAndDownload = (data: ExperimentResult[], filename: string = 'webgazer_experiment_data') => {
        
        if (!data || data.length === 0) {
            console.warn("Não há dados para exportar.");
            return;
        }

        const csvString = convertToCsvString(data);
                
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    };

    return { exportDataAndDownload };
};