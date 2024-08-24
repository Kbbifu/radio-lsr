import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase-config'; // Import Firebase Storage
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage utilities
import { Container, Typography, TextField, Button, Card, CardContent, Grid, IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DataTable from 'react-data-table-component';

const ManagePlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newAudioFile, setNewAudioFile] = useState(null);
  const [newCoverImage, setNewCoverImage] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editAudioFile, setEditAudioFile] = useState(null);
  const [EditCoverImage, setEditCoverImage] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const playlistsCollection = collection(db, 'playlists');
      const playlistsSnapshot = await getDocs(playlistsCollection);
      const playlistsList = playlistsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlaylists(playlistsList);
    };
    fetchPlaylists();
  }, []);

  const handleAddPlaylist = async () => {
    if (newTitle && newDescription && newCategory && newAuthor && newAudioFile && newCoverImage) {
      // Upload audio file to Firebase Storage
      const audioRef = ref(storage, `audios/${newAudioFile.name}`);
      await uploadBytes(audioRef, newAudioFile);
      const audioURL = await getDownloadURL(audioRef);

      // Upload cover image to Firebase Storage
      const imageRef = ref(storage, `covers/${newCoverImage.name}`);
      await uploadBytes(imageRef, newCoverImage);
      const imageURL = await getDownloadURL(imageRef);

      // Add new playlist to Firestore
      await addDoc(collection(db, 'playlists'), {
        title: newTitle,
        description: newDescription,
        category: newCategory,
        author: newAuthor,
        audioURL: audioURL,
        coverImageURL: imageURL,
      });

      setNewTitle('');
      setNewDescription('');
      setNewCategory('');
      setNewAuthor('');
      setNewAudioFile(null);
      setNewCoverImage(null);

      const playlistsCollection = collection(db, 'playlists');
      const playlistsSnapshot = await getDocs(playlistsCollection);
      const playlistsList = playlistsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlaylists(playlistsList);
    }
  };

  const handleEdit = (id, title, description, category, author) => {
    setEditId(id);
    setEditTitle(title);
    setEditDescription(description);
    setEditCategory(category);
    setEditAuthor(author);
    setEditAudioFile(null);
    setEditCoverImage(null);
  };

  const handleUpdatePlaylist = async () => {
    if (editId && editTitle && editDescription && editCategory && editAuthor && editAudioFile && setEditCoverImage) {
      const playlistDoc = doc(db, 'playlists', editId);
      await updateDoc(playlistDoc, {
        title: editTitle,
        description: editDescription,
        category: editCategory,
        author: editAuthor,
        audiofile: editAudioFile,
        coverimage: setEditCoverImage,
      });
      setEditId(null);
      setEditTitle('');
      setEditDescription('');
      setEditCategory('');
      setEditAuthor('');
      setEditAudioFile(null);
      setEditCoverImage(null);
      const playlistsCollection = collection(db, 'playlists');
      const playlistsSnapshot = await getDocs(playlistsCollection);
      const playlistsList = playlistsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlaylists(playlistsList);
    }
  };

  const handleDeletePlaylist = async (id) => {
    await deleteDoc(doc(db, 'playlists', id));
    const playlistsCollection = collection(db, 'playlists');
    const playlistsSnapshot = await getDocs(playlistsCollection);
    const playlistsList = playlistsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPlaylists(playlistsList);
  };

  const columns = [
    { name: 'Titre', selector: row => row.title, sortable: true },
    { name: 'Description', selector: row => row.description, sortable: false },
    { name: 'Categorie', selector: row => row.category, sortable: true },
    { name: 'Auteur/Prédicateur', selector: row => row.author, sortable: true },
    { name: 'Audio', selector: row => row.audioURL, sortable: false},
    { name: 'Image', selector: row => row.coverImageURL, sortable: false},
    { name: 'Actions', cell: row => (
      <>
        <IconButton color="primary" onClick={() => handleEdit(row.id, row.title, row.description, row.category, row.author)}>
          <EditIcon />
        </IconButton>
        <IconButton color="secondary" onClick={() => handleDeletePlaylist(row.id)}>
          <DeleteIcon />
        </IconButton>
      </>
    )},
  ];

  return (
    <Container sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>GESTION DES PREDICATIONS ET PODCASTS</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6">Ajouter</Typography>
              <TextField
                label="Titre"
                fullWidth
                margin="normal"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <TextField
                label="Categorie"
                fullWidth
                margin="normal"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <TextField
                label="Auteur/Prédicateur"
                fullWidth
                margin="normal"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setNewAudioFile(e.target.files[0])}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewCoverImage(e.target.files[0])}
              />
              <Button variant="contained" color="primary" onClick={handleAddPlaylist}>
                Ajouter
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {editId && (
          <Grid item xs={12} md={6}>
            <Card sx={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h6">Modifier</Typography>
                <TextField
                  label="Titre"
                  fullWidth
                  margin="normal"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <TextField
                  label="Categorie"
                  fullWidth
                  margin="normal"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                />
                <TextField
                  label="Auteur/Prédicateur"
                  fullWidth
                  margin="normal"
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                />
                <input
                type="file"
                accept="audio/*"
                onChange={(e) => setEditAudioFile(e.target.files[0])}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setEditCoverImage(e.target.files[0])}
              />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <Button variant="contained" color="primary" onClick={handleUpdatePlaylist}>
                    Sauvegarder
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => setEditId(null)}>
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <Typography variant="h6" gutterBottom>Liste de nos prédications</Typography>
      <Paper sx={{ backgroundColor: '#fff', borderRadius: '4px', padding: '20px' }}>
        <DataTable
          columns={columns}
          data={playlists}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          selectableRows={false}
          highlightOnHover
        />
      </Paper>
    </Container>
  );
};

export default ManagePlaylists;
