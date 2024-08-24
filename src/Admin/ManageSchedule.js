import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase-config'; // Importer Firebase Storage
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Importer les fonctions de Firebase Storage
import {
  Container, Typography, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, IconButton, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';

const ManageSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [newShow, setNewShow] = useState('');
  const [newJour, setNewJour] = useState('');
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // État pour le fichier sélectionné
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  const jours = [
    'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
  ];

  useEffect(() => {
    const fetchSchedules = async () => {
      const schedulesCollection = collection(db, 'schedules');
      const schedulesSnapshot = await getDocs(schedulesCollection);
      const schedulesList = schedulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(schedulesList);
    };

    fetchSchedules();
  }, []);

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleAddSchedule = async () => {
    if (newShow && newJour && newStartTime && newEndTime && selectedImage) {
      const imageUrl = await uploadImage(selectedImage);
      await addDoc(collection(db, 'schedules'), {
        show: newShow,
        jour: newJour,
        startTime: newStartTime,
        endTime: newEndTime,
        imageUrl: imageUrl
      });
      setNewShow('');
      setNewJour('');
      setNewStartTime('');
      setNewEndTime('');
      setSelectedImage(null); // Réinitialiser le fichier sélectionné
      setOpen(false);
      const schedulesCollection = collection(db, 'schedules');
      const schedulesSnapshot = await getDocs(schedulesCollection);
      const schedulesList = schedulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(schedulesList);
    }
  };

  const handleEdit = (id, show, jour, startTime, endTime, imageUrl) => {
    setEditId(id);
    setNewShow(show);
    setNewJour(jour);
    setNewStartTime(startTime);
    setNewEndTime(endTime);
    setSelectedImage(null); // Réinitialiser le fichier sélectionné pour l'édition
    setOpen(true);
  };

  const handleUpdateSchedule = async () => {
    if (editId && newShow && newJour && newStartTime && newEndTime) {
      const updateData = {
        show: newShow,
        jour: newJour,
        startTime: newStartTime,
        endTime: newEndTime
      };
      
      if (selectedImage) {
        const imageUrl = await uploadImage(selectedImage);
        updateData.imageUrl = imageUrl;
      }
      
      const scheduleDoc = doc(db, 'schedules', editId);
      await updateDoc(scheduleDoc, updateData);
      setEditId(null);
      setNewShow('');
      setNewJour('');
      setNewStartTime('');
      setNewEndTime('');
      setSelectedImage(null); // Réinitialiser le fichier sélectionné
      setOpen(false);
      const schedulesCollection = collection(db, 'schedules');
      const schedulesSnapshot = await getDocs(schedulesCollection);
      const schedulesList = schedulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(schedulesList);
    }
  };

  const handleDeleteSchedule = async (id) => {
    await deleteDoc(doc(db, 'schedules', id));
    const schedulesCollection = collection(db, 'schedules');
    const schedulesSnapshot = await getDocs(schedulesCollection);
    const schedulesList = schedulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSchedules(schedulesList);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditId(null);
    setNewShow('');
    setNewJour('');
    setNewStartTime('');
    setNewEndTime('');
    setSelectedImage(null); // Réinitialiser le fichier sélectionné
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredItems = schedules.filter(item =>
    (item.show && item.show.toLowerCase().includes(filterText.toLowerCase()))
  );

  const columns = [
    {
      name: 'Show',
      selector: row => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {row.imageUrl && (
            <img src={row.imageUrl} alt={row.show} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
          )}
          {row.show}
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Jour',
      selector: row => row.jour,
      sortable: true,
    },
    {
      name: 'Heure Début',
      selector: row => row.startTime,
      sortable: true,
    },
    {
      name: 'Heure de Fin',
      selector: row => row.endTime,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(row.id, row.show, row.jour, row.startTime, row.endTime, row.imageUrl)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDeleteSchedule(row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        GESTION DE LA GRILLE DES PROGRAMMES
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          Ajouter
        </Button>
        <TextField
          label="Filter records"
          variant="outlined"
          size="small"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
        <Button variant="contained" color="primary" startIcon={<PrintIcon />} onClick={handlePrint}>
          imprimer
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
        <DialogTitle>{editId ? 'Modifier' : 'Ajouter'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Show"
            type="text"
            fullWidth
            value={newShow}
            onChange={(e) => setNewShow(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Jour</InputLabel>
            <Select
              value={newJour}
              onChange={(e) => setNewJour(e.target.value)}
            >
              {jours.map((jour) => (
                <MenuItem key={jour} value={jour}>
                  {jour}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Heure Début"
            type="time"
            fullWidth
            value={newStartTime}
            onChange={(e) => setNewStartTime(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Heure de Fin"
            type="time"
            fullWidth
            value={newEndTime}
            onChange={(e) => setNewEndTime(e.target.value)}
          />
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            style={{ marginTop: '16px', width: '100%' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Annuler
          </Button>
          <Button onClick={editId ? handleUpdateSchedule : handleAddSchedule} color="primary">
            {editId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageSchedule;
