// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './reducers/quizReducer';
import assignmentReducer from './reducers/assignmentReducer';

const store = configureStore({
  reducer: {
    quizzes: quizReducer,
    assignments: assignmentReducer
    // Add other reducers here if needed
  },
});

export default store;
