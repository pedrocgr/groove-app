import React, { useState } from 'react';
import RegisterInput from '../Input';
import ModalComponent from '../Modal-ui';
import axios from 'axios';
import { useGlobalAlert } from '../../global/GlobalProvider';

const MusicForm: React.FC<{
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
  }> = ({ isOpen, setIsOpen }) => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [artist, setArtist] = useState('');
    const [linkYouTube, setLinkYouTube] = useState('');  // Estado para link do YouTube
    const [linkDeezer, setLinkDeezer] = useState('');  // Estado para link do Deezer
    const [linkSpotify, setLinkSpotify] = useState('');  // Estado para link do Spotify
    const [imageLink, setImageLink] = useState('');  // Estado para link da imagem
    const [linkApple, setlinkApple] = useState('');  // Estado para link do Apple Music
    const [, setOptions] = useGlobalAlert();


    const handleSubmit = async (e) => {
        console.log("teste");

        const formData = {
            'title': title,
            'genre': genre,
            'release_year': Number(year),
            'artist': artist,
            'available_on': {
                'youtube_link': linkYouTube,
                'deezer_link': linkDeezer,
                'spotify_link': linkSpotify,
                'apple_music_link': linkApple,
            },
            'cover': imageLink
        };

        console.log(formData);

        try {
            const response = await axios.post('http://127.0.0.1:8000/songs/create', formData);
            console.log(response.data);
            console.log(response.data.status)
            console.log(setOptions)
            setOptions({
                text:
                    "Música '"+ title +"' foi criada com sucesso",
                type: 'success',
                open: true,
            });
            // if(response === 20){

            // }
            // else{
            //     setOptions({
            //         text:
            //             'É necessário visualizar pelo menos uma tabela para que seja possível gerar CSV de tabelas.',
            //         type: 'success',
            //         open: true,
            //     });
            // }
            setTitle('');
            setGenre('');
            setYear('');
            setArtist('');
            setLinkYouTube('');
            setLinkDeezer('');
            setLinkSpotify('');
            setImageLink('');
            setlinkApple('');
            setIsOpen(false);
        } catch (error) {
            console.error("Error posting music data:", error);
        }
    };

    return (
        <ModalComponent
            open={isOpen}
            setOpen={() => {setIsOpen(false)}}
            title="Criação de música"
            textExit="Cancelar"
            textSubmit="Salvar"
            onClick={(e) => handleSubmit(e)}
            id="music_register"
            onCancel={() => {setIsOpen(false)}}
            isBold={false}
            disabledSubmit={false}
            children={
                <form>
                    <div>
                        <label>Titulo:</label>
                        <RegisterInput
                            data_cy="title"
                            value={title}
                            onChange={(e) => setTitle(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Gênero:</label>
                        <RegisterInput
                            data_cy="genre"     
                            value={genre}
                            onChange={(e) => setGenre(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Artista:</label>
                        <RegisterInput
                            data_cy="artist" 
                            value={artist}
                            onChange={(e) => setArtist(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Ano de lançamento:</label>
                        <RegisterInput
                            data_cy="release_year" 
                            value={year}
                            onChange={(e) => setYear(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Link do YouTube:</label>
                        <RegisterInput
                            data_cy="yt" 
                            value={linkYouTube}
                            onChange={(e) => setLinkYouTube(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Link do Deezer:</label>
                        <RegisterInput
                            data_cy="ld" 
                            value={linkDeezer}
                            onChange={(e) => setLinkDeezer(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Link do Spotify:</label>
                        <RegisterInput
                            data_cy="sp" 
                            value={linkSpotify}
                            onChange={(e) => setLinkSpotify(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Link do Apple Music:</label>
                        <RegisterInput
                            data_cy="amp" 
                            value={linkApple}
                            onChange={(e) => setlinkApple(e)}
                            required
                        />
                        </div>
                    <div>
                        <label>Link da Imagem:</label>
                        <RegisterInput
                            data_cy="img" 
                            value={imageLink}
                            onChange={(e) => setImageLink(e)}
                            required
                        />
                    </div>
                </form>
            }
        />
    );
};

export default MusicForm;
