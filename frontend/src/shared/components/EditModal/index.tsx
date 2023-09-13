import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
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
    image_url: '',
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
        });
    } else if (isEditingAlbum) {
        apiUrl = `http://127.0.0.1:8000/albums/${itemId}`;

        // Fetch data from the backend using Axios (replace with your API endpoint)
        axios.put(apiUrl, formData).then((response) => {
            console.log(response);
            console.log(response.data);
        });
    }

    // After submitting, close the modal
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditingAlbum ? 'Editar álbum' : 'Editar música'}</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            name="title"
            label="Nome"
            fullWidth
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            name="artist"
            label="Artista"
            fullWidth
            value={formData.artist}
            onChange={handleInputChange}
          />
          <TextField
            name="genre"
            label="Gênero"
            fullWidth
            value={formData.genre}
            onChange={handleInputChange}
          />
          <TextField
            name="release_year"
            label="Ano de lançamento"
            fullWidth
            value={formData.release_year}
            onChange={handleInputChange}
          />
          <TextField
            name="image_url"
            label="Link para imagem"
            fullWidth
            value={formData.image_url}
            onChange={handleInputChange}
          />
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
