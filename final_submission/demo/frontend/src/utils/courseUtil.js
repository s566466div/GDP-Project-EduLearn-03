import { getNextId } from "../data/courses";

export const filterCourses = (courses, filter) => {
    if (filter === 'all') return courses;
    return courses.filter((course) => course.subject === filter);
};
  
export const searchCourses = (courses, searchTerm) => {
  return courses.filter((course) => {
      return course.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
};

export const createCourse = (courses, title, description, subject, instructors = [], readingMaterials = []) => {
  return courses.push({id: getNextId(), title, description, subject, instructors, readingMaterials});
}

// export const createCourse = (courses, title, description, subject) => {
//   return courses
//   return async dispatch => {
//     try {
//       const response = await fetch('/api/courses', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title, description, subject })
//       });
//       const courseId = await response.json();
//       dispatch({ type: 'CREATE_COURSE_SUCCESS', courseId });
//     } catch (error) {
//       dispatch({ type: 'CREATE_COURSE_FAILURE', error });
//     }
//   };
// };

// export const addInstructorToCourse = (courseId, instructorId, instructorName) => {
//   return async dispatch => {
//     try {
//       const response = await fetch(`/api/courses/${courseId}/instructors`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ instructorId, instructorName })
//       });
//       dispatch({ type: 'ADD_INSTRUCTOR_TO_COURSE_SUCCESS' });
//     } catch (error) {
//       dispatch({ type: 'ADD_INSTRUCTOR_TO_COURSE_FAILURE', error });
//     }
//   };
// };

// export const addReadingMaterialToCourse = (courseId, title) => {
//   return async dispatch => {
//     try {
//       const response = await fetch(`/api/courses/${courseId}/readingMaterials`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title })
//       });
//       dispatch({ type: 'ADD_READING_MATERIAL_TO_COURSE_SUCCESS' });
//     } catch (error) {
//       dispatch({ type: 'ADD_READING_MATERIAL_TO_COURSE_FAILURE', error });
//     }
//   };
// };
