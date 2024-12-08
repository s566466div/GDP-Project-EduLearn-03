// src/components/CreateCourseForm.js

import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CourseContext } from '../contexts/CourseContext';
import { Box, Button, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import './NewCourseForm.css';

const CreateCourseForm = () => {
    const { createCourse } = useContext(CourseContext);
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go to the previous page
      };

    const onSubmit = async (data) => {
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
        
        const createdCourse = await createCourse(data);

        if (createdCourse) {
            setSuccessMessage("Course created successfully!");
            reset();
        } else {
            setErrorMessage("Failed to create course. Please try again.");
        }

        setLoading(false);
    };

    return (
        <Layout> 
            <button className="go-back-button" onClick={handleGoBack}>
                &larr; Go Back
            </button>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '600px',
                    mx: 'auto',
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper'
                }}
            >
                <Typography variant="h4" gutterBottom align="center">
                    Create a New Course
                </Typography>

                {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
                {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

                <TextField
                    label="Course Title"
                    {...register("title", { required: "Title is required" })}
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ''}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Description"
                    {...register("description", { required: "Description is required" })}
                    error={!!errors.description}
                    helperText={errors.description ? errors.description.message : ''}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                />

                <TextField
                    label="Subject"
                    {...register("subject", { required: "Subject is required" })}
                    error={!!errors.subject}
                    helperText={errors.subject ? errors.subject.message : ''}
                    fullWidth
                    margin="normal"
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size="1rem" /> : null}
                >
                    {loading ? 'Creating...' : 'Create Course'}
                </Button>
            </Box>
        </Layout>
    );
};

export default CreateCourseForm;
