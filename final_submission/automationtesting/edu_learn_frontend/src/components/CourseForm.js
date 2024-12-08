import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import courses,  { getNextId } from '../data/courses';
// import { createCourse, addInstructorToCourse, addReadingMaterialToCourse } from '../actions/courseActions';
// import { createCourse } from '../utils/courseUtil';
import Layout from './Layout';



const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [readingMaterialId, setReadingMaterialId] = useState('');
  const [readingMaterialName, setReadingMaterialName] = useState('');
  const [readingMaterialType, setReadingMaterialType] = useState('');
//   const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();
    const newCourse = {title, description, "instructors": [], "students": [], "readingMaterials": []};

    // try {
    //     let courses = await dispatch(createCourse(newCourse));
    //     await dispatch();
    //     await dispatch();
    // } catch (error) {
    //     console.error(error);
    // }
    // try {
    //   const courseId = await dispatch(createCourse(courses, title, description, subject));
    //   await dispatch(addInstructorToCourse(courseId, instructorId, instructorName));
    //   await dispatch(addReadingMaterialToCourse(courseId, readingMaterialId, readingMaterialName, readingMaterialType));
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Layout>

        <form onSubmit={handleSubmit}>
        <label>
            Title:
            <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
        </label>
        <label>
            Description:
            <input type="text" value={description} onChange={event => setDescription(event.target.value)} />
        </label>
        <label>
            Subject:
            <input type="text" value={subject} onChange={event => setSubject(event.target.value)} />
        </label>
        <label>
            Instructor ID:
            <input type="text" value={instructorId} onChange={event => setInstructorId(event.target.value)} />
        </label>
        <label>
            Instructor Name:
            <input type="text" value={instructorName} onChange={event => setInstructorName(event.target.value)} />
        </label>
        <label>
            Reading Material Name:
            <input type="text" value={readingMaterialName} onChange={event => setReadingMaterialName(event.target.value)} />
        </label>
        <label>
            Reading Material Type:
            <input type="text" value={readingMaterialType} onChange={event => setReadingMaterialType(event.target.value)} />
        </label>
        <button type="submit">Create Course</button>
        </form>
    </Layout>
  );
};

export default CourseForm;
