import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import MapBoxGLCompare from 'mapbox-gl-compare';
import Slider from 'rc-slider';
import styled from 'styled-components';
import { addHeatMap } from './helpers';
import 'rc-slider/assets/index.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
`
const SliderContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 64px;
  background: rgba(255, 255, 2555, 0.5);
`;

const years = {
  0: 1999,
  10: 2000,
  20: 2001,
  30: 2002,
  40: 2003,
  50: 2004,
  60: 2005,
  70: 2006,
  80: 2007,
  90: 2008,
  100: ''
};

const InputSlider = ({ marks, onChange }) => {
  return (
    <SliderContainer>
      <Slider min={-10} marks={marks} step={null} defaultValue={20} onChange={onChange} />
    </SliderContainer>
  );
};

class App extends Component {
  componentDidMount() {
    // create a light themed map
    const lightThemeMap = new mapboxgl.Map({
      container: this.lightThemeMap,
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 2,
    });
    // create a dark themed map
    const darkThemeMap = new mapboxgl.Map({
      container: this.darkThemeMap,
      style: 'mapbox://styles/mapbox/dark-v9',
      zoom: 2,
    });
    // adding a heatmap layers to both the maps
    addHeatMap(lightThemeMap);
    addHeatMap(darkThemeMap);
    // create a mapbox-gl-compare map
    new MapBoxGLCompare(lightThemeMap, darkThemeMap, {
      // mousemove: true
    });
  }
  onYearChange = year => {
    const filters = ['==', 'year', year];
    this.mapboxMapRef.setFilter('earthquakes-heat', filters);
    this.mapboxMapRef.setFilter('earthquakes-point', filters);
  }
  render() {
    return (
      <div>
        <MapContainer innerRef={map => { this.lightThemeMap = map; }} />
        <MapContainer innerRef={map => { this.darkThemeMap = map; }} />
        <InputSlider marks={years} />
      </div>
    );
  }
}

export default App;
