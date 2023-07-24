import React from 'react';

function RangeSlider({ labelLow, labelHigh, lowValue, highValue, onSliderChange }) {
  return (
    
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span>{labelLow}</span>
        <span>{labelHigh}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <input
            type="range"
            min={-1000000}
            max={1000000}
            value={lowValue}
            onChange={(e) => onSliderChange('low', parseInt(e.target.value))}
            style={{ fontSize: '14px', padding: '5px' }}
          />
          <input
            type="number"
            value={lowValue}
            onChange={(e) => onSliderChange('low', parseInt(e.target.value))}
            style={{ fontSize: '14px', padding: '5px', width: '80px', marginLeft: '5px' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <input
            type="range"
            min={-1000000}
            max={1000000}
            value={highValue}
            onChange={(e) => onSliderChange('high', parseInt(e.target.value))}
            style={{ fontSize: '14px', padding: '5px' }}
          />
          <input
            type="number"
            value={highValue}
            onChange={(e) => onSliderChange('high', parseInt(e.target.value))}
            style={{ fontSize: '14px', padding: '5px', width: '80px', marginLeft: '5px' }}
          />
        </div>
      </div>
    </div>
  );
}

export default RangeSlider;
