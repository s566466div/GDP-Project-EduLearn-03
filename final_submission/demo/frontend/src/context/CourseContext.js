// src/contexts/CourseContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

// Create a new context for managing course-related state
export const CourseContext = createContext();

// Create a provider component
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [readingMaterials, setReadingMaterials] = useState([]);
  const [videoLectures, setVideoLectures] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { userId } = useContext(AuthContext);
  const loggedUserId = parseInt(userId);
  // State to manage filter criteria
  const [filterCriteria, setFilterCriteria] = useState({
    searchTerm: '',
    sortOption: 'title',
    selectedCategory: '',
    selectedLevel: '',
    // Add more filter criteria as needed
  });

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5050/api/courses'); // Replace with your actual API endpoint
        setCourses(response?.data?.content);
        console.log(response?.data?.content);
        const studentEnrolledCourses = response?.data?.content?.filter(course =>
          course.students.some(student => student?.id === loggedUserId)
        );
        const quizzes = response?.data?.content?.quizzes;
        console.log(studentEnrolledCourses)
        setEnrolledCourses(studentEnrolledCourses);
        setQuizzes(quizzes);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    console.log(courses);
    console.log(enrolledCourses);
  }, [userId]);

  const createCourse = async (courseData) => {
    try {
      const response = await axios.post(`http://localhost:5050/api/courses/${loggedUserId}`, courseData);
      if (response.status === 200) {
        const createdCourse = response.data;
        setCourses(prevCourses => [...prevCourses, createdCourse]);
        return createdCourse;
      }
    } catch (error) {
      console.error('Error creating course:', error);
      return null;
    }
  };
  
  const createQuiz = async (courseId, quizData) => {
    try {
      const response = await axios.post(`http://localhost:5050/api/contents/${courseId}/quizzes`, quizData);
      if (response.status === 200) {
        const createdQuiz = response.data;
        setQuizzes(prevQuizzes => [...(prevQuizzes || []), createdQuiz]);
        return createdQuiz;
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      return null;
    }
  };

  const deleteQuiz = async (courseId, quizId) => {
    try {
        const response = await axios.delete(`http://localhost:5050/api/contents/${courseId}/quizzes/${quizId}`);
        if (response.status === 200) {
            setQuizzes((prevQuizzes) =>
                prevQuizzes.filter((quiz) => quiz.id !== quizId) // Remove deleted quiz from the state
            );
            return true; // Indicate successful deletion
        }
    } catch (error) {
        console.error('Error deleting quiz:', error);
        return false; // Indicate failure
    }
};

const createAssignment = async (courseId, assignmentData) => {
  try {
    const response = await axios.post(`http://localhost:5050/api/contents/${courseId}/assignments`, assignmentData);
    if (response.status === 200) {
      const createdAssignment = response.data;
      setAssignments(prevAssignments => [...(prevAssignments || []), createdAssignment]);
      return createdAssignment;
    }
  } catch (error) {
    console.error('Error creating assignment:', error);
    return null;
  }
};

const deleteAssignment = async (courseId, assignmentId) => {
  try {
      const response = await axios.delete(`http://localhost:5050/api/contents/${courseId}/assignments/${assignmentId}`);
      if (response.status === 200) {
          setAssignments((prevAssignments) =>
              prevAssignments.filter((assignment) => assignment?.id !== assignmentId) // Remove deleted quiz from the state
          );
          return true; // Indicate successful deletion
      }
  } catch (error) {
      console.error('Error deleting assignment:', error);
      return false; // Indicate failure
  }
};

  const createVideoLecture = async (courseId, title, summary, seriesNumber, file) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("seriesNumber", seriesNumber);
      formData.append("file", file);
  
      const response = await axios.post(`http://localhost:5050/api/contents/${courseId}/video-lectures`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 201) {
        const createdVideoLecture = response.data;
        setVideoLectures(prevVideoLectures => [...(prevVideoLectures || []), createdVideoLecture]);
        return createdVideoLecture;
      }
    } catch (error) {
      console.error('Error creating video lecture:', error);
      return null;
    }
  };

  const deleteVideoLecture = async (courseId, videoLectureId) => {
    try {
        const response = await axios.delete(`http://localhost:5050/api/contents/${courseId}/video-lectures/${videoLectureId}`);
        if (response.status === 200) {
            setVideoLectures((prevVideoLectures) =>
                prevVideoLectures.filter((videoLecture) => videoLecture?.id !== videoLectureId) // Remove deleted quiz from the state
            );
            return true; // Indicate successful deletion
        }
    } catch (error) {
        console.error('Error deleting video lecture:', error);
        return false; // Indicate failure
    }
  };

  // const createReadingMaterial = async (courseId, readingMaterialData) => {
  //   try {
  //     const response = await axios.post(`http://localhost:5050/api/contents/${courseId}/reading-materials`, readingMaterialData);
  //     if (response.status === 200) {
  //       const createdReadingMaterial = response.data;
  //       setReadingMaterial(prevReadingMaterials => [...(prevReadingMaterials || []), createdReadingMaterial]);
  //       return createdReadingMaterial;
  //     }
  //   } catch (error) {
  //     console.error('Error creating course:', error);
  //     return null;
  //   }
  // };

  const createReadingMaterial = async (courseId, title, file) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);
  
      const response = await axios.post(`http://localhost:5050/api/contents/${courseId}/reading-materials`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 201) {
        const createdReadingMaterial = response.data;
        setReadingMaterials(prevReadingMaterials => [...(prevReadingMaterials || []), createdReadingMaterial]);
        return createdReadingMaterial;
      }
    } catch (error) {
      console.error('Error creating reading material:', error);
      return null;
    }
  };

  const deleteReadingMaterial = async (courseId, readingMaterialId) => {
    try {
        const response = await axios.delete(`http://localhost:5050/api/contents/${courseId}/reading-materials/${readingMaterialId}`);
        if (response.status === 200) {
            setReadingMaterials((prevReadingMaterials) =>
                prevReadingMaterials.filter((readingMaterial) => readingMaterial?.id !== readingMaterialId) // Remove deleted quiz from the state
            );
            return true; // Indicate successful deletion
        }
    } catch (error) {
        console.error('Error deleting reading material:', error);
        return false; // Indicate failure
    }
  };

   // Helper function to get a course by ID
   const getCourseById = (courseId) => courses.find(course => course.id === parseInt(courseId));


    // Function to update filter criteria
    const updateFilterCriteria = (newCriteria) => {
        setFilterCriteria((prevCriteria) => ({
        ...prevCriteria,
        ...newCriteria,
        }));
    };

    // Function to enroll in a course
    const enrollInCourse = (course) => {
        // Prevent enrolling in the same course multiple times
        if (!enrolledCourses.some((enrolledCourse) => enrolledCourse.id === course.id)) {
        setEnrolledCourses((prevEnrolledCourses) => [...prevEnrolledCourses, course]);
        }
    };

    const enrollCourse = async (courseId, userId) => {
      try {
        const response = await axios.post(`http://localhost:5050/api/courses/${courseId}/${userId}/enroll`);
        if (response.status === 200) {
          // Update the enrolled course's students list locally
          setCourses(prevCourses => 
            prevCourses.map(course => 
              course.id === courseId
                ? { ...course, students: [...course.students, response.data] }
                : course
            )
          );
          return true; // Successful enrollment
        }
      } catch (error) {
        console.error('Failed to enroll in course:', error);
        return false; // Failed enrollment
      }
    }

     // Function to check if a course is already enrolled
    const isEnrolled = (courseId) => {
        return enrolledCourses.some((course) => course.id === courseId);
    }

    const fetchQuizById = async (courseId, quizId) => {
      try {
          setLoading(true);
          // setError(null);
          // const response = await axios.get(`http://localhost:5050/api/contents/${courseId}/quizzes/`);

          // const data = await response.json();
          const course = courses?.filter(course => course?.id == courseId);
          // console.log(course?.quizzes);
          const quiz = course[0]?.quizzes?.filter(quiz => quiz?.id == quizId);
          // console.log(course[0]?.quizzes)
          console.log(quiz)
          return quiz[0]; // Assuming the API returns the quiz object
      } catch (err) {
          // setError('Failed to fetch quiz');
          console.error(err);
          return null;
      } finally {
          setLoading(false);
      }
  };

  const submitQuiz = async (requestBody) => {
      try {
          setLoading(true);
          // setError(null);
          const response = await axios.post(`http://localhost:5050/api/quiz-attempts/save`, requestBody, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              // body: JSON.stringify(requestBody),
              // body: requestBody,
          });
          return response.status == 200;
      } catch (err) {
          // setError('Failed to submit quiz');
          console.error(err);
          return false;
      } finally {
          setLoading(false);
      }
  };

  const fetchAssignmentById = async (courseId, assignmentId) => {
      try {
          setLoading(true);
          const course = courses?.filter(course => course?.id == courseId);
          const assignment = course[0]?.assignments?.filter(assignment => assignment?.id == assignmentId);
          console.log(assignment)
          return assignment[0];
      } catch (err) {
          // setError('Failed to fetch assignment');
          console.error(err);
          return null;
      } finally {
          setLoading(false);
      }
  };

  const submitAssignment = async (assignmentId, submission) => {
      try {
          setLoading(true);
          // setError(null);
          const response = await fetch(`/api/assignments/${assignmentId}/submit`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ submission }),
          });
          return response.ok;
      } catch (err) {
          // setError('Failed to submit assignment');
          console.error(err);
          return false;
      } finally {
          setLoading(false);
      }
  };

  const fetchCourseById = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:5050/api/courses/${courseId}`);

      if (response.status != 200) {
        throw new Error('Error fetching course with id: ', courseId)
      }
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.error(error.message || 'Error fetching course with id: ', courseId);
    }
  }


  return (
    <CourseContext.Provider 
        value={{
            courses, 
            createCourse,
            createQuiz,
            deleteQuiz,
            createAssignment,
            deleteAssignment,
            createReadingMaterial,
            deleteReadingMaterial,
            createVideoLecture,
            deleteVideoLecture,
            getCourseById,
            fetchCourseById,
            enrollCourse,
            filterCriteria, 
            updateFilterCriteria,
            enrolledCourses,
            enrollInCourse,
            isEnrolled,
            fetchQuizById,
            submitQuiz,
            fetchAssignmentById,
            submitAssignment,
            loading 
        }}>
      {children}
    </CourseContext.Provider>
  );
}
