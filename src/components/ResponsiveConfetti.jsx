import React from 'react';
import Confetti from 'react-confetti';
import useScreenSize from '../js/useScreenSize.js';

export default function ResponsiveConfetti() {
  const screenSize = useScreenSize();
  return (
    <Confetti width={screenSize.width} height={screenSize.height}/>
  )
}
