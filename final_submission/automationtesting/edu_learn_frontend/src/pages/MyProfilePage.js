import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import StudentProfile from "../components/StudentProfile";

const MyProfilePage = () => {
    const { userRole } = useContext(AuthContext);

    return (
        <>
            {userRole === 'INSTRUCTOR' ? <StudentProfile /> : <StudentProfile /> }
        </>
    )
}

export default MyProfilePage;