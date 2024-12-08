import courses, { getNextId } from "../data/courses";

export const createCourse = (course) => {
    course.id = getNextId;
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
    return { type: 'ADD_COURSE', course};

}
 
  export const addCourse = (course) => {
    course.id = uuidv4();
    data.courses.push(course);
    localStorage.setItem('courses', JSON.stringify(data));
    return { type: 'ADD_COURSE', course };
  };

  export const addInstructorToCourse = (courseId, instructorId, instructorName) => {
    for (let course in courses) {
        if (course['id'] == courseId) {
            course['instructors'].push({"id": instructorId, "name":instructorName, "role": "INSTRUCTOR"});
        }
        localStorage.setItem('courses', JSON.stringify(courses));
        break
    }
    return { type: 'ADD_INSTRUCTOR', courses}
  }

export const addReadingMaterialToCourse = (courseId, readingMaterialId, readingMaterialName, readingMaterialType) => {
    for (let course in courses) {
        if (course['id'] == courseId) {
            course['readingMategrials'].push({"id": readingMaterialId, "name":readingMaterialName, "type": readingMaterialType });
        }
        localStorage.setItem('courses', JSON.stringify(courses));
        break
    }
    return { type: 'ADD_READING_MATERIAL', courses}

}