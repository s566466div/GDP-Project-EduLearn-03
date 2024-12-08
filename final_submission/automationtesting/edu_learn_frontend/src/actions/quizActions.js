// src/actions/quizActions.js
export const createQuiz = (quiz) => ({ type: 'CREATE_QUIZ', payload: quiz });
export const updateQuiz = (quiz) => ({ type: 'UPDATE_QUIZ', payload: quiz });
export const deleteQuiz = (id) => ({ type: 'DELETE_QUIZ', payload: id });
