import React from 'react';
import logo from './pyneapple-logo-9.png';
import RangeSlider from './RangeSlider';
import './App.css';
import './UI.css';
import MapContainer from './MapContainer';
import ExecutionTimeChart from './ExecutionTimeChart';
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
const FileUpload = ({ onFileChange, onFileUpload }) => (
  <div className="upload-container">
    <label htmlFor="file">Upload File:</label>
    <input
      type="file"
      id="file"
      onChange={onFileChange}
      className="file-upload-input"
      multiple
    />
    <button onClick={onFileUpload} className="upload-button">
      Upload
    </button>
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
  metrics,
  onFileChange,
  onFileUpload,
  labels1,
}) {
  const currentParams = apiTypeParams[apiType];


  const renderMaps = () => {
    if (apiType === 'compareMaxP') {
      return (
        <div className="maps-container">
          <div className="map-container">
            <MapContainer selectedFile={selectedFile} apiParams={apiParams} labels={labels1} mapIndex={2} />
          </div>
        </div>
        
      );
    } else {

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
          <FileUpload onFileChange={onFileChange} onFileUpload={onFileUpload} />
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
              {metrics.map((metric, index) => (
                <div className="metric-value" key={index}>
                  <label>{metric.name}: </label>
                  <span>{metric.value}</span>
                </div>
              ))}
              <div className="chart-container">
                <ExecutionTimeChart data={metrics} />
              </div>
            </div>

      )}
          </div>
        </div>
        <div className="map-container">
          <div id="mapid" style={{ height: '100%', width: '100%' }}></div>
        </div>
        {renderMaps()}
      </div>
    </div>
  );
}

export default UI;

