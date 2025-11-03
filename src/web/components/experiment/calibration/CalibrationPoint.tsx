import React from 'react';

interface CalibrationPointProps {
  id: string;
  x: number; 
  y: number; 
  clicks: number; 
  isDisabled: boolean;
  handleClick: (id: string
  ) => void;
}

const CalibrationPoint: React.FC<CalibrationPointProps> = ({ id, x, y, clicks, isDisabled, handleClick }) => {
  const isCalibrated = clicks >= 5;

  const opacity = isCalibrated ? 1 : (0.2 * clicks) + 0.2;
  const backgroundColor = isCalibrated ? 'yellow' : 'red';

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: backgroundColor,
    opacity: opacity,
    cursor: isDisabled ? 'default' : 'pointer',
    zIndex: 1000,
    transition: 'opacity 0.2s, background-color 0.2s',
  };

  return (
    <button
      id={id}
      style={style}
      onClick={() => { handleClick(id)} }
      disabled={isDisabled}
      aria-label={`Ponto de calibração ${id}`}
      className="Calibration"
    />
  );
};

export default CalibrationPoint;