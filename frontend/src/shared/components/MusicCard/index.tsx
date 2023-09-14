import React, { useState } from "react";
import { MusicContainer, MusicImg, MusicArtist, MusicName } from "./style";
import MusicDetail from "../../../app/home/components/modalDetails";

const MusicCard: React.FC<{
  artist: string;
  name: string;
  image: string;
  id: string;
  data_cy?: string;
  dataa_cy?: string;
}> = ({ artist, name, image, id, data_cy, dataa_cy}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MusicContainer>
      <MusicImg
        style={{ backgroundImage: `url(${image})` }}
        onClick={() => setIsOpen(true)}
        data-cy={dataa_cy}
      />
      <MusicName data-cy={data_cy}>{name}</MusicName>
      <MusicArtist>{artist}</MusicArtist>
      <MusicDetail isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
    </MusicContainer>
  );
};

export default MusicCard;
