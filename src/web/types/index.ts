export interface FileData {
    id: string;
    name: string;
    url: string;
    file: File;
}

export interface GazePoint {
    x: number;
    y: number;
    timestamp: number;
    elapsedTime: number;
}

export interface ExperimentResult {
    imageName: string;
    imageDimensions: {
        width: number;
        height: number;
        x_screen: number;
        y_screen: number;
    };

    gazeData: GazePoint[];
}