import Course from "./Course";
import { useNavigate } from "react-router-dom";

const AssignmentListSection = ({assignments = []}) => {
    // const assignments = useSelector((state) => state.assignments);
    const navigate = useNavigate();
    return (
        <div>
            {/* <ul className="course-list" style={{display: flex}}> */}
            <h1>Assignments</h1>
            <ul className="course-list">
                {assignments?.length > 0 ? assignments?.map((course) => (
                    <Course key={course.id} course={course} />
                )) : <p>No Assignments available</p>}
            </ul>
            <button onClick={() => navigate('/assignment/create')}>Create New Assignment</button>
        </div>
    )
}

export default AssignmentListSection;

