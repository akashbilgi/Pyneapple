import React, { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';
import * as shapefile from 'shapefile';
import UI from './UI';

function App() {
  const [geoLayer, setGeoLayer] = useState(null);
  const [map, setMap] = useState(null);
  const [selectedFile, setSelectedFile] = useState('LACity');
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [labels1, setLabels] = useState([]);
  const [apiParams, setApiParams] = useState({
    file_name: `${selectedFile}.shp`,
    disname: 'households',
    minName: 'pop_16up',
    minLow: -1000000,
    minHigh: 1000000,
    maxName: 'pop_16up',
    maxLow: -1000000,
    maxHigh: 1000000,
    avgName: 'employed',
    avgLow: -1000000,
    avgHigh: 1000000,
    sumName: 'pop2010',
    sumLow: -1000000,
    sumHigh: 1000000,
    countLow: -1000000,
    countHigh: 1000000,
  });
  const [apiType, setApiType] = useState('emp');

const handleApiTypeChange = (event) => {
  setApiType(event.target.value);
};

const onFileChange = event => {
  setFile(event.target.files[0]);
};

const onFileUpload = () => {
  const formData = new FormData();
  formData.append("file", file);
  axios.post(`http://localhost:8000/upload`, formData);
};
const apiTypeParams = {
  emp: ['file_name', 'disname','minName', 'minLow', 'minHigh', 'maxName', 'maxLow', 'maxHigh', 'avgName', 'avgLow', 'avgHigh', 'sumName', 'sumLow', 'sumHigh','countName', 'countLow', 'countHigh'],
  generalizedP: ['file_name', 'sim_attr', 'ext_attr', 'threshold','p'],
  libraryMaxP: ['file_name', 'attr_name', 'threshold_name', 'threshold'],
  ScalableMaxP : ['file_name', 'sim_attr', 'ext_attr', 'threshold'],
  compareMaxP: ['file_name', 'sim_attr', 'ext_attr', 'threshold']
  // add the mappings for the other API types here
};

const [metrics, setMetrics] = useState({
  metric1: 0,
  metric2: 0,
  metric3: 0,
});


  useEffect(() => {
    if (selectedFile) {
      let fileName = selectedFile.endsWith('.shp') ? selectedFile : `${selectedFile}.shp`;
      setApiParams((prevParams) => ({
        ...prevParams,
        file_name: fileName,
      }));
    }
  }, [selectedFile]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/listFiles')
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.log('Error fetching files:', error);
      });
  }, []);

  useEffect(() => {
    if (!map) {
      const mymap = L.map('mapid').setView([34.0522, -118.2437], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mymap);
      setMap(mymap);
    }
  }, [map]);

  useEffect(() => {
    if (map && selectedFile) {
      if (geoLayer) {
        map.removeLayer(geoLayer);
      }
      shapefile
        .read(`http://localhost:8003/${selectedFile}`)
        .then(({ features }) => {
          const newGeoLayer = L.geoJSON(features, {
            style: (feature) => {
              return {
                fillColor: getColor(feature.properties.POP),
                color: '#000',
                fillOpacity: 0.5,
              };
            },
            onEachFeature: (feature, layer) => {
              layer.on('click', function () {
                if (geoLayer) {
                  geoLayer.setStyle({ fillOpacity: 0.5 });
                  layer.setStyle({ fillOpacity: 1 });
                }
              });

              const tooltipContent = `Tract: ${feature.properties.TRACTCE10}\nTotal Population: ${feature.properties.POP}`;
              layer.bindTooltip(tooltipContent).openTooltip();
            },
          }).addTo(map);

          setGeoLayer(newGeoLayer);
        })
        .catch((error) => {
          console.log('Error loading shapefile:', error);
        });
    }
  }, [map, selectedFile]);

  function fetchData() {
    const currentParams = apiTypeParams[apiType] || apiTypeParams.default;

    const filteredParams = {};
    for (const param of currentParams) {
      filteredParams[param] = apiParams[param];
    }
  if(apiType==='compareMaxP'){
    axios
    .get(`http://localhost:8000/api/enpoint/${apiType}`, {
      params: filteredParams,
    })
      .then((response) => {
        const labels = response.data.ScalableMaxP_Labels[0];
        const data = response.data;
        setLabels(response.data.ScalableMaxP_Labels[0]);
        // Step 3: Parse the data and update the state with the new metric values
        setMetrics({
          metric1: data.ScalableMaxP_ExecutionTime,
          metric2: data.LibraryMaxP_ExecutionTime,
          metric3: data['Total_SpeedUp(Percentage)'],
        });

        // Create a mapping from labels to colors
        const labelColorMap = {};
        labels.forEach((label) => {
          if (!labelColorMap[label]) {
            labelColorMap[label] = getRandomColor();
          }
        });

        setGeoLayer((currentGeoLayer) => {
          let labelIndex = 0;
          currentGeoLayer.eachLayer(function (layer) {
            const label = labels[labelIndex];
            const color = labelColorMap[label];
            layer.setStyle({ fillColor: color });
            layer.bindTooltip(`${label}`);
            labelIndex += 1;
          });

          return currentGeoLayer;
        });
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }
  else{
    axios
    .get(`http://localhost:8000/api/endpoint/${apiType}`, {
      params: filteredParams,
    })
      .then((response) => {
        const labels = response.data.labels;

        // Create a mapping from labels to colors
        const labelColorMap = {};
        labels.forEach((label) => {
          if (!labelColorMap[label]) {
            labelColorMap[label] = getRandomColor();
          }
        });

        setGeoLayer((currentGeoLayer) => {
          let labelIndex = 0;
          currentGeoLayer.eachLayer(function (layer) {
            const label = labels[labelIndex];
            const color = labelColorMap[label];
            layer.setStyle({ fillColor: color });
            layer.bindTooltip(`${label}`);
            labelIndex += 1;
          });

          return currentGeoLayer;
        });
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
    }
  }

  const handleChange = (event) => {
    setSelectedFile(event.target.value);
  };

  const handleApiParamChange = (event) => {
    const { name, value } = event.target;
    setApiParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };
  
  const getColor = (value) => {
    return '#000';
  };

  const getRandomColor = () => {
    let color = '#';
    const letters = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
<UI
    selectedFile={selectedFile}
    handleChange={handleChange}
    files={files}
    fetchData={fetchData}
    apiParams={apiParams}
    handleApiParamChange={handleApiParamChange}
    apiType={apiType} // Pass apiType
    handleApiTypeChange={handleApiTypeChange} // Pass handleApiTypeChange
     metrics={metrics}
     onFileChange={onFileChange}
     onFileUpload={onFileUpload}
     labels1={labels1}
  />
  );
}

export default App;
