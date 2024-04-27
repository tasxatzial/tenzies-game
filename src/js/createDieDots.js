export default function createDieDots(number) {
  const dots = [];

  if (number === 1 || number === 3 || number === 5) {
    dots.push({
      name: 'dot-center',
      id: 5
    });
  }
  if (number !== 1) {
    dots.push({
      name: 'dot-top-left',
      id: 1
    });
    dots.push({
      name: 'dot-bottom-right',
      id: 9
    });
  }
  if (number === 4 || number === 5 || number === 6) {
    dots.push({
      name: 'dot-top-right',
      id: 3
    });
    dots.push({
      name: 'dot-bottom-left',
      id: 7
    });
  }
  if (number === 6) {
    dots.push({
      name: 'dot-middle-left',
      id: 4
    });
    dots.push({
      name: 'dot-middle-right',
      id: 6
    });
  }

  return dots;
}
