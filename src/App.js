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
  MenuContainer,
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

const Menu = onClick => {
  return (
    <MenuContainer>
      <i className="material-icons">&#xE5D2;</i>
    </MenuContainer>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingComplete: false,
      legendRows: []
    };
  }
  componentDidMount() {
    // create a light themed map
    this.lightThemeMapRef = new mapboxgl.Map({
      container: this.lightThemeMap,
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 2,
    });
    // adding a heatmap layers to both the maps
    addHeatMap(this.lightThemeMapRef);
    this.fetchLegend(years[0]);
  }
  onTrainingComplete = () => {
    this.setState({ trainingComplete: true }, () => {
      // create a dark themed map
      this.darkThemeMapRef = new mapboxgl.Map({
        container: this.darkThemeMap,
        style: 'mapbox://styles/mapbox/dark-v9',
        zoom: 2,
      });
      addHeatMap(this.darkThemeMapRef);
      // create a mapbox-gl-compare map
      new MapBoxGLCompare(this.lightThemeMapRef, this.darkThemeMapRef, {
        // mousemove: true
      });
    });
  }
  onYearChange = value => {
    const year = years[value];
    const url = `${API_URL}/getData?year=${year}`;
    fetch(url)
      .then(response => response.json())
      .then(({ data }) => {
        const geoJsonData = getGeoJsonData(data);
        this.lightThemeMapRef.getSource('patients').setData(geoJsonData);
        if (this.state.trainingComplete) {
          this.darkThemeMapRef.getSource('patients').setData(geoJsonData);
        }
        this.fetchLegend(year);
      })
      .catch(err => {
        console.error(err);
      });
  }
  fetchLegend = year => {
    const url = `${API_URL}/getLegend?year=${year}`;
    fetch(url)
      .then(response => response.json())
      .then(legendRows => {
        this.setState({ legendRows });
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    return (
      <AppWrapper>
        <Menu />
        <Header>
          <Logo>predicto</Logo>
        </Header>
        <MapContainer innerRef={map => { this.lightThemeMap = map; }} />
        {
          this.state.trainingComplete &&
          <MapContainer innerRef={map => { this.darkThemeMap = map; }} />
        }
        <InputSlider marks={years} onChange={this.onYearChange} />
        <Legend rows={this.state.legendRows} />
      </AppWrapper>
    );
  }
}

export default App;
