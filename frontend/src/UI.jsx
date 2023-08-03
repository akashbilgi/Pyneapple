import React from 'react';
import logo from './pyneapple-logo-9.png';
import RangeSlider from './RangeSlider';
import './App.css';
import './UI.css';
import MapContainer from './MapContainer';
import MetricsPanel from './MetricsPanel';
const FileSelector = ({ selectedFile, handleChange, files }) => (
  <div className="select-container">
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
);


const ApiTypeSelector = ({ apiType, handleApiTypeChange }) => (
  <div className="select-container">
    <label htmlFor="apiType">API Type:</label>
    <select
      id="apiType"
      value={apiType}
      onChange={handleApiTypeChange}
      className="custom-select"
    >
      <option value="emp">emp</option>
      <option value="generalizedP">generalizedP</option>
      <option value="libraryMaxP">libraryMaxP</option>
      <option value="ScalableMaxP">ScalableMaxP</option>
      <option value="compareMaxP">compareMaxP</option>
    </select>
  </div>
);

const FetchButton = ({ fetchData }) => (
  <div className="button-container">
    <label>&nbsp;</label>
    <button onClick={fetchData} className="custom-button">
      Fetch Data
    </button>
  </div>
);


const ParameterInput = ({ label, id, value, handleChange }) => (
  <div className="input-container">
    <label htmlFor={id}>{label}:</label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={handleChange}
      className="parameter-input"
    />
  </div>
);

const Slider = ({ apiParams, handleApiParamChange, labels }) => (
  <div>
    <RangeSlider
      labelLow={labels.low}
      labelHigh={labels.high}
      lowValue={apiParams[labels.low]}
      highValue={apiParams[labels.high]}
      onSliderChange={(type, value) => {
        const name = type === 'low' ? labels.low : labels.high;
        handleApiParamChange({ target: { name, value } });
      }}
    />
  </div>
);

const apiTypeParams = {
  emp: ['file_name', 'disname', 'minName', 'minLow', 'minHigh', 'maxName', 'maxLow', 'maxHigh', 'avgName', 'avgLow', 'avgHigh', 'sumName', 'sumLow', 'sumHigh', 'countName','countLow', 'countHigh'],
  generalizedP: ['sim_attr', 'ext_attr', 'threshold', 'p'],
  libraryMaxP: ['attr_name', 'threshold_name', 'threshold'],
  ScalableMaxP: ['sim_attr', 'ext_attr', 'threshold'],
  compareMaxP: ['sim_attr', 'ext_attr', 'threshold']
};


function UI({
  selectedFile,
  handleChange,
  files,
  fetchData,
  apiParams,
  handleApiParamChange,
  apiType,
  handleApiTypeChange,
  metrics
}) {
  const currentParams = apiTypeParams[apiType];


  const renderMaps = () => {
    if (apiType === 'compareMaxP') {
      return (
        <div className="maps-container">
          <div className="map-container">
            <MapContainer selectedFile={selectedFile} apiParams={apiParams} mapIndex={1} />
          </div>

            {/* <MetricsPanel apiParams={apiParams} /> */}

          <div className="map-container">
            <MapContainer selectedFile={selectedFile} apiParams={apiParams} mapIndex={2} />
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ width: '85%', height: '600px', flexGrow: 1 }}>
          <div id="mapid" style={{ height: '100%', width: '100%' }}></div>
        </div>
      );
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="app-title">Pyneapple App Demo</h1>
      </header>
      <div className="app-body">
        <div className="left-panel">
          <FileSelector
            selectedFile={selectedFile}
            handleChange={handleChange}
            files={files}
          />
          <ApiTypeSelector
            apiType={apiType}
            handleApiTypeChange={handleApiTypeChange}
          />
          <FetchButton fetchData={fetchData} />
          <div className="api-params">
            {apiType === 'emp' ?
              <React.Fragment>
                <ParameterInput
                  label='disname'
                  id='disname'
                  value={apiParams['disname']}
                  handleChange={handleApiParamChange}
                />
                {['min', 'max', 'avg', 'sum', 'count'].map((param, index) => (
                  <React.Fragment key={index}>
                    <ParameterInput
                      label={`${param}Name`}
                      id={`${param}Name`}
                      value={apiParams[`${param}Name`]}
                      handleChange={handleApiParamChange}
                    />
                    <Slider
                      apiParams={apiParams}
                      handleApiParamChange={handleApiParamChange}
                      labels={{ low: `${param}Low`, high: `${param}High` }}
                    />
                  </React.Fragment>
                ))}
              </React.Fragment>
              :
              currentParams.map((param, index) => (
                <ParameterInput
                  key={index}
                  label={param}
                  id={param}
                  value={apiParams[param]}
                  handleChange={handleApiParamChange}
                />
              ))
            }
             {apiType === 'compareMaxP' && (
        <div className="metrics-panel">
          <h2>Metrics</h2>
          <div className="metric-value">
            <label>ScalableMaxP Exececution time: </label>
            <span>{metrics.metric1}</span>
          </div>
          <div className="metric-value">
            <label>LibraryMaxP Exececution time: </label>
            <span>{metrics.metric2}</span>
          </div>
          <div className="metric-value">
            <label>Speed Up (Percetage): </label>
            <span>{metrics.metric3}</span>
          </div>
        </div>
      )}
          </div>
        </div>
        <div style={{ width: '85%', height: '600px', flexGrow: 1 }}>
          <div id="mapid" style={{ height: '100%', width: '100%' }}></div>
          </div>
        {renderMaps()}
      </div>
    </div>
  );
}

export default UI;

