import { useState } from 'react'
import './App.css'
import CreateExperiment from './components/experiment/create/CreateExperiment'

function App() {

  return (
    <>
    <div className="bg-black w-screen h-screen">
      <CreateExperiment/>
      </div>
    </>
  )
}

export default App
