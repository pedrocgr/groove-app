import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import Swal from 'sweetalert2'
import axios from 'axios';

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  isEditingAlbum: boolean;
  itemId: string | null;
}

const EditModal: React.FC<EditModalProps> = ({ open, onClose, isEditingAlbum, itemId}) => {


  useEffect(() => {
    if (open && itemId) {
      let apiUrl: string;

      if (!isEditingAlbum) {
          apiUrl = `http://127.0.0.1:8000/songs/${itemId}`;

          // Fetch data from the backend using Axios (replace with your API endpoint)
          axios.get(apiUrl).then((response) => {
              console.log(response.data);
              setFormData(response.data);
          });
      } else if (isEditingAlbum) {
          apiUrl = `http://127.0.0.1:8000/albums/${itemId}`;

          // Fetch data from the backend using Axios (replace with your API endpoint)
          axios.get(apiUrl).then((response) => {
              console.log(response.data);
              setFormData(response.data);
          });
      }
    }
  }, [open, itemId, isEditingAlbum]);

  const [formData, setFormData] = useState({
    // Define your form fields here
    title: '',
    artist: '',
    genre: '',
    release_year: '',
    cover: '',
    available_on: {
      'youtube_link': '',
      'deezer_link': '',
      'spotify_link': '',
      'apple_music_link': '',
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // console.log(formData);
  };

  const handleSubmit = () => {
    // Handle form submission (edit or add)
    // You can send data to your backend API here
    // console.log(formData);

    let apiUrl: string;
    if (!isEditingAlbum) {
        apiUrl = `http://127.0.0.1:8000/songs/${itemId}`;

        // Fetch data from the backend using Axios (replace with your API endpoint)
        axios.put(apiUrl, formData).then((response) => {
            console.log(response);
            console.log(response.data);

            if(response.status == 200){
              Swal.fire({
                icon: 'success',
                title: 'Música editada com sucesso!',
                showConfirmButton: false,
                timer: 1500
              })
            } else {
              Swal.fire({ 
                icon: 'error',
                title: 'Oops...',
                text: 'Algo deu errado!',
              })
            }
        });
    } else if (isEditingAlbum) {
        apiUrl = `http://127.0.0.1:8000/albums/${itemId}`;

        // Fetch data from the backend using Axios (replace with your API endpoint)
        axios.put(apiUrl, formData).then((response) => {
          console.log(response);
          console.log(response.data);

          if(response.status == 200){
            Swal.fire({
              icon: 'success',
              title: 'Música editada com sucesso!',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({ 
              icon: 'error',
              title: 'Oops...',
              text: 'Algo deu errado!',
            })
          }
      });
    }

    // After submitting, close the modal
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align='center'>{isEditingAlbum ? 'Editar álbum' : 'Editar música'}</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={2} style={{marginTop: '5px'}}>
            <Grid item xs={6}>
              <TextField
                required
                name="title"
                label="Nome"
                fullWidth
                value={formData.title}
                onChange={handleInputChange}
                color="secondary"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="artist"
                label="Artista"
                fullWidth
                value={formData.artist}
                onChange={handleInputChange}
                color="secondary"
                style={{ marginBottom: '8px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="genre"
                label="Gênero"
                fullWidth
                value={formData.genre}
                onChange={handleInputChange}
                color="secondary"
                style={{ marginBottom: '8px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="release_year"
                label="Ano de lançamento"
                fullWidth
                value={formData.release_year}
                onChange={handleInputChange}
                color="secondary"
                type="number"
                style={{ marginBottom: '8px' }} 
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="image_url"
                label="Link para imagem"
                fullWidth
                value={formData.cover}
                onChange={handleInputChange}
                color="secondary"
                style={{ marginBottom: '8px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="available_on.youtube_link"
                label="Youtube link"
                fullWidth
                value={formData.available_on.youtube_link}
                onChange={handleInputChange}
                color="secondary"
                style={{ marginBottom: '8px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="available_on.spotify_link"
                label="Spotify link"
                fullWidth
                value={formData.available_on.spotify_link}
                onChange={handleInputChange}
                color="secondary"
                style={{ marginBottom: '8px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="available_on.deezer_link"
                label="Deezer link"
                fullWidth
                value={formData.available_on.deezer_link}
                onChange={handleInputChange}
                color="secondary"
                style={{ marginBottom: '8px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="available_on.apple_music_link"
                label="Apple Music link"
                fullWidth
                value={formData.available_on.apple_music_link}
                onChange={handleInputChange}
                color="secondary"
                style={{ marginBottom: '8px' }}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
