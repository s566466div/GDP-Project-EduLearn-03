// src/components/AssignmentCatalog.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAssignment } from '../actions/assignmentActions';
import { useNavigate } from 'react-router-dom';
import './AssignmentCatalog.css';

const AssignmentCatalog = () => {
  const assignments = useSelector((state) => state.assignments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="assignment-catalog-container">
      <h1>Assignment Catalog</h1>
      <button className="add-assignment-btn" onClick={() => navigate('/assignment/create')}>Create New Assignment</button>
      {assignments && assignments.map((assignment) => (
        <div key={assignment.id} className="assignment-card">
          <h3>{assignment.name}</h3>
          <p>{assignment.description}</p>
          <button className="attempt-btn" onClick={() => navigate(`/assignment/attempt/${assignment.id}`)}>Attempt</button>
          <button className="edit-btn" onClick={() => navigate(`/assignment/edit/${assignment.id}`)}>Edit</button>
          <button className="delete-btn" onClick={() => dispatch(deleteAssignment(assignment.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AssignmentCatalog;
