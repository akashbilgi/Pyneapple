import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import * as shapefile from 'shapefile';

const MapContainer = ({ selectedFile, labels, mapIndex }) => {
  const [map, setMap] = useState(null);
  const [geoLayer, setGeoLayer] = useState(null);

  useEffect(() => {
    if (!map) {
      const mymap = L.map(`mapid-${mapIndex}`).setView([34.0522, -118.2437], 10);
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

  useEffect(() => {
    if (labels && labels.length > 0) {
      // Create a mapping from labels to colors
      const labelColorMap = {};
      labels.forEach((label) => {
        if (!labelColorMap[label]) {
          labelColorMap[label] = getRandomColor();
        }
      });

      if (geoLayer) {
        geoLayer.eachLayer(function (layer) {
          const label = layer.feature.properties.POP;
          const color = labelColorMap[label];
          layer.setStyle({ fillColor: color });
          layer.bindTooltip(`${label}`);
        });
      }
    }
  }, [labels, geoLayer]);

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

  return <div id={`mapid-${mapIndex}`} style={{ height: '100%', width: '100%' }} />;
};

export default MapContainer;