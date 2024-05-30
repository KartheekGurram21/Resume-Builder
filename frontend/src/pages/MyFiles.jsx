import React from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { FiDownload } from 'react-icons/fi';

const cardStyle = {
  minWidth: 275,
  padding: '20px',
  textAlign: 'center',
  margin: 'auto',
  marginTop: '20vh',
};

const buttonStyle = {
  marginTop: '20px',
};

const downloadPdf = async () => {
  try {
    const { userName } = JSON.parse(sessionStorage.getItem('user'));
    const response = await axios.get(`http://localhost:3001/api/resume/files/${userName}`, {
      responseType: 'blob',
    });

    // Create a link element and trigger a download
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${userName}.pdf`;
    link.click();

    // Clean up the URL object
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
};

const MyFiles = () => {
  const handleDownload = () => {
    downloadPdf();
  };

  return (
    <Container>
      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Download Your PDF
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Click the button below to download your PDF.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            style={buttonStyle}
            onClick={handleDownload}
            startIcon={<FiDownload />}
          >
            Download PDF
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default MyFiles;
