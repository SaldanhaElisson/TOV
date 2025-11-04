export function calculatePrecision(
  past50Array: [number[], number[]],
  windowWidth: number,
  windowHeight: number
): number {
  
  const [x50, y50] = past50Array;

  const staringPointX = windowWidth / 2;
  const staringPointY = windowHeight / 2;

  const precisionPercentages: number[] = calculatePrecisionPercentages(
    x50,
    y50,
    windowHeight,
    staringPointX,
    staringPointY
  );
  
  const averagePrecision = calculateAverage(precisionPercentages);

  return Math.round(averagePrecision);
}

function calculatePrecisionPercentages(
  x50: number[],
  y50: number[],
  windowHeight: number,
  staringPointX: number,
  staringPointY: number
): number[] {
  
  const precisionPercentages: number[] = [];
  const halfWindowHeight = windowHeight / 2;

  for (let i = 0; i < x50.length; i++) {
    
    const xDiff = staringPointX - x50[i];
    const yDiff = staringPointY - y50[i];
    const distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));

    let precision = 0;
    
   
    if (distance <= halfWindowHeight) {
      precision = 100 - (distance / halfWindowHeight * 100);
    } 
    
    precisionPercentages.push(precision);
  }

  return precisionPercentages;
}


function calculateAverage(precisionPercentages: number[]): number {
  const sum = precisionPercentages.reduce((acc, val) => acc + val, 0);
  
  return precisionPercentages.length > 0 ? sum / precisionPercentages.length : 0;
}