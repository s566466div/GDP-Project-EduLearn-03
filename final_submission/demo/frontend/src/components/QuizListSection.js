import Course from "./Course";
import { useNavigate } from "react-router-dom";

const QuizListSection = ({quizzes = []}) => {
    // const courses = useSelector((state) => state.courses);
    const navigate = useNavigate();
    return (
        <div>
            {/* <ul className="course-list" style={{display: flex}}> */}
            <h1>Quizzes</h1>
            <ul className="course-list">
                {quizzes?.length > 0 ? quizzes?.map((course) => (
                    <Course key={course.id} course={course} />
                )) : <p>No quiz available</p>}
            </ul>
            <button onClick={() => navigate('/quiz/create')}>Create Quiz</button>
        </div>
    )
}

export default QuizListSection;

