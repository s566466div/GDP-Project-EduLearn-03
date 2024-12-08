
export const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT';
export const UPDATE_ASSIGNMENT = 'UPDATE_ASSIGNMENT';
export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT';
export const FETCH_ASSIGNMENTS = 'FETCH_ASSIGNMENTS';

// Action to create a new assignment
export const createAssignment = (assignment) => {
    return {
        type: CREATE_ASSIGNMENT,
        payload: { ...assignment, id: Date.now().toString() }, // Generate unique ID for new assignment
    };
};

// Action to update an existing assignment
export const updateAssignment = (assignment) => {
    return {
        type: UPDATE_ASSIGNMENT,
        payload: assignment,
    };
};

// Action to delete an assignment by ID
export const deleteAssignment = (id) => {
    return {
        type: DELETE_ASSIGNMENT,
        payload: id,
    };
};

// Action to fetch assignments (mocked data for demonstration)
export const fetchAssignments = () => {
    return {
        type: FETCH_ASSIGNMENTS,
        payload: [], // Replace with fetched data if available
    };
};
