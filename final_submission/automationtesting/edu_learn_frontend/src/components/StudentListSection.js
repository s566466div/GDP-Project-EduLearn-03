import { useNavigate } from "react-router-dom";
import Course from "./Course";

const StudentListSection = ({students = []}) => {
    const navigate = useNavigate();
    return (
        <div>
            {/* <ul className="course-list" style={{display: flex}}> */}
            <h1>Students</h1>
            <ul className="course-list">
                {students?.length > 0 ? students?.map((student) => (
                    <Course key={student.id} course={student} />
                )) : <p>No students enrolled</p>}
            </ul>
        </div>
    )
}

export default StudentListSection;