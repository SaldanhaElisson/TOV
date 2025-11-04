
import { useState, useEffect, useCallback } from 'react';
interface WebgazerHookProps {
    webgazer: any;
}

export const useWebgazer = ({webgazer}: WebgazerHookProps) => {
    const [isWebgazerStarted, setIsWebgazerStarted] = useState(false)

    const initializeWebgazer = useCallback(async () => {
        try{
        
            await webgazer.setRegression("ridge")
            .showVideo(false)
            .saveDataAcrossSessions(false)
            .begin();
          
            await webgazer.showVideo(true).showPredictionPoints(false)

            var canvas = document.getElementById("plotting_canvas");

            if (canvas instanceof HTMLCanvasElement) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                
                canvas.style.position = 'fixed';
                canvas.style.top = '0';
                canvas.style.left = '0';
            }
             

            setIsWebgazerStarted(true)
        }catch(e){
            console.error("Falha ao iniciar o WebGazer. Permissão da webcam negada ou erro", e)
            setIsWebgazerStarted(false)
            alert("Erro: Permissão da webcam não concedida. Não é possível iniciar a calibração.");      
        }
    }, [])

    useEffect(() => {
        initializeWebgazer()

        return () => {
            if (isWebgazerStarted ) {
                webgazer.end();
            }
        }
    }, [initializeWebgazer, isWebgazerStarted])

    return {isWebgazerStarted}

}