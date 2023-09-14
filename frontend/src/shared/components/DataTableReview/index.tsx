import React, { useEffect, useState } from 'react';
import { IconButton, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditModalReview from '../EditModalReview';
import Swal from 'sweetalert2'
import axios from 'axios';

interface Data {
  id: string;
  title: string;
  description: string;
  author: string;
  rating: number;
  song: string;
  songTitle: string;
}

const DataTableReview: React.FC = () => {

  const [data, setData] = useState<Data[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Add state to track the item being edited
  const [editItemId, setEditItemId] = useState<string | null>(null);

  useEffect(() => {
    let apiUrl: string;

    apiUrl = 'http://127.0.0.1:8000/reviews/';
    axios.get(apiUrl).then((response) => {
        console.log(response.data);
        setData(response.data.reviews);
    });
  }, []);


  const handleDelete = (id: string) => {
    let apiUrl: string;

    Swal.fire({
      title: 'Você tem certeza?',
      text: "Esta ação não é reversível!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'secondary',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
          apiUrl = `http://127.0.0.1:8000/reviews/${id}`;

          axios.delete(apiUrl).then((response) => {
              console.log(response.data);
              console.log(response);

              if(response.status === 200){
                // Remove the deleted item from the state
                setData((prevData) => prevData.filter((item) => item.id !== id));
                
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
              }
              else{
                Swal.fire(
                  'Error!',
                  'Your file has not been deleted.',
                  'error'
                )
              }
          });  
      }
    }) 
  };

  const handleEdit = (id: string) => {
    // Open the edit modal
    setIsEditModalOpen(true);
    setEditItemId(id);
  };

  const handleCloseEditModal = () => {
    // Close the edit modal
    setIsEditModalOpen(false);
    setEditItemId(null);
  };

  return (
    <TableContainer component={Paper} style={{ marginBottom: '20px', maxHeight: '50vh' }}>
      <Table>
        <TableHead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
          <TableRow>
            <TableCell align="center">Título</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Autor</TableCell>
            <TableCell align="center">Classificação</TableCell>
            <TableCell align="center">Música</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? ( // Check if there's no data
            <TableRow>
                <TableCell align="center" colSpan={6}>No data available</TableCell>
            </TableRow>
          ) : (
          data.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.author}</TableCell>
              <TableCell align="center">{row.rating}</TableCell>
              <TableCell align="center">{row.songTitle}</TableCell>
              <TableCell align="center">
                <IconButton 
                    color="primary" 
                    onClick={() => handleEdit(row.id)}
                >
                    <EditIcon />
                </IconButton>

                <IconButton 
                    color="secondary" 
                    onClick={() => handleDelete(row.id)}
                >
                    <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        )}
        </TableBody>
      </Table>
    
    <EditModalReview
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        itemId={editItemId}
    />
    </TableContainer>

    
  );
};

export default DataTableReview;
