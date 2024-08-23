import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const ManagePresenters = () => {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [newPresenter, setNewPresenter] = useState({ name: '', email: '', biography: '', photo: null });
  const [editPresenter, setEditPresenter] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const storage = getStorage();

  // Fetch presenters data from Firebase
  useEffect(() => {
    const fetchPresenters = async () => {
      const presentersCollection = collection(db, 'presenters');
      const presenterSnapshot = await getDocs(presentersCollection);
      const presentersList = presenterSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(presentersList);
    };
    fetchPresenters();
  }, []);

  const handleAddPresenter = async () => {
    try {
      let photoUrl = '';
      if (newPresenter.photo) {
        const photoRef = ref(storage, `presenters/${uuidv4()}`);
        await uploadBytes(photoRef, newPresenter.photo);
        photoUrl = await getDownloadURL(photoRef);
      }
      const presenterData = {
        ...newPresenter,
        photo: photoUrl,
      };
      const docRef = await addDoc(collection(db, 'presenters'), presenterData);
      setData([...data, { id: docRef.id, ...presenterData }]);
      setNewPresenter({ name: '', email: '', biography: '', photo: null });
    } catch (error) {
      console.error('Error adding presenter:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'presenters', id));
      setData(data.filter((presenter) => presenter.id !== id));
    } catch (error) {
      console.error('Error deleting presenter:', error);
    }
  };

  const handleEditOpen = (presenter) => {
    setEditPresenter(presenter);
    setOpenEditDialog(true);
  };

  const handleEditSave = async () => {
    try {
      let photoUrl = editPresenter.photo;
      if (typeof editPresenter.photo === 'object') {
        const photoRef = ref(storage, `presenters/${uuidv4()}`);
        await uploadBytes(photoRef, editPresenter.photo);
        photoUrl = await getDownloadURL(photoRef);
      }
      const updatedPresenter = {
        ...editPresenter,
        photo: photoUrl,
      };
      const docRef = doc(db, 'presenters', editPresenter.id);
      await updateDoc(docRef, updatedPresenter);
      setData(data.map((presenter) => (presenter.id === editPresenter.id ? updatedPresenter : presenter)));
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error updating presenter:', error);
    }
  };

  const handleFileChange = (e) => {
    setNewPresenter({ ...newPresenter, photo: e.target.files[0] });
  };

  const handleEditFileChange = (e) => {
    setEditPresenter({ ...editPresenter, photo: e.target.files[0] });
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.email.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Biographie', selector: (row) => row.biography, sortable: true },
    {
      name: 'Photo',
      selector: (row) => (row.photo ? <img src={row.photo} alt="presenter" width="50" height="50" /> : 'No Image'),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <IconButton onClick={() => handleEditOpen(row)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Manage Presenters
        </Typography>
        <TextField
          label="Filter in records..."
          variant="outlined"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        />
        <Box display="flex" flexDirection="row" gap={2} mb={3}>
          <TextField
            label="Name"
            variant="outlined"
            value={newPresenter.name}
            onChange={(e) => setNewPresenter({ ...newPresenter, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email"
            variant="outlined"
            value={newPresenter.email}
            onChange={(e) => setNewPresenter({ ...newPresenter, email: e.target.value })}
            fullWidth
          />
        </Box>
        <TextField
          label="Biographie"
          variant="outlined"
          value={newPresenter.biography}
          onChange={(e) => setNewPresenter({ ...newPresenter, biography: e.target.value })}
          multiline
          rows={3}
          fullWidth
          style={{ marginBottom: '20px' }}
        />
        <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} style={{ marginBottom: '20px' }} />
        <Button variant="contained" color="primary" onClick={handleAddPresenter}>
          Add Presenter
        </Button>
      </Box>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        highlightOnHover
      />

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Presenter</DialogTitle>
        <DialogContent>
          {editPresenter && (
            <>
              <TextField
                label="Name"
                variant="outlined"
                value={editPresenter.name}
                onChange={(e) => setEditPresenter({ ...editPresenter, name: e.target.value })}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Email"
                variant="outlined"
                value={editPresenter.email}
                onChange={(e) => setEditPresenter({ ...editPresenter, email: e.target.value })}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Biographie"
                variant="outlined"
                value={editPresenter.biography}
                onChange={(e) => setEditPresenter({ ...editPresenter, biography: e.target.value })}
                multiline
                rows={3}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <input type="file" accept="image/png, image/jpeg" onChange={handleEditFileChange} />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManagePresenters;
