const authService = require("../services/auth.services");

// Register
const Register = async (req, res) => {
    try {
        const regResult = await authService.register(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: regResult,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Login
const Login = async (req, res) => {
    try {
        const loginResult = await authService.login(req.body);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: loginResult,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    Register,
    Login,
};