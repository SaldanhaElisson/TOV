import CreateExperiment from './components/experiment/create/CreateExperiment'
import WebgazerCalibration from "./components/experiment/calibration/WebgazerCalibration"
import {ThemeProvider} from "./components/provider/theme/ThemeProvider"
import {calculatePrecision} from "./utils/caculatePrecision"


function App() {

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-screen h-screen">
        <WebgazerCalibration calculatePrecision={calculatePrecision}/>
      </div>
    </ThemeProvider>
    </>

  )
}

export default App
