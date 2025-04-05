import React from 'react';
import AnimatedCursor from "react-animated-cursor";
function Cursor() {
  return (
   
    <AnimatedCursor
    innerSize={25}
    outerSize={10}
    outerAlpha={0.2}
    color="186,0,0"
    innerScale={0.7}
    outerScale={10}
    clickables={[
      "a",
      'input[type="text"]',
      'input[type="email"]',
      'input[type="number"]',
      'input[type="submit"]',
      'input[type="image"]',
      "label[for]",
      "select",
      "textarea",
      "button",
      ".link",
    ]}
  />
    
  )
}

export default Cursor