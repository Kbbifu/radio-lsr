import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Container, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import 'chart.js/auto'; // Chart.js

const Dashboard = () => {
  const [stats, setStats] = useState({
    predications: 0,
    newsArticles: 0,
    shows: 0,
    presenters: 0,
  });

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the counts from Firebase collections
      const predicationsSnap = await getDocs(collection(db, 'playlists'));
      const newsArticlesSnap = await getDocs(collection(db, 'news'));
      const showsSnap = await getDocs(collection(db, 'shows'));
      const presentersSnap = await getDocs(collection(db, 'presenters'));

      // Update the stats state
      setStats({
        predications: predicationsSnap.size,
        newsArticles: newsArticlesSnap.size,
        shows: showsSnap.size,
        presenters: presentersSnap.size,
      });

      // Prepare the chart data
      setChartData({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Example labels; you can customize this
        datasets: [
          {
            label: 'Prédications',
            data: [400, 600, 800, predicationsSnap.size], // Update last value dynamically
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            fill: true,
          },
          {
            label: 'Articles',
            data: [10, 20, 30, newsArticlesSnap.size], // Update last value dynamically
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            fill: true,
          },
          {
            label: 'Emissions',
            data: [12, 18, 31, showsSnap.size], // Update last value dynamically
            backgroundColor: 'rgba(50,90,150,0.2)',
            borderColor: 'rgba(60,100,171,1)',
            fill: true,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tableau de bord
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Bienvenu dans votre Panneau d'administration! Ici vous pouvez gérer le contenu et voir les statistiques.
      </Typography>
      
      {/* Statistiques */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Prédications</Typography>
              <Typography variant="h4">{stats.predications}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Articles</Typography>
              <Typography variant="h4">{stats.newsArticles}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Emissions</Typography>
              <Typography variant="h4">{stats.shows}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Animateurs</Typography>
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
              Croissance Prédications, Emissions et Articles
            </Typography>
            {chartData && <Line data={chartData} />}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Dashboard;
