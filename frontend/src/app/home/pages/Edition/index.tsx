import React, {useState} from 'react';
import { Wallpaper } from './style';
import MusicForm from '../../components/MusicFromsRegister';
import AlbumForm from '../../components/AlbumFormsRegister';
import ReviewForm from '../../components/ReviewFormsRegister';
import { MusicListContainer } from '../TopRated/style';
const Edition: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <Wallpaper>
      <MusicListContainer> 
        <button data-cy="add_musica" onClick={() => setIsOpen(true)}>Criar música</button>
        <button data-cy="add_album" onClick={() => setIsOpen2(true)}>Criar álbum</button>
        <button data-cy="add_review" onClick={() => setIsOpen3(true)}>Criar review</button>
      <MusicForm isOpen={isOpen} setIsOpen={setIsOpen}/>
      <AlbumForm isOpen={isOpen2} setIsOpen={setIsOpen2}/>
      <ReviewForm isOpen={isOpen3} setIsOpen={setIsOpen3}/>
      </MusicListContainer>
    </Wallpaper>
  );
};

export default Edition;