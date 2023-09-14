import React, { useEffect } from "react";
import { Wallpaper, MusicListContainer } from "./style";
import MusicCard from "../../../../shared/components/MusicCard";
import axios from "axios";

const TopRated: React.FC = () => {
  interface SearchResult {
    id: string;
    title: string;
    artist: string;
    available_on: object;
    image_url: string;
    popularity: number;
    release_year: number;
  }
  interface ReponseTrue {
    albums: SearchResult[];
    songs: SearchResult[];
  }
  interface ResultReponse {
    data: ReponseTrue[];
    songs: SearchResult[];
  }

  const handleResponse = (response: ResultReponse) => {
    const aux = [];
    response.songs.forEach((song) => {

      aux.push(song);
    }
    );
    setTrueMusicList(aux);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/songs/songs_r/top-rated', {
      });
      
      const data: SearchResult[] = response.data;

      handleResponse(response.data);

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const [trueMusicList, setTrueMusicList] = React.useState<SearchResult[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Wallpaper>
      <MusicListContainer>
        {trueMusicList.map((music, index) => (
          <MusicCard
            key={index}
            artist={music.artist}
            name={music.title}
            image={music.image_url}
            id={music.id}
            data_cy-topRated={music.title}
            data2_cy-topRated={music.image_url}
          />
        ))} 
      </MusicListContainer>
    </Wallpaper>
  );
};

export default TopRated;
