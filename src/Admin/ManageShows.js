import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  Container, Typography, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, IconButton, Avatar, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';

const ManageShows = () => {
  const [shows, setShows] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newPresenter, setNewPresenter] = useState('');
  const [newJour, setNewJour] = useState('Lundi'); // New jour state
  const [newHeureDebut, setNewHeureDebut] = useState(''); // New heureDebut state
  const [newHeureFin, setNewHeureFin] = useState(''); // New heureFin state
  const [newPhotoFile, setNewPhotoFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchShows = async () => {
      const showsCollection = collection(db, 'shows');
      const showsSnapshot = await getDocs(showsCollection);
      const showsList = showsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShows(showsList);
    };

    fetchShows();
  }, []);

  const handleFileChange = (e) => {
    setNewPhotoFile(e.target.files[0]);
  };

  const handleAddShow = async () => {
    if (newTitle && newPresenter && newJour && newHeureDebut && newHeureFin) {
      let photoUrl = '';
      if (newPhotoFile) {
        const photoRef = ref(storage, `shows/${newPhotoFile.name}`);
        const snapshot = await uploadBytes(photoRef, newPhotoFile);
        photoUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'shows'), {
        title: newTitle,
        presenter: newPresenter,
        jour: newJour,
        heureDebut: newHeureDebut,
        heureFin: newHeureFin,
        photo: photoUrl,
      });

      resetForm();
      await reloadShows();
    }
  };

  const handleEdit = (id, title, presenter, jour, heureDebut, heureFin, photo) => {
    setEditId(id);
    setNewTitle(title);
    setNewPresenter(presenter);
    setNewJour(jour);
    setNewHeureDebut(heureDebut);
    setNewHeureFin(heureFin);
    setOpen(true);
  };

  const handleUpdateShow = async () => {
    if (editId && newTitle && newPresenter && newJour && newHeureDebut && newHeureFin) {
      let photoUrl = '';
      if (newPhotoFile) {
        const photoRef = ref(storage, `shows/${newPhotoFile.name}`);
        const snapshot = await uploadBytes(photoRef, newPhotoFile);
        photoUrl = await getDownloadURL(snapshot.ref);
      }

      const showDoc = doc(db, 'shows', editId);
      await updateDoc(showDoc, {
        title: newTitle,
        presenter: newPresenter,
        jour: newJour,
        heureDebut: newHeureDebut,
        heureFin: newHeureFin,
        photo: photoUrl || shows.find(show => show.id === editId).photo,
      });

      resetForm();
      await reloadShows();
    }
  };

  const resetForm = () => {
    setEditId(null);
    setNewTitle('');
    setNewPresenter('');
    setNewJour('Lundi');
    setNewHeureDebut('');
    setNewHeureFin('');
    setNewPhotoFile(null);
    setOpen(false);
  };

  const reloadShows = async () => {
    const showsCollection = collection(db, 'shows');
    const showsSnapshot = await getDocs(showsCollection);
    const showsList = showsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setShows(showsList);
  };

  const handleDeleteShow = async (id) => {
    await deleteDoc(doc(db, 'shows', id));
    await reloadShows();
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    resetForm();
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredItems = shows.filter(item =>
    (item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) ||
    (item.presenter && item.presenter.toLowerCase().includes(filterText.toLowerCase()))
  );

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Presenter',
      selector: row => row.presenter,
      sortable: true,
    },
    {
      name: 'Jour',
      selector: row => row.jour,
      sortable: true,
    },
    {
      name: 'Heure de début',
      selector: row => row.heureDebut,
      sortable: true,
    },
    {
      name: 'Heure de fin',
      selector: row => row.heureFin,
      sortable: true,
    },
    {
      name: 'Badge',
      selector: row => row.photo ? <Avatar src={row.photo} alt={row.title} /> : 'No Badge',
      sortable: false,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(row.id, row.title, row.presenter, row.jour, row.heureDebut, row.heureFin, row.photo)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDeleteShow(row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Shows
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          Add Show
        </Button>
        <TextField
          label="Filter records"
          variant="outlined"
          size="small"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
        <Button variant="contained" color="primary" startIcon={<PrintIcon />} onClick={handlePrint}>
          Print
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        paginationRowsPerPageOptions={[5, 10, 15]}
        paginationPerPage={10}
        paginationComponentOptions={{
          rowsPerPageText: 'Show',
          rangeSeparatorText: 'of',
        }}
      />

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{editId ? 'Edit Show' : 'Add Show'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Presenter"
            type="text"
            fullWidth
            value={newPresenter}
            onChange={(e) => setNewPresenter(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Jour</InputLabel>
            <Select
              value={newJour}
              onChange={(e) => setNewJour(e.target.value)}
            >
              <MenuItem value="Lundi">Lundi</MenuItem>
              <MenuItem value="Mardi">Mardi</MenuItem>
              <MenuItem value="Mercredi">Mercredi</MenuItem>
              <MenuItem value="Jeudi">Jeudi</MenuItem>
              <MenuItem value="Vendredi">Vendredi</MenuItem>
              <MenuItem value="Samedi">Samedi</MenuItem>
              <MenuItem value="Dimanche">Dimanche</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Heure de début"
            type="time"
            fullWidth
            value={newHeureDebut}
            onChange={(e) => setNewHeureDebut(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Heure de fin"
            type="time"
            fullWidth
            value={newHeureFin}
            onChange={(e) => setNewHeureFin(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: '20px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={editId ? handleUpdateShow : handleAddShow} color="primary">
            {editId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageShows;
