import styled from 'styled-components';

export const Wallpaper = styled.div`
  background: linear-gradient(to bottom, #ff66c4, #ffde59);
  min-height: 100vh; /* Isso garante que o gradiente cubra toda a altura da tela */
  display: grid;
`;

export const TableDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 60vw;
  gap: 12%;
  margin: auto;
  margin-top: 1%;
`;

export const LabelDiv = styled.div`
  background-color: #ff66c4;
  display: flex;
  margin: auto;
  margin-top: 150px;
  // background-color: red;
  flex-basis: 100%;
  font-weight: 100;
  // width: 100%;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.30); //3px 5px 10px black;
  border-radius: 50px;
`;

export const MusicListContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1000px;
    gap: 70px;
    margin: auto;
    padding-top: 160px;
`;