export default function createDieDotPositions(number) {
  const dots = [];

  if (number === 1 || number === 3 || number === 5) {
    dots.push('center');
  }
  if (number !== 1) {
    dots.push('top-left');
    dots.push('bottom-right');
  }
  if (number === 4 || number === 5 || number === 6) {
    dots.push('top-right');
    dots.push('bottom-left');
  }
  if (number === 6) {
    dots.push('middle-left');
    dots.push('middle-right');
  }

  return dots;
}
