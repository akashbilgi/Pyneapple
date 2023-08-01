import React from 'react';
import logo from './pyneapple-logo-9.png';
import RangeSlider from './RangeSlider';
import './App.css';

function UI({
  selectedFile,
  handleChange,
  files,
  fetchData,
  apiParams,
  handleApiParamChange
}) {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="app-title">Pyneapple App Demo</h1>
      </header>
      <div className="app-body">
        <div className="left-panel">
          <div className="file-selector">
            <label htmlFor="selectedFile">Select File:</label>
            <select
              id="selectedFile"
              value={selectedFile}
              onChange={handleChange}
              className="custom-select"
            >
              {files.map((file, index) => (
                <option value={file} key={index}>
                  {file}
                </option>
              ))}
            </select>
          </div>
          <div className="fetch-button">
            <button onClick={fetchData} className="custom-button">
              Fetch Data
            </button>
          </div>
          {/* Parameter inputs */}
          <div className="api-params">
            <div>
              <label htmlFor="minName">minName:</label>
              <input
                type="text"
                id="minName"
                name="minName"
                value={apiParams.minName}
                onChange={handleApiParamChange}
                style={{ fontSize: '14px', padding: '5px' }}
              />
            </div>
            <div>
              <RangeSlider
                labelLow="minLow"
                labelHigh="minHigh"
                lowValue={apiParams.minLow}
                highValue={apiParams.minHigh}
                onSliderChange={(type, value) => {
                  if (type === 'low') {
                    handleApiParamChange({ target: { name: 'minLow', value } });
                  } else {
                    handleApiParamChange({ target: { name: 'minHigh', value } });
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="avgName">avgName:</label>
              <input
                type="text"
                id="avgName"
                name="avgName"
                value={apiParams.avgName}
                onChange={handleApiParamChange}
                style={{ fontSize: '14px', padding: '5px' }}
              />
            </div>
            <div>
              <RangeSlider
                labelLow="avgLow"
                labelHigh="avgHigh"
                lowValue={apiParams.avgLow}
                highValue={apiParams.avgHigh}
                onSliderChange={(type, value) => {
                  if (type === 'low') {
                    handleApiParamChange({ target: { name: 'avgLow', value } });
                  } else {
                    handleApiParamChange({ target: { name: 'avgHigh', value } });
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="sumName">sumName:</label>
              <input
                type="text"
                id="sumName"
                name="sumName"
                value={apiParams.sumName}
                onChange={handleApiParamChange}
                style={{ fontSize: '14px', padding: '5px' }}
              />
            </div>
            <div>
              <RangeSlider
                labelLow="sumLow"
                labelHigh="sumHigh"
                lowValue={apiParams.sumLow}
                highValue={apiParams.sumHigh}
                onSliderChange={(type, value) => {
                  if (type === 'low') {
                    handleApiParamChange({ target: { name: 'sumLow', value } });
                  } else {
                    handleApiParamChange({ target: { name: 'sumHigh', value } });
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="countName">countName:</label>
              <input
                type="text"
                id="countName"
                name="countName"
                value={apiParams.countName}
                onChange={handleApiParamChange}
                style={{ fontSize: '14px', padding: '5px' }}
              />
            </div>
            <div>
              <RangeSlider
                labelLow="countLow"
                labelHigh="countHigh"
                lowValue={apiParams.countLow}
                highValue={apiParams.countHigh}
                onSliderChange={(type, value) => {
                  if (type === 'low') {
                    handleApiParamChange({ target: { name: 'countLow', value } });
                  } else {
                    handleApiParamChange({ target: { name: 'countHigh', value } });
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="maxName">maxName:</label>
              <input
                type="text"
                id="maxName"
                name="maxName"
                value={apiParams.countName}
                onChange={handleApiParamChange}
                style={{ fontSize: '14px', padding: '5px' }}
              />
            </div>
            <div>
              <RangeSlider
                labelLow="maxLow"
                labelHigh="maxHigh"
                lowValue={apiParams.maxLow}
                highValue={apiParams.maxHigh}
                onSliderChange={(type, value) => {
                  if (type === 'low') {
                    handleApiParamChange({ target: { name: 'maxLow', value } });
                  } else {
                    handleApiParamChange({ target: { name: 'maxHigh', value } });
                  }
                }}
              />
            </div>
          </div>
        </div>
        {/* Map */}
        <div style={{ width: '85%', height: '600px', flexGrow: 1 }}>
          <div id="mapid" style={{ height: '100%', width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
}

export default UI;
