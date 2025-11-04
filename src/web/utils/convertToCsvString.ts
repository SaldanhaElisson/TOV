
import { ExperimentResult } from "../types";

export const convertToCsvString = (data: ExperimentResult[]): string => {
    
    if (!data || data.length === 0) return "";

    const headers = [
        "ImageName",
        "ImageWidth",
        "ImageHeight",
        "ImageScreenX",
        "ImageScreenY",
        "GazeData_JSON" 
    ];

    let csv = headers.join(',') + '\n';

    data.forEach(result => {
        
        const gazeJsonString = JSON.stringify(result.gazeData);
        
        const safeJsonCell = `"${gazeJsonString.replace(/"/g, '""')}"`;

        const rowValues = [
            `"${result.imageName.replace(/"/g, '""')}"`, 
            result.imageDimensions.width,
            result.imageDimensions.height,
            result.imageDimensions.x_screen,
            result.imageDimensions.y_screen,
            safeJsonCell 
        ];

        csv += rowValues.join(',') + '\n';
    });

    return csv;
};