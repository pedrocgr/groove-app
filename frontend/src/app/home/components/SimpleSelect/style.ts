import styled from 'styled-components';

export const ReactSelectContainer = styled.div`
  width: 100%;
  .css-1rhbuit-multiValue{
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
  }
  z-index: 1000000000;
  .ant-select-show-search.ant-select-multiple .ant-select-selector {
    cursor: pointer;
    border: 1px solid #2C2F3480;
    border-radius: 4px;

    padding: 4px;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    cursor: pointer;
    border: 1px solid #2C2F3480;
    border-radius: 4px;
  }

  .ant-select-multiple {
    font-weight: 500;
    .ant-select-selection-item {
      border: 2px solid black;
      border-radius: 5px;
      &:hover {
        background-color: #2C2F34;
        color: #f0f0f0;
        
        .ant-select-selection-item-remove {
          color: white;
        }
      }
    }
    .ant-select-selection-item-remove {
      color: black;
    }
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    padding: 4px 7px;
    height: 38px;
  }

  .ant-select-single .ant-select-selector .ant-select-selection-search {
    left: 8px;
    display: flex;
    align-items: center;
  }
  
  .ant-select{
    width: 100%;
    outline: none;
  }
`;

