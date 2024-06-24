import Confetti from 'react-confetti';
import useScreenSize from '../hooks/useScreenSize.js';

export default function ResponsiveConfetti() {
  const screenSize = useScreenSize();
  return (
    <Confetti width={screenSize.width} height={screenSize.height}/>
  )
}
