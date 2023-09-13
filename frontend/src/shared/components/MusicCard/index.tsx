import React, { useState } from "react";
import { MusicContainer, MusicImg, MusicArtist, MusicName } from "./style";
import MusicDetail from "../../../app/home/components/modalDetails";

const MusicCard: React.FC<{
  artist: string;
  name: string;
  image: string;
  id: string;
}> = ({ artist, name, image, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MusicContainer>
      <MusicImg style={{ backgroundImage: `url(${image})`}} onClick={() => setIsOpen(true)} />
      <MusicName>{name}</MusicName>
      <MusicArtist>{artist}</MusicArtist>
      <MusicDetail isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
    </MusicContainer>
  );
};

export default MusicCard;
