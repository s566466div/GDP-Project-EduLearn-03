import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { CourseContext } from '../contexts/CourseContext'; // Import the context
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const FileInput = styled('input')({
  display: 'none',
});

const ReadingMaterialForm = () => {
    const { id } = useParams()
  const { createReadingMaterial } = useContext(CourseContext); // Access the function from context
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go to the previous page
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !file) {
      setErrorMessage("Please provide both a title and a file.");
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const createdMaterial = await createReadingMaterial(id, title, file);
      if (createdMaterial) {
        setSuccessMessage("Reading material created successfully!");
        setTitle('');
        setFile(null);
        // onSuccess && onSuccess();  // Optional callback after success
      } else {
        setErrorMessage("Failed to create reading material.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while creating the reading material.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
<button className="go-back-button" onClick={handleGoBack}>
          &larr; Go Back
      </button>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: 'auto',
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
      >
      <Typography variant="h4" gutterBottom align="center">
        Add Reading Material
      </Typography>

      {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        />

      <label htmlFor="file-upload">
        <FileInput
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          component="span"
          fullWidth
          sx={{ mt: 2 }}
          >
          {file ? file.name : "Choose File"}
        </Button>
      </label>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 4 }}
        disabled={loading}
        startIcon={loading ? <CircularProgress size="1rem" /> : null}
        >
        {loading ? 'Uploading...' : 'Create Reading Material'}
      </Button>
    </Box>
        </Layout>
  );
};

export default ReadingMaterialForm;
