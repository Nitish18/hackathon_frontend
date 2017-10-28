import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import Slider from 'rc-slider';
import styled from 'styled-components';
import { addHeatMap } from './helpers';
import 'rc-slider/assets/index.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const style = {
  width: '100vw',
  height: '100vh'
};

const styles = {
  slider: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 64,
    background: 'rgba(0,0,0,0.9)',
  }
};

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
    <div style={styles.slider}>
      <Slider min={-10} marks={marks} step={null} defaultValue={20} onChange={onChange} />
    </div>
  );
};

class App extends Component {
  componentDidMount() {
    this.mapboxMapRef = new mapboxgl.Map({
      container: this.map,
      style: 'mapbox://styles/mapbox/dark-v9',
      zoom: 2,
    });
    addHeatMap(this.mapboxMapRef);
  }
  onYearChange = year => {
    const filters = ['==', 'year', year];
    this.mapboxMapRef.setFilter('earthquakes-heat', filters);
    this.mapboxMapRef.setFilter('earthquakes-point', filters);
  }
  render() {
    return (
      <div>
        <MapContainer style={style} innerRef={map => { this.map = map; }} />
        <InputSlider onChange={this.onYearChange} marks={years} />
      </div>
    );
  }
}

export default App;
