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
  itemId: string | null;
}

const EditModal: React.FC<EditModalProps> = ({ open, onClose, itemId}) => {


  useEffect(() => {
    if (open && itemId) {
      let apiUrl: string;
      
      apiUrl = `http://127.0.0.1:8000/reviews/${itemId}`;

      // Fetch data from the backend using Axios (replace with your API endpoint)
      axios.get(apiUrl).then((response) => {
          console.log(response.data);
          setFormData(response.data);
      });
    }
  }, [open, itemId]);

  const [formData, setFormData] = useState({
    // Define your form fields here
    id: '',
    title: '',
    description: '',
    author: '',
    rating: '',
    song: '',
    songTitle: '',
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
    apiUrl = `http://127.0.0.1:8000/reviews/${itemId}`;

    if(Number(formData.rating) > 5){
      formData.rating = '5';
    } else if(Number(formData.rating) < 0){
      formData.rating = '0';
    }

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

    // After submitting, close the modal
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align='center'>Editar review</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={2} style={{marginTop: '5px'}}>
            <Grid item xs={6}>
              <TextField
                required
                name="title"
                label="Título"
                fullWidth
                value={formData.title}
                onChange={handleInputChange}
                color="secondary"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="description"
                label="Descrição"
                fullWidth
                value={formData.description}
                onChange={handleInputChange}
                color="secondary"
                style={{ marginBottom: '8px' }}
                type="text"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="author"
                label="Autor"
                fullWidth
                value={formData.author}
                onChange={handleInputChange}
                color="secondary"
                style={{ marginBottom: '8px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="rating"
                label="Classificação"
                fullWidth
                value={formData.rating}
                onChange={handleInputChange}
                color="secondary"
                type="number"
                inputProps={{ max: 5 }}
                style={{ marginBottom: '8px' }} 
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="song"
                label="Música"
                fullWidth
                value={formData.song}
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
