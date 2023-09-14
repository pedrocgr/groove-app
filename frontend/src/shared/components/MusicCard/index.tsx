import React, { useState } from "react";
import { MusicContainer, MusicImg, MusicArtist, MusicName } from "./style";
import MusicDetail from "../../../app/home/components/modalDetails";

const MusicCard: React.FC<{
  artist: string;
  name: string;
  image: string;
  id: string;
  data_cy-topRated?: string;
  data2_cy-topRated?: string;
}> = ({ artist, name, image, id, data_cy-topRated, data2_cy-topRated }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MusicContainer>
      <MusicImg 
      style={{ backgroundImage: `url(${image})`}} 
      onClick={() => setIsOpen(true)}
      data-cy={data2_cy-topRated} 
      />
      <MusicName data-cy={data_cy-topRated}>{name}</MusicName>
      <MusicArtist>{artist}</MusicArtist>
      <MusicDetail isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
    </MusicContainer>
  );
};

export default MusicCard;
