import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { Button, Card } from "@mui/material";
import { Box, Input, Radio, RadioGroup } from "@mui/joy";
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import axios from "axios";
import ResumeDisplay from "../components/ResumeDisplay";
import '../components/resume.css'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'


function Resume() {

    const pdfRef = useRef(null);

    const { userName } = JSON.parse(sessionStorage.getItem("user"))

    const generatePdf = async () => {
        const canvas = await html2canvas(pdfRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        return pdf;
    };


    const handleSubmit = async () => {
        const pdf = await generatePdf()
        const pdfBlob = pdf.output('blob')
        const formData = new FormData()
        formData.append('username',userName)
        formData.append('pdf',pdfBlob)


        try {
            await axios.post('https://resumebuilder-8kmu.onrender.com/api/resume/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Resume uploaded')
        } catch(err) {
            console.error('Error uploading resume : ',err);
        }
    }

    const handleDownload = async () => {
        const pdf = await generatePdf();
        pdf.save('download.pdf');
    }

    const navigate = useNavigate()


    useEffect(() => {

        const user = JSON.parse(sessionStorage.getItem("user"));
        // console.log(user);
        if (user === null)
            navigate("/signup")
    }) 

    const [ name, setName ] = useState('John Doe');
    const handleName = (event) => {
        const inputName = event.target.value;
        setName(inputName);
    }

    const [ email, setEmail ] = useState('johndoe@gmail.com');
    const handleEmail = (event) => {
        const inputValue = event.target.value;
        setEmail(inputValue);
    }

    const [ phone, setPhone ] = useState('+91 9837xxxxxx');
    const handlePhone = (event) => {
        const inputValue = event.target.value;
        setPhone(inputValue);
    }

    const [ address, setAddress ] = useState('Hyderabad, India');
    const handleAddress = (event) => {
        const inputValue = event.target.value;
        setAddress(inputValue);
    }

    

    const [secondary, setSecondary] = useState({
        schoolname: 'CVR School of abcd',
        year_of_passing: '2020',
        percentage: '100',
    })

    const handleSecondary = (e) => {
        const { name, value } = e.target;
        setSecondary({
            ...secondary,
            [name]: value
        });
    }

    const [intermediate, setIntermediate] = useState({
        collegename: 'SRI CHAITANYA',
        year_of_passing: '2022',
        percentage: '100',
        course: 'MPC',
    })

    const handleIntermediate = (e) => {
        const { name, value } = e.target;
        setIntermediate({
            ...intermediate,
            [name]: value
        });
    }

    const intermediateCourseChange = (e) => {
        const { value } = e.target;
        setIntermediate((prevValue) => ({
            ...prevValue,
            course: value
        }))
        console.log(value)
    }

    const [graduation, setGraduation] = useState({
        collegename: 'CVR College of engineering',
        year_of_passing: '2026',
        percentage: '100',
        course: 'CSE-Data science',
    })


    const handleGraduation = (e) => {
        const { name, value } = e.target;
        setGraduation({
            ...graduation,
            [name]: value
        });
    }

    const graduationCourseChange = (e) => {
        e.preventDefault()
        const { value } = e.target
        setGraduation({
            ...graduation,
            course: value
        })
    }
    const bioData = 'John Doe is a passionate software aspirant with a strong foundation in computer science and hands-on experience in programming languages such as JavaScript and Python. A recent computer science graduate, he excels in software development, problem-solving, and collaborative projects.'
    const [ bio, setbio ] = useState(bioData)
    const handleBio = (e) => {
        const { value } = e.target
        setbio(value)
    }

    const [ tag, setTag ] = useState('Data Science Engineer')
    const handleTag = (e) => {
        const { value } = e.target
        setTag(value)
    }

    const techSkills = ["C", "C++", "Java", "JS", "React", "HTML"];
    const [choosenTechSkills, setChoosenTechSkills] = useState(['C','Java','C++']);

    const handleTechSkillsChange = (e) => {
        const skill = e.target.value;
        if (e.target.checked) {
            setChoosenTechSkills([...choosenTechSkills, skill]);
        } else {
            setChoosenTechSkills(choosenTechSkills.filter((s) => s !== skill));
        }
    };

    const [hobbies, setHobbies] = useState([""]);
    const hobbiesChange = (e, i) => {
        const { value } = e.target;
        const temp = [...hobbies];
        temp[i] = value;
        setHobbies(temp);
    };

    const hobbiesAdd = () => {
        setHobbies([...hobbies, ""]);
    };

    const hobbiesDelete = (i) => {
        const temp = [...hobbies];
        temp.splice(i, 1);
        setHobbies(temp);
    };



    const [certificate, setCertificate] = useState([""]);

    const certificateChange = (e, i) => {
        const { value } = e.target;
        const temp = [...certificate];
        temp[i] = value;
        setCertificate(temp);
    };

    const certificateAdd = () => {
        setCertificate([...certificate, ""]);
    };

    const certificateDelete = (i) => {
        const temp = [...certificate];
        temp.splice(i, 1);
        setCertificate(temp);
    };

    const [projects, setProjects] = useState([{ title: "", info: "" }]);
    const projectsChange = (e, i, field) => {
        const { value } = e.target;
        const temp = [...projects];
        temp[i][field] = value;
        setProjects(temp);
    };

    const projectsAdd = () => {
        setProjects([...projects, { title: "", info: "" }]);
    };

    const projectsDelete = (i) => {
        const temp = [...projects];
        temp.splice(i, 1);
        setProjects(temp);
    };


    const [achievements, setAchievements] = useState([{ title: "", info: "" }]);

    const achievementsChange = (e, i, field) => {
        const { value } = e.target;
        const temp = [...achievements];
        temp[i][field] = value;
        setAchievements(temp);
    };

    const achievementsAdd = () => {
        setAchievements([...achievements, { title: "", info: "" }]);
    };

    const achievementsDelete = (i) => {
        const temp = [...achievements];
        temp.splice(i, 1);
        setAchievements(temp);
    };


    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file));
    };

    

    return (
        <div style={{ display: 'flex' }}>
            <div ref={pdfRef}>
                <Box>
                    <ResumeDisplay name={name} email={email} phone={phone} address={address} secondary={secondary} intermediate={intermediate} graduation={graduation} bio={bio} tag={tag} skills={choosenTechSkills} certificates={certificate} hobbies={hobbies} projects={projects} achievements={achievements} image={image}/>
                </Box>
            </div>
            <Box
                height={500}
                p={2}
                pr={8}
                m={1}
                sx={{ border: '2px solid grey' }}
                overflow="scroll"
                style={{ position: "absolute", right: 0 }}
            >
                <div>
                    <SimpleTreeView style={{ display: "flex", flexDirection: "column",  }}>
                        <Card className="m-2 mb-3" style={{ width: "115%" }}>
                        
                            <TreeItem itemId="1" label="|PersonalDetails" >
                                <div style={{ display: "flex", flexDirection: "column", padding: "5px" }}>
                                    <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
                                        <label>Name</label>
                                        <input
                                            className="custom-input"
                                            type="text"
                                            placeholder="Enter Name"
                                            name="uname"
                                            value={name}
                                            onChange={handleName}
                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
                                        <label>E-mail</label>
                                        <Input
                                            placeholder="Enter Email"
                                            name="email"
                                            value={email}
                                            onChange={handleEmail}
                                        ></Input>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
                                        <label>Contact</label>
                                        <Input
                                            placeholder="Enter Contact"
                                            name="contact"
                                            value={phone}
                                            onChange={handlePhone}
                                        ></Input>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
                                        <label>Address</label>
                                        <Input
                                            placeholder="Enter Address"
                                            name="address"
                                            value={address}
                                            onChange={handleAddress}
                                        ></Input>
                                    </div>
                                </div>
                            </TreeItem>
                        </Card>
                        
                        <Card className="m-2 mb-3" style={{ width: "115%" }}>
                            <TreeItem itemId="10" label="|Bio" >
                                <div style={{ display: "flex", flexDirection: "column", padding: "5px" }}>
                                    <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
                                        <Input
                                            className="custom-input"
                                            placeholder="Enter bio"
                                            name="bio"
                                            value={bio}
                                            onChange={handleBio}
                                        ></Input>
                                    </div>
                                </div>
                            </TreeItem>
                        </Card>
                        <Card className="m-2 mb-3" style={{ width: "115%" }}>
                            <TreeItem itemId="11" label="|Tag">
                                <div style={{ display: "flex", flexDirection: "column", padding: "5px" }}>
                                    <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
                                        <Input
                                            className="custom-input"
                                            placeholder="Enter Tag"
                                            name="tag"
                                            value={tag}
                                            onChange={handleTag}
                                        ></Input>
                                    </div>
                                </div>
                            </TreeItem>
                        </Card>
                        <Card className="m-2 mb-3" style={{ width: "115%" }}>
                            <TreeItem itemId="3" label="|Education" >
                                <div style={{ display: "flex", flexDirection: "column", padding: "5px" }}>
                                    <TreeItem itemId="2-1" label="|Secondary Schooling">
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <label>School Name</label>
                                            <Input
                                                placeholder="Enter School Name"
                                                name="schoolname"
                                                value={secondary.schoolname}
                                                onChange={handleSecondary}
                                            ></Input>
                                            <label>Year of Passing</label>
                                            <Input
                                                placeholder="Enter Year of Passing"
                                                name="year_of_passing"
                                                value={secondary.year_of_passing}
                                                onChange={handleSecondary}
                                            ></Input>
                                            <label>Percentage</label>
                                            <Input
                                                placeholder="Enter Percentage"
                                                name="percentage"
                                                value={secondary.percentage}
                                                onChange={handleSecondary}
                                            ></Input>
                                        </div>
                                    </TreeItem>
                                    <TreeItem itemId="2-2" label="|Intermediate">
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <label>College Name</label>
                                            <Input
                                                placeholder="Enter College Name"
                                                name="collegename"
                                                value={intermediate.collegename}
                                                onChange={handleIntermediate}
                                            ></Input>
                                            <label>Course</label>
                                            <RadioGroup onChange={intermediateCourseChange} >
                                                <Radio id="1" name="course" value="MPC" label="MPC" />
                                                <Radio id="2" name="course" value="BiPC" label="BiPC" />
                                                <Radio id="3" name="course" value="CEC" label="CEC" />
                                            </RadioGroup>
                                            <label>Year of Passing</label>
                                            <Input
                                                placeholder="Enter Year of Passing"
                                                name="year_of_passing"
                                                value={intermediate.year_of_passing}
                                                onChange={handleIntermediate}
                                            ></Input>
                                            <label>Percentage</label>
                                            <Input
                                                placeholder="Enter Percentage"
                                                name="percentage"
                                                value={intermediate.percentage}
                                                onChange={handleIntermediate}
                                            ></Input>
                                        </div>
                                    </TreeItem>
                                    <TreeItem itemId="2-3" label="|Graduation">
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <label>College Name</label>
                                            <Input
                                                placeholder="Enter College Name"
                                                name="collegename"
                                                value={graduation.collegename}
                                                onChange={handleGraduation}
                                            ></Input>
                                            <label>Year of Passing</label>
                                            <Input
                                                placeholder="Enter Year of Passing"
                                                name="year_of_passing"
                                                value={graduation.year_of_passing}
                                                onChange={handleGraduation}
                                            ></Input>
                                            <label>Course</label>
                                            <RadioGroup >
                                                <Radio value="B.Tech" label="B.Tech" onChange={graduationCourseChange} />
                                                <Radio value="Degree" label="Degree" onChange={graduationCourseChange} />
                                            </RadioGroup>
                                            <label>Percentage</label>
                                            <Input
                                                placeholder="Enter Percentage"
                                                name="percentage"
                                                value={graduation.percentage}
                                                onChange={handleGraduation}
                                            ></Input>
                                        </div>
                                    </TreeItem>
                                </div>
                            </TreeItem>
                        </Card>
                        <Card className="m-2 mb-3" style={{ width: "115%" }}>
                <TreeItem itemId="4" label="|Skills">
                    <div>
                        <FormGroup>
                            {techSkills.map((skill, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={<Checkbox />}
                                    value={skill}
                                    label={skill}
                                    onChange={handleTechSkillsChange}
                                />
                            ))}
                        </FormGroup>
                    </div>
                </TreeItem>
            </Card>
            <Card className="m-2 mb-3" style={{ width: "115%" }}>
                <TreeItem itemId="6" label="|Certification">
                    <div>
                        <Button onClick={certificateAdd}>Add</Button>
                        {certificate.map((d, i) => (
                            <div style={{ display: "flex" }} key={i}>
                                <Input value={d} onChange={(e) => certificateChange(e, i)} />
                                <Button onClick={() => certificateDelete(i)}>x</Button>
                            </div>
                        ))}
                    </div>
                </TreeItem>
            </Card>
            <Card className="m-2 mb-3" style={{ width: "115%" }}>
                <TreeItem itemId="7" label="|Projects">
                    <div>
                        <Button onClick={projectsAdd}>Add</Button>
                        {projects.map((project, i) => (
                            <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }} key={i}>
                                <Input
                                    placeholder="Project Title"
                                    value={project.title}
                                    onChange={(e) => projectsChange(e, i, "title")}
                                />
                                <Input
                                    placeholder="Project Info"
                                    value={project.info}
                                    onChange={(e) => projectsChange(e, i, "info")}
                                />
                                <Button onClick={() => projectsDelete(i)}>x</Button>
                            </div>
                        ))}
                    </div>
                </TreeItem>
            </Card>
                        <Card className="m-2 mb-3" style={{ width: "115%" }}>
                <TreeItem itemId="8" label="|Achievements">
                    <div>
                        <Button onClick={achievementsAdd}>Add</Button>
                        {achievements.map((achievement, i) => (
                            <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }} key={i}>
                                <Input
                                    placeholder="Achievement Title"
                                    value={achievement.title}
                                    onChange={(e) => achievementsChange(e, i, "title")}
                                />
                                <Input
                                    placeholder="Achievement Info"
                                    value={achievement.info}
                                    onChange={(e) => achievementsChange(e, i, "info")}
                                />
                                <Button onClick={() => achievementsDelete(i)}>x</Button>
                            </div>
                        ))}
                    </div>
                </TreeItem>
            </Card>
                        <Card className="m-2 mb-3" style={{ width: "115%" }}>
                <TreeItem itemId="9" label="|Hobbies">
                    <div>
                        <Button onClick={hobbiesAdd}>Add</Button>
                        {hobbies.map((d, i) => (
                            <div style={{ display: "flex" }} key={i}>
                                <Input value={d} onChange={(e) => hobbiesChange(e, i)} />
                                <Button onClick={() => hobbiesDelete(i)}>x</Button>
                            </div>
                        ))}
                    </div>
                </TreeItem>
            </Card>
            <Card className="m-2 mb-3" style={{ width: "115%" }}>
                <TreeItem itemId="13" label="|Submit Image">
                    <div>
                        <Input type="file" onChange={handleImageChange} />
                    </div>
                </TreeItem>
            </Card>
                        <div style={{ display: "flex", alignSelf: "center" }}>
                            <Button onClick={handleSubmit} style={{ marginLeft: "45px" }}>Submit</Button>
                            <Button onClick={handleDownload} style={{ marginLeft: "5px" }}>Download</Button>
                        </div>
                    </SimpleTreeView>
                </div>
            </Box>
        </div >
    );
}

export default Resume;