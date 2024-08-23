import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Alert } from '@mui/material';
import emailjs from 'emailjs-com';
import Nav from '../Nav';
import HomeBanner from '../HomeBanner';
import Footer from '../Footer';
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.send('service_njqfe4s', 'template_s3avz2g', {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }, 'CjRbYyq7bEYekXZn_')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setEmailSent(true);
        setError(null);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        }); // Reset the form data
      })
      .catch((err) => {
        console.error('Failed to send email. Error:', err);
        setError('Failed to send email. Please try again.');
        setEmailSent(false);
      });
  };

  return (
    <div> 
      <Nav />
      <HomeBanner />
      <div className='presenterPage-container'>
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
          <Typography variant="h4" gutterBottom>
            Contactez-Nous
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom complet"
              name="name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Objet"
              name="subject"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <TextField
              label="Message"
              name="message"
              multiline
              rows={6}
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Envoyer
            </Button>
          </form>
          {emailSent && <Alert severity="success" style={{ marginTop: '20px' }}>Email envoyé avec succès!</Alert>}
          {error && <Alert severity="error" style={{ marginTop: '20px' }}>{error}</Alert>}
        </Container>
        </div>
      <Footer />
    </div>
  );
}

export default Contact;
