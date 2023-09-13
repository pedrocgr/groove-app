import React, { useEffect, useState } from 'react';
import { IconButton, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from '../EditModal';
import axios from 'axios';

interface Data {
    id: string;
    title: string;
    artist: string;
    genre: string;
    release_year: number;
}

interface DataTableProps {
    contentType: 'songs' | 'albums'; // Prop to specify the content type
}

const DataTable: React.FC<DataTableProps> = ({contentType}) => {

  const [data, setData] = useState<Data[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditingAlbum, setIsEditingAlbum] = useState(false);

  // Add state to track the item being edited
  const [editItemId, setEditItemId] = useState<string | null>(null);

  useEffect(() => {
    let apiUrl: string;

    // Determine the API route based on the contentType prop
    if (contentType === 'songs') {
        apiUrl = 'http://127.0.0.1:8000/songs/';

        // Fetch data from the backend using Axios (replace with your API endpoint)
        axios.get(apiUrl).then((response) => {
            console.log(response.data);
            setData(response.data.songs);
        });
    } else if (contentType === 'albums') {
        apiUrl = 'http://127.0.0.1:8000/albums/';

        // Fetch data from the backend using Axios (replace with your API endpoint)
        axios.get(apiUrl).then((response) => {
            console.log(response.data);
            setData(response.data.albums);
        });
    }
  }, [contentType]);

  const handleDelete = (id: string) => {
    let apiUrl: string;
    
    // Determine the API route based on the contentType prop
    if (contentType === 'songs') {
        apiUrl = `http://127.0.0.1:8000/songs/${id}`;

        axios.delete(apiUrl).then(() => {
            // Remove the deleted item from the state
            setData((prevData) => prevData.filter((item) => item.id !== id));
        });
    } else if (contentType === 'albums') {
        apiUrl = `http://127.0.0.1:8000/albums/${id}`;

        axios.delete(apiUrl).then(() => {
            // Remove the deleted item from the state
            setData((prevData) => prevData.filter((item) => item.id !== id));
        });
    }
  };

  const handleEdit = (id: string) => {
    // Open the edit modal
    setIsEditModalOpen(true);
    setIsEditingAlbum(contentType === 'albums');
    setEditItemId(id);
  };

  const handleCloseEditModal = () => {
    // Close the edit modal
    setIsEditModalOpen(false);
    setEditItemId(null);
  };

  return (
    <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableCell>Imagem</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Artista</TableCell>
            <TableCell>Gênero</TableCell>
            <TableCell>Ano de lançamento</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? ( // Check if there's no data
            <TableRow>
                <TableCell colSpan={4}>No data available</TableCell>
            </TableRow>
          ) : (
          data.map((row) => (
            <TableRow key={row.id}>
              {/* <TableCell>{row.id}</TableCell> */}
              <TableCell>Imagem</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.artist}</TableCell>
              <TableCell>{row.genre}</TableCell>
              <TableCell>{row.release_year}</TableCell>
              <TableCell>
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

      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => {
        // Open the edit modal for adding a new item
        setIsEditModalOpen(true);
        setIsEditingAlbum(contentType === 'albums');
        }}
    >
        Add New {contentType === 'albums' ? 'Album' : 'Song'}
    </Button> */}
    
    <EditModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        isEditingAlbum={isEditingAlbum}
        itemId={editItemId}
    />
    </TableContainer>

    
  );
};

export default DataTable;
