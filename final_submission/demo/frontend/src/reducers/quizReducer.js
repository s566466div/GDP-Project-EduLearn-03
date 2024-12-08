// src/reducers/quizReducer.js
const quizReducer = (state = [], action) => {
    switch (action.type) {
      case 'CREATE_QUIZ':
        return [...state, { ...action.payload, id: Date.now().toString() }];
      case 'UPDATE_QUIZ':
        return state.map((quiz) =>
          quiz.id === action.payload.id ? { ...action.payload } : quiz
        );
      case 'DELETE_QUIZ':
        return state.filter((quiz) => quiz.id !== action.payload);
      default:
        return state;
    }
  };
  
  export default quizReducer;
  