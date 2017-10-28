// dependencies
import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapBoxGLCompare from 'mapbox-gl-compare';
import Slider from 'rc-slider';
// helpers
import { addHeatMap, getGeoJsonData } from './helpers';
// config
import { API_URL, years } from './config';
// components
import {
  AppWrapper,
  MapContainer,
  SliderContainer,
  Header,
  Logo,
} from './styled';
import Legend from './components/Legend';
// assets
import 'rc-slider/assets/index.css';
import 'roboto-fontface';
import './slider.css';
import './App.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const InputSlider = ({ marks, onChange }) => {
  return (
    <SliderContainer>
      <Slider
        min={-10}
        marks={marks}
        step={null}
        defaultValue={0}
        max={110}
        onChange={onChange}
      />
    </SliderContainer>
  );
};

class App extends React.Component {
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
    const rows = [
      { color: '#07c', text: 'typhoid', count: '5.3m' },
      { color: 'orange', text: 'malaria', count: '2.8m' },
      { color: 'red', text: 'dengue', count: '8.1m' },
      { color: 'purple', text: 'alzheimer', count: '0.3m' },
      { color: 'green', text: 'Lymphosarcoma of the intestine', count: '0.01m' },
    ]
    return (
      <AppWrapper>
        <Header>
          <Logo>predicto</Logo>
        </Header>
        <MapContainer innerRef={map => { this.lightThemeMap = map; }} />
        <MapContainer innerRef={map => { this.darkThemeMap = map; }} />
        <InputSlider marks={years} onChange={this.onYearChange} />
        <Legend rows={rows} />
      </AppWrapper>
    );
  }
}

export default App;
