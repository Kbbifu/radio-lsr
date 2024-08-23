import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  Container, Typography, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, IconButton, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newPublishedDate, setNewPublishedDate] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newPhotoFile, setNewPhotoFile] = useState(null); // New state for photo file
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  const categories = [
    'Réligion', 'Politique', 'Economie', 'Société',
    'Développement', 'Sciences', 'Cultures & Arts',
    'Sports & Jeunesses', 'Divers', 'Santé'
  ];

  useEffect(() => {
    const fetchNews = async () => {
      const newsCollection = collection(db, 'news');
      const newsSnapshot = await getDocs(newsCollection);
      const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNews(newsList);
    };
    fetchNews();
  }, []);

  const handleFileChange = (e) => {
    setNewPhotoFile(e.target.files[0]);
  };

  const handleAddNews = async () => {
    if (newTitle && newContent && newAuthor && newPublishedDate && newCategory) {
      let photoUrl = '';
      if (newPhotoFile) {
        const photoRef = ref(storage, `news/${newPhotoFile.name}`);
        const snapshot = await uploadBytes(photoRef, newPhotoFile);
        photoUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'news'), {
        title: newTitle,
        content: newContent,
        author: newAuthor,
        publishedDate: newPublishedDate,
        category: newCategory,
        photo: photoUrl // Save photo URL in Firestore
      });

      resetForm();
      refreshNewsList();
    }
  };

  const handleEdit = (id, title, content, author, publishedDate, category, photo) => {
    setEditId(id);
    setNewTitle(title);
    setNewContent(content);
    setNewAuthor(author);
    setNewPublishedDate(publishedDate);
    setNewCategory(category);
    setNewPhotoFile(null); // Reset photo file
    setOpen(true);
  };

  const handleUpdateNews = async () => {
    if (editId && newTitle && newContent && newAuthor && newPublishedDate && newCategory) {
      let photoUrl = '';
      if (newPhotoFile) {
        const photoRef = ref(storage, `news/${newPhotoFile.name}`);
        const snapshot = await uploadBytes(photoRef, newPhotoFile);
        photoUrl = await getDownloadURL(snapshot.ref);
      }

      const newsDoc = doc(db, 'news', editId);
      await updateDoc(newsDoc, {
        title: newTitle,
        content: newContent,
        author: newAuthor,
        publishedDate: newPublishedDate,
        category: newCategory,
        photo: photoUrl || news.find(item => item.id === editId).photo // Use existing photo URL if no new photo is uploaded
      });

      handleCloseDialog();
      refreshNewsList();
    }
  };

  const handleDeleteNews = async (id) => {
    await deleteDoc(doc(db, 'news', id));
    refreshNewsList();
  };

  const refreshNewsList = async () => {
    const newsCollection = collection(db, 'news');
    const newsSnapshot = await getDocs(newsCollection);
    const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setNews(newsList);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    resetForm();
  };

  const resetForm = () => {
    setEditId(null);
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setNewPublishedDate('');
    setNewCategory('');
    setNewPhotoFile(null); // Reset photo file
    setOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredItems = news.filter(item =>
    item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Content',
      selector: row => row.content,
    },
    {
      name: 'Author',
      selector: row => row.author,
    },
    {
      name: 'Published Date',
      selector: row => new Date(row.publishedDate).toLocaleString(),
    },
    {
      name: 'Category',
      selector: row => row.category,
    },
    {
      name: 'Photo', // New column for photo
      selector: row => row.photo ? <img src={row.photo} alt={row.title} width="50" /> : 'No Image',
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(row.id, row.title, row.content, row.author, row.publishedDate, row.category, row.photo)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDeleteNews(row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage News
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          Add News
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
        <DialogTitle>{editId ? 'Edit News' : 'Add News'}</DialogTitle>
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
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Author"
            type="text"
            fullWidth
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Published Date"
            type="datetime-local"
            fullWidth
            value={newPublishedDate}
            onChange={(e) => setNewPublishedDate(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <Button onClick={editId ? handleUpdateNews : handleAddNews} color="primary">
            {editId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageNews;
 
