import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, CardActions, Button, CircularProgress, Alert } from '@mui/material';
import { FiDownload } from 'react-icons/fi';

const MyFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
        const { userName } = JSON.parse(sessionStorage.getItem("user"))

      try {
        const response = await axios.get(`http://localhost:3001/api/resume/files/${userName}`);
        setFiles(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = (file) => {
    const byteCharacters = atob(file.pdf.data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: file.pdf.contentType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${file.name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        My Files
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">Error: {error}</Alert>}
      <Grid container spacing={4}>
        {files.map((file) => (
          <Grid item key={file._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                
                <Typography color="textSecondary">
                  Uploaded by: {file.username}
                </Typography>
                
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleDownload(file)}
                  startIcon={<FiDownload />}
                >
                  Download
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyFiles;
