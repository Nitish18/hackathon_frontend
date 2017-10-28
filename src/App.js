import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import MapBoxGLCompare from 'mapbox-gl-compare';
import Slider from 'rc-slider';
import styled from 'styled-components';
import { addHeatMap, getGeoJsonData } from './helpers';
import { API_URL } from './config';
import 'rc-slider/assets/index.css';
import 'roboto-fontface';
import './slider.css';
import './App.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const AppWrapper = styled.div``;
const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
`;
const SliderContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 64px;
  background: linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0));
  overflow: hidden;
`;
const Header = styled.div`
  position: absolute;
  height: 64px;
  top: 0;
  width: 100vw;
  z-index: 100;
  background: #fff;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0));
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.span`
  font-family: 'roboto';
  font-size: 32px;
  color: #fff;
  letter-spacing: 0.2em;
`;

const years = {
  0: 2010,
  10: 2011,
  20: 2012,
  30: 2013,
  40: 2014,
  50: 2015,
  60: 2016,
  70: 2017,
  80: 2018,
  90: 2019,
  100: 2020
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
    this.lightThemeMap = new mapboxgl.Map({
      container: this.lightThemeMap,
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 2,
    });
    // create a dark themed map
    this.darkThemeMap = new mapboxgl.Map({
      container: this.darkThemeMap,
      style: 'mapbox://styles/mapbox/dark-v9',
      zoom: 2,
    });
    // adding a heatmap layers to both the maps
    addHeatMap(this.lightThemeMap);
    addHeatMap(this.darkThemeMap);
    // create a mapbox-gl-compare map
    new MapBoxGLCompare(this.lightThemeMap, this.darkThemeMap, {
      // mousemove: true
    });
  }
  onYearChange = value => {
    const year = years[value];
    const url = `${API_URL}/getData?year=${year}`;
    fetch(url)
      .then(response => response.json())
      .then(({ data }) => {
        this.lightThemeMap.getSource('patients').setData(getGeoJsonData(data));
        this.darkThemeMap.getSource('patients').setData(getGeoJsonData(data));
      });
  }
  render() {
    return (
      <AppWrapper>
        <Header>
          <Logo>predicto</Logo>
        </Header>
        <MapContainer innerRef={map => { this.lightThemeMap = map; }} />
        <MapContainer innerRef={map => { this.darkThemeMap = map; }} />
        <InputSlider marks={years} onChange={this.onYearChange} />
      </AppWrapper>
    );
  }
}

export default App;
