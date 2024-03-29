const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup Controller for Registering USers

exports.signup = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			name,
			email,
			password,
		} = req.body;
		// Check if All Details are there or not
		if (
			!name||
			!email ||
			!password 
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
	
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}


		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			email,
			password: hashedPassword
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

// Login controller for authenticating users
exports.login = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email }).maxTimeMS(5000);

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, name: user.name,},
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
	
			user.password = undefined;
		
			res.status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
			error: error.message,
		});
	}
};

exports.getuser = async (req, res) => {
  try {
    // Fetch the 'email' header value from the request
    const email = req.params.email;
    console.log(email);
    // Check if email is provided in the header
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email not provided in the request header",
      });
    }

    // Fetch user data from the User collection using findOne
    const userData = await User.findOne({ email });

    // Check if the user was found
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Respond with the fetched user data
    res.status(200).json({
      success: true,
      userData,
      message: "User data is fetched",
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: error.message,
    });
  }
};
