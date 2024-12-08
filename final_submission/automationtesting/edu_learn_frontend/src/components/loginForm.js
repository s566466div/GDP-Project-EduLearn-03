import InputField from "./inputField";
import './loginForm.css';
import { validateEmail, validatePassword } from "../utils/formValidation";

function LoginForm({ formData, setFormData, errors, setErrors, onSubmit }) {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (e) => {
        setFormData({ ...formData, role: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        newErrors.email = validateEmail(formData.email);
        newErrors.password = validatePassword(formData.password);
        setErrors(newErrors);
        // console.log(Object.values(newErrors));
        for (let error of Object.values(newErrors)) {
            if (error.length != 0) {
                return false;
            }
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Role:</label>
                <input type="radio" value="student" name="role" checked={formData.role === 'student'} onChange={handleRoleChange} /> Student
                <input type="radio" value="instructor" name="role" checked={formData.role === 'instructor'} onChange={handleRoleChange} /> Instructor
                {errors.role && <span className="error">{errors.role}</span>}
            </div>
            <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />
            <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm;