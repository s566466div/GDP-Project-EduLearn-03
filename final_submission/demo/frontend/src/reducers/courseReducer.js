import courses from "../data/courses";

const initialState = {
    courses: courses
  };
  
export default function courseReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_COURSE':
            return { ...state, courses: [...state.courses, action.course] };
        case 'ADD_INSTRUCTOR':
            return { 
                ...state,
                courses: state.courses.map(course => {
                    if (course.id == action.courseId) {
                        return { ...course, instructors: [...course.instructors, {id: action.instructorId, name: action.instructorName, role: "INSTRUCTOR"}]}
                    }
                    return course; 
                })
            };
        case 'ADD_READING_MATERIAL':
            return {
                ...state,
                courses: state.courses.map(course => {
                    if (course.id == action.courseId) {
                        return { ...course, readingMaterials: [...course.readingMaterials, {id: action.readingMaterialId, name: action.readingMaterialName, type: action.readingMaterialType}]}
                    }
                })
            };
        default:
            return state;

    }
}