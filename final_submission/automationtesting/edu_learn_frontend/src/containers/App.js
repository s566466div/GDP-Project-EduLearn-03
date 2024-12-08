import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';
import { CourseProvider } from '../contexts/CourseContext';
import RegistrationPage from '../pages/registration';
import LoginPage from '../pages/loginPage';
import LogoutPage from '../pages/LogoutPage';
import DashboardPage from '../pages/dashboardPage';
// import CourseCatalogPage from '../pages/0courseCatalogPage';
import CourseCatalogPage from '../pages/courseCatalogPage';
import CourseDetailsPage from '../pages/courseDetailsPage';
import EnrolledCoursesPage from '../pages/enrolledCoursesPage';
import QuizCatalog from '../components/QuizCatalog';
import QuizForm from '../components/QuizForm';
import QuizAttemptPage from '../pages/QuizAttemptPage';
import AssignmentForm from '../components/AssignmentForm';
import AssignmentCatalog from '../components/AssignmentCatalog';
import AssignmentAttemptPage from '../pages/AssignmentAttemptPage';
import VideoPage from '../pages/VideoPage';
import NewDashboardPage from '../pages/NewDashboardPage';
import CourseDashboard from '../pages/CourseDashboardPage';
import store from '../store';
import { Provider } from 'react-redux';
import { AuthProvider, AuthContext } from '../contexts/AuthContext';
import MyProfilePage from '../pages/MyProfilePage';
import QuizFormPage from '../pages/QuizFormPage';
import CreateCourseForm from '../components/NewCourseForm';
import AssignmentFormPage from '../pages/AssignmentFormPage';
import ReadingMaterialForm from '../pages/ReadingMaterialFormPage';
import VideoLectureFormPage from '../pages/VideoLectureFormPage';
import VideoPlayerPage from '../pages/VideoPlayerPage';
import NewQuizAttemptPage from '../pages/NewQuizAttemptPage';
import NewAssignmentAttemptPage from '../pages/NewAssignmentAttemptPage';

// Create a PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CourseProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<RegistrationPage />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              {/* <Route path="/" element={<DashboardPage />} /> */}
              {/* <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} /> */}
              <Route path="/dashboard" element={<NewDashboardPage />} />
              <Route path="/my-profile" element={<MyProfilePage />} />
              <Route path="/courses" element={<CourseCatalogPage />} />
              {/* <Route path="/courses/:courseId" element={<CourseDetailsPage />} /> */}
              <Route path="/courses/:id" element={<CourseDashboard />} />
              <Route path="/enrolled-courses" element={<EnrolledCoursesPage />} />
              {/* <Route path="/" element={<CourseList />} /> */}
              {/* <Route path="/create-course" element={<CourseForm />} /> */}
              <Route path="/create-course" element={<CreateCourseForm />} />
              <Route path="/course/:id/add-quiz" element={<QuizFormPage isEditing={false} />} />
              <Route path="/course/:id/edit-quiz/:quizId" element={<QuizFormPage isEditing={true} />} />
              <Route path="/course/:id/add-assignment" element={<AssignmentFormPage />} />
              <Route path="/course/:id/add-reading-material" element={<ReadingMaterialForm />} />
              <Route path="/course/:id/add-video-lecture" element={<VideoLectureFormPage />} />
              <Route path="/video/:videoId" element={<VideoPlayerPage /> } />
              <Route path="/course/:courseId/quiz/attempt/:quizId" element={<NewQuizAttemptPage />} />
              <Route path="/course/:courseId/assignment/attempt/:assignmentId" element={<NewAssignmentAttemptPage />} />





              <Route path="/quizzes" element={<QuizCatalog />} />
              <Route path="/quiz/create" element={<QuizForm />} />
              <Route path="/quiz/edit/:id" element={<QuizForm />} />
              {/* <Route path="/quiz/attempt/:id" element={<QuizAttemptPage />} /> */}
              <Route path="/assignments" element={<AssignmentCatalog />} />
              <Route path="/assignment/create" element={<AssignmentForm />} />
              {/* <Route path="/assignment/edit/:id" element={<AssignmentForm />} /> */}
              <Route path="/assignment/attempt/:id" element={<AssignmentAttemptPage />} />
              {/* <Route path="/video" element={<VideoPage />} /> */}
            </Routes>
          </BrowserRouter>
        </CourseProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;