import React, { useState } from 'react';
import Modal from 'react-modal';
import './EnrollStepperModal.css'; // Import custom styles

const EnrollStepperModal = ({ course, onClose, onEnroll }) => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleEnrollConfirm = () => {
    onEnroll();
    onClose();
  };

  const videoLectures = course?.videoLectures;
  const readingMaterials = course?.readingMaterials;
  const quizzes = course?.quizzes;
  const assignments = course?.assignments;

  const courseContent = { videoLectures, readingMaterials, quizzes, assignments }

  const progressPercentage = (step / 3) * 100;

  return (
    <Modal isOpen={true} onRequestClose={onClose} contentLabel="Enroll in Course">
      <div className="stepper-modal">
        <h2>Enroll in {course.title}</h2>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        {/* Step 1: Course Details */}
        {step === 1 && (
          <div className="step-content">
            <h3>Course Details</h3>
            <p><strong>Title:</strong> {course.title}</p>
            <p><strong>Subject:</strong> {course.subject}</p>
            <p><strong>Description:</strong> {course.description}</p>
          </div>
        )}

        {/* Step 2: Instructor Information */}
        {step === 2 && (
          <div className="step-content">
            <h3>Instructor Information</h3>
            <p><strong>Name:</strong> {course.instructor.name}</p>
            <p><strong>Email:</strong> {course.instructor.email}</p>
          </div>
        )}

        {/* Step 3: Course Content */}
        {step === 3 && (
          <div className="step-content">
            <h3>Course Content</h3>
            <ul>
              {/* {course?.contents.map(content => (
                <li key={content.id}>
                  <p><strong>{content.contentType}</strong>: {content.title}</p>
                </li>
              ))} */}
              {/* <li key={1}> */}
                <p><strong>Video Lectures</strong>: {videoLectures.length}</p>  
              {/* </li> */}
              {/* <li key={2}> */}
                <p><strong>Reading Materials</strong>: {readingMaterials.length}</p>  
              {/* </li> */}
              {/* <li key={3}> */}
                <p><strong>Quizzes</strong>: {quizzes.length}</p>  
              {/* </li> */}
              {/* <li key={4}> */}
                <p><strong>Assignments</strong>: {assignments.length}</p>  
              {/* </li> */}
            </ul>
          </div>
        )}

        {/* Step Navigation Buttons */}
        <div className="stepper-buttons">
          <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
          {step > 1 && <button className="btn btn-secondary" onClick={handlePrevious}>Previous</button>}
          {step < 3 && <button className="btn btn-primary" onClick={handleNext}>Next</button>}
          {step === 3 && <button className="btn btn-enroll" onClick={handleEnrollConfirm}>Confirm Enrollment</button>}
        </div>
      </div>
    </Modal>
  );
};

export default EnrollStepperModal;
