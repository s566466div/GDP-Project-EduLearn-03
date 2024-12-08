// src/reducers/assignmentReducer.js

import { CREATE_ASSIGNMENT, UPDATE_ASSIGNMENT, DELETE_ASSIGNMENT, FETCH_ASSIGNMENTS } from '../actions/assignmentActions';

const initialState = [];

const assignmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ASSIGNMENT:
            return [...state, action.payload];

        case UPDATE_ASSIGNMENT:
            return state.map((assignment) =>
                assignment.id === action.payload.id ? { ...action.payload } : assignment
            );

        case DELETE_ASSIGNMENT:
            return state.filter((assignment) => assignment.id !== action.payload);

        case FETCH_ASSIGNMENTS:
            return action.payload;

        default:
            return state;
    }
};

export default assignmentReducer;
