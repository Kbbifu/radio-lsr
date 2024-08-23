import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Container, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Chart.js

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    newsArticles: 0,
    shows: 0,
    presenters: 0,
  });

  const [recentArticles, setRecentArticles] = useState([]);
  const [recentShows, setRecentShows] = useState([]);

  useEffect(() => {
    // Simuler la récupération des données
    const fetchData = async () => {
      setStats({
        users: 1500,
        newsArticles: 50,
        shows: 20,
        presenters: 10,
      });

      setRecentArticles([
        { id: 1, title: 'Latest News Article 1' },
        { id: 2, title: 'Latest News Article 2' },
      ]);

      setRecentShows([
        { id: 1, title: 'Latest Show 1' },
        { id: 2, title: 'Latest Show 2' },
      ]);
    };

    fetchData();
  }, []);

  // Données du graphique
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Users',
        data: [400, 600, 800, 1500],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        fill: true,
      },
      {
        label: 'News Articles',
        data: [10, 20, 30, 50],
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        fill: true,
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Welcome to the admin dashboard! Here you can manage content and view statistics.
      </Typography>
      
      {/* Statistiques */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Users</Typography>
              <Typography variant="h4">{stats.users}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">News Articles</Typography>
              <Typography variant="h4">{stats.newsArticles}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Shows</Typography>
              <Typography variant="h4">{stats.shows}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Presenters</Typography>
              <Typography variant="h4">{stats.presenters}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Graphique */}
      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User and News Articles Growth
            </Typography>
            <Line data={data} />
          </CardContent>
        </Card>
      </Box>

      

      
    </Container>
  );
};

export default Dashboard;
