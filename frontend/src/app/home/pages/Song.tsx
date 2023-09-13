import { useState } from "react";
import SearchFilterComponent from "../../../shared/components/SearchFilterComponent";
import { useParams } from "react-router-dom";
import { SongCard } from "../components/SongCard";
import { song } from "./mock";
// import useSWR from 'swr'

export const Song = () => {
  const { songId } = useParams<{ songId: string }>();
  // const { data, error, isLoading } = useSWR(`http://localhost:8000/songs/${songId}`, (...args) => fetch(...args).then(res => res.json()));

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Lógica para executar a pesquisa com base na query
  };

  const handleFilter = () => {
    // Lógica para aplicar o filtro
  };

  return (
    <>
      <SearchFilterComponent
        onSearch={handleSearch}
        onFilter={handleFilter}
        searchQuery={searchQuery}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "2rem",
        }}
      >
        <SongCard
          title={song.title}
          songCover={song.cover}
          artistName={song.artist}
          genre={song.genre}
          releaseYear={song.release_year}
          averageRating={song.average_rating}
          amountReview={song.number_of_ratings}
          spotifyLink={song.available_on.Spotify}
          appleMusicLink={song.available_on.AppleMusic}
          youtubeLink={song.available_on.YouTube}
          deezerLink={song.available_on.Deezer}
        />
      </div>
    </>
  );
};
