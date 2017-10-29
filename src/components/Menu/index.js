import React from 'react';
import styled from 'styled-components';
// config
import { API_URL } from './../../config';

const MenuContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 0;
  z-index: 1000;
  margin-left: 20px;
  zoom: 1.25;
  background-color: rgba(108,154,173,0);
  border-radius: 50%;
  height: 35px;
  width: 36px;
  line-height: 49px;
  .menu-button {
    border: 0;
    background-color: rgba(108,154,173,0);
    .material-icons {
      color: #fff;
      cursor: pointer;
    }
  }
  .overlay-container {
    background-color: rgba(108,154,173,0.6);
    width: 80vw;
    height: 72vh;
    position: absolute;
    top: 43px;
    left: -20px;
    .buttons-container {
      position: absolute;
      top: 0px;
      bottom: 0;
      right: 0;
      left: 0;
      width: 14vw;
      height: 20vh;
      margin: auto;
      .button {
        width: 100%;
        border: 0;
        padding: 5px 10px;
        cursor: pointer;
      }
    }
  }
`;

const openMenu = function () {
  console.log('Menu opened');
  this.setState({isOpened: !this.state.isOpened});
}


class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      isTraining: false
    }
  }
  triggerPolling() {
    const year = 2016;
    const url = `${API_URL}/trainSystem?year=${year}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => resolve(response.json()))
        .catch(err => {
          reject(err)
        });
    });
  }
  trainData() {
      console.log('Training data');
      this.triggerPolling()
      .then(response => {
        const id = response.processId;
        const url = `${API_URL}/getStatus?objId=${id}`;
        const pollBackend = () => {
          fetch(url)
          .then(response => response.json())
          .then(response => {
            if (response.status === 'completed') {
              clearInterval(pollingId);
            }
            console.log(response);
          })
          .catch(err => {
            clearInterval(pollingId);
            console.error(err);
          });
        }
        const pollingId = setInterval(pollBackend, 5000);
      })
      .catch(err => {
        console.log(err);
      });
  }
  returnToMap() {
      console.log('Returning to Map');
  }
  render() {
    return (
      <MenuContainer>
        <button className="menu-button" onClick={openMenu.bind(this)}>
          <i className="material-icons">&#xE5D2;</i>
        </button>
        {
          (this.state.isOpened ? (
            <div className="overlay-container">
              <div className="buttons-container">
                <button type="button" className="button" name="trainData" onClick={this.trainData.bind(this)}>Train Data</button>
                <button type="button" className="button" name="returnToMap" onClick={this.returnToMap.bind(this)}>Return to Map</button>
              </div>
            </div>
          ) : null)
        }
      </MenuContainer>
    );
  }
}

export default Menu;
