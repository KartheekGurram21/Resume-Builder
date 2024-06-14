# Resume Builder  
Welcome to Resume Builder, a full-stack web application for creating and managing professional resumes.  

## Tech used
- React
- NodeJs and ExpressJs
- Mongodb and Mongoose
- Bcrypt and Validator
- jsPdf and jszip
- filesaver
  
## Instructions to use
```
git clone https://github.com/Woolneat/ResumeBuilder.git
cd frontend 
npm i
cd ..\backend
npm i
```
The above commands will install all dependencies. Now, before running the application
create a .env file in backend folder and add the following code to it.

```
PORT = <your port number or just use 3000>
MONGO_URI = mongodb+srv://<user_name>:<password>@<cluster-name>.iwpphli.mongodb.net/?retryWrites=true&w=majority
```
```
cd backend
npm run dev
cd ..\frontend
npm run dev
```

I'm using Mongodb Atlas to store data , so just add your own connection string.
This website also has user authentication and authorization
using Bcrypt,  validator.

#### The website is live on vercel https://resumegenerator-alpha.vercel.app/  
