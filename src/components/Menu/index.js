import React from 'react';
import styled from 'styled-components';

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
      isOpened: false
    }
  }
  render() {
    return (
      <MenuContainer>
        <button className="menu-button" onClick={openMenu.bind(this)}>
          <i className="material-icons">&#xE5D2;</i>
        </button>
        {
          this.state.isOpened && <div className="overlay-container"></div>
        }
      </MenuContainer>
    );
  }
}

export default Menu;
