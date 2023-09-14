import React, { useState, useEffect } from 'react';
import RegisterInput from '../Input';
import ModalComponent from '../Modal-ui';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';  // para criar IDs aleatórios
import { useGlobalAlert } from '../../global/GlobalProvider';
import Counter from '../Counter';
import SimpleSelect from '../SimpleSelect'

const ReviewForm: React.FC<{
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
  }> = ({ isOpen, setIsOpen }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [author, setAuthor] = useState('');
    const [song, setSong] = useState('');
    const [, setOptions] = useGlobalAlert();
    const [data, setData] = useState([]);  // added this
    const fetchData = async () => {
        const aux: any = [];
        try {
            // do a request to get all songs
            const response = await axios.get('http://127.0.0.1:8000/songs/');
            
            console.log('Response Data:', response.data.songs);
            console.log('Type of Response Data:', typeof response.data);
                
            await response.data.songs.map((song) => {
                aux.push(
                    {'label': song.title, 'value': song.id}
                )
            });
            setData(aux);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
  

    }
    useEffect(() => {
        fetchData();
    }, [isOpen]);

    const handleSubmit = async (e) => {
        console.log("#######################");
        console.log(data);
        console.log("#######################");
        const formData = {
            'id': uuidv4(),
            'title': title,
            'description': description,
            'rating': rating,
            'author': author,
            'song': song,
            'created_at': new Date().toISOString(),
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/reviews/create', formData);

            setTitle('');
            setDescription('');
            setRating(0);
            setAuthor('');
            setSong('');
            setIsOpen(false);
            setOptions({
                text: "Review '"+ title +"' foi criada com sucesso",
                type: 'success',
                open: true,
            });
        } catch (error) {
            console.error("Error posting review data:", error);
        }
    };

    return (
        <ModalComponent
            open={isOpen}
            setOpen={() => {setIsOpen(false)}}
            title="Criação de Review"
            textExit="Cancelar"
            textSubmit="Salvar"
            onClick={handleSubmit}
            onCancel={() => { }}
            isBold={false}
            disabledSubmit={false}
            children={
                <form>
                    <div>
                        <label>Título:</label>
                        <RegisterInput
                            data_cy="title"
                            value={title}
                            onChange={(e) => setTitle(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <RegisterInput
                            data_cy="description"
                            value={description}
                            onChange={(e) => setDescription(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Classificação:</label>
                        <Counter
                            data_cy="rating"
                            value={rating}
                            setValue={setRating}
                            required
                            min={0}
                            max={5}
                        />
                    </div>
                    <div>
                        <label>Autor:</label>
                        <RegisterInput
                            data_cy="author"
                            value={author}
                            onChange={(e) => setAuthor(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Música:</label>
                        <RegisterInput
                            data_cy="song"
                            value={song}
                            onChange={(e) => setSong(e)}
                            required
                        />
                    </div>
                </form>
            }
        />
    );
};

export default ReviewForm;
