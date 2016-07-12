import React from 'react';

export default function Outline() {
  const boxes = [];
  for (var i = 0; i < 9; i++) {
    boxes.push(<li className="box" key={i}></li>);
  }

  return (
    <ul className="boxes">
      { boxes }
    </ul>
  );
}
