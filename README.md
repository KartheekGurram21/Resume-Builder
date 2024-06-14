# Resume Builder
Welcome to Resume Builder, a full-stack web application for creating and managing professional resumes.

### Features
Resume Creation:     Build resumes using a user-friendly interface with customizable sections.  
Resume Templates:    Choose from a variety of professionally designed templates.  
Export and Download: Export resumes in PDF format for easy sharing and printing.  
Backend API:         Node.js backend with MongoDB for storing user data and resumes.  

### Technologies Used
Frontend:             React, JavaScript, HTML, CSS  
Backend:              Node.js, Express.js, MongoDB   
Deployment:           Frontend deployed on Vercel, Backend deployed on Render  
Third-Party Services: MongoDB Atlas for database hosting  

## Getting Started
To run the project locally, follow these steps:

Clone the repository:  

bash  
Copy code  
`git clone https://github.com/Woolneat/ResumeBuilder.git`
cd ResumeBuilder
Install dependencies:

bash
Copy code
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
Set up environment variables:

Create .env files in backend/ directory.
Refer to .env.example files for required environment variables (e.g., MongoDB URI, ports).
Start the development servers:

bash
Copy code
# Start frontend server
cd frontend
npm start

# Start backend server (in a new terminal)
cd ../backend
npm start
Open your browser and visit http://localhost:3000 to view the application.

Deployment
Frontend: The frontend is deployed on Vercel. Any changes pushed to the main branch will automatically trigger a deployment.
Backend: The backend is deployed on Render. Make sure to configure environment variables and set up MongoDB Atlas for production.
Contributing
Contributions are welcome! Fork the repository and submit a pull request with your improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
React: Frontend framework for building user interfaces.
Node.js: Backend JavaScript runtime environment.
MongoDB: NoSQL database for storing resume data.
Render and Vercel: Platforms used for deploying frontend and backend applications.
