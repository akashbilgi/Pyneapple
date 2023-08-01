import React from 'react';
import logo from './pyneapple-logo-9.png';
import RangeSlider from './RangeSlider';
import './App.css';

const FileSelector = ({ selectedFile, handleChange, files }) => (
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
);


const ApiTypeSelector = ({ apiType, handleApiTypeChange }) => (
  <div className="api-type-selector">
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
      <option value="scalableMaxP">scalableMaxP</option>
      <option value="compareMaxP">compareMaxP</option>
    </select>
  </div>
);
const FetchButton = ({ fetchData }) => (
  <div className="fetch-button">
    <button onClick={fetchData} className="custom-button">
      Fetch Data
    </button>
  </div>
);

const ParameterInput = ({ label, id, value, handleChange }) => (
  <div>
    <label htmlFor={id}>{label}:</label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={handleChange}
      style={{ fontSize: '14px', padding: '5px' }}
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
  generalizedP: ['file_name', 'sim_attr', 'ext_attr', 'threshold', 'p'],
  libraryMaxP: ['file_name', 'attr_name', 'threshold_name', 'threshold'],
  ScalableMaxP: ['file_name', 'sim_attr', 'ext_attr', 'threshold'],
  compareMaxP: ['file_name', 'sim_attr', 'ext_attr', 'threshold']
};

function UI({
  selectedFile,
  handleChange,
  files,
  fetchData,
  apiParams,
  handleApiParamChange,
  apiType,
  handleApiTypeChange
}) {
  const currentParams = apiTypeParams[apiType];

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
                  label='file_name'
                  id='file_name'
                  value={apiParams['file_name']}
                  handleChange={handleApiParamChange}
                />
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
          </div>
        </div>
        <div style={{ width: '85%', height: '600px', flexGrow: 1 }}>
          <div id="mapid" style={{ height: '100%', width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
}


export default UI;

