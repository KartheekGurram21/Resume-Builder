import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, CardActions, Button, List, ListItem, ListItemText } from '@mui/material';
import { FiDownload } from 'react-icons/fi';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

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

const MyFiles = () => {
  const [files, setFiles] = useState([]);

  const downloadZip = async () => {
    try {
      const { userName } = JSON.parse(sessionStorage.getItem('user'));
      const response = await axios.get(`https://resumebuilder-8kmu.onrender.com/api/resume/files/${userName}`, {
        responseType: 'blob',
      });

      const zip = new JSZip();
      const extractedFiles = [];

      // Load the zip file
      zip.loadAsync(response.data).then((contents) => {
        Object.keys(contents.files).forEach(async (filename) => {
          const fileData = await zip.file(filename).async('blob');
          extractedFiles.push({ name: filename, data: fileData });

          // Display the extracted files once all files are processed
          if (extractedFiles.length === Object.keys(contents.files).length) {
            setFiles(extractedFiles);
          }
        });
      });
    } catch (error) {
      console.error('Error downloading ZIP:', error);
    }
  };

  const handleFileDownload = (file) => {
    saveAs(file.data, file.name);
  };

  return (
    <Container>
      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Download Your Resumes
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Click the button below to download your resumes.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            style={buttonStyle}
            onClick={downloadZip}
            startIcon={<FiDownload />}
          >
            Download Resumes
          </Button>
        </CardActions>
      </Card>
      {files.length > 0 && (
        <List>
          {files.map((file, index) => (
            <ListItem key={index} button onClick={() => handleFileDownload(file)}>
              <ListItemText primary={file.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default MyFiles;