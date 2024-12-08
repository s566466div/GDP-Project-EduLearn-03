import { useContext, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
    Alert,
  } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { CourseContext } from "../contexts/CourseContext";
import Layout from "../components/Layout";

const FileInput = styled('input')({
    display: 'none',
  });  

const VideoLectureFormPage = () => {
    const { id } = useParams();
    const { createVideoLecture } = useContext(CourseContext);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [seriesNumber, setSeriesNumber] = useState('');
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // Go to the previous page
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!title || !seriesNumber || !file) {
            setErrorMessage("Please fill all the fields");
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const createdLecture = await createVideoLecture(id, title, summary, seriesNumber, file);
            if (createdLecture) {
                setSuccessMessage("Video lecture created successfully");
                setTitle('');
                setSummary('');
                setSeriesNumber('');
                setFile(null);
            } else {
                setErrorMessage("Failed to create video lecture.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while creating the video lecture.");
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
            Create Video Lecture
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
        <TextField
            label="Summary"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            />

        <TextField
            label="Series Number"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={seriesNumber}
            onChange={(e) => setSeriesNumber(e.target.value)}
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
            {loading ? 'Uploading...' : 'Create Video Lecture'}
          </Button>
        </Box>
            </Layout>
    );
}

export default VideoLectureFormPage;