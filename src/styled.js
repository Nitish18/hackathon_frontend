import styled from 'styled-components';

export const AppWrapper = styled.div``;
export const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
`;
export const SliderContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 64px;
  background: linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0));
  overflow: hidden;
`;
export const Header = styled.div`
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
export const Logo = styled.span`
  font-family: 'roboto';
  font-size: 32px;
  color: #fff;
  letter-spacing: 0.2em;
`;
