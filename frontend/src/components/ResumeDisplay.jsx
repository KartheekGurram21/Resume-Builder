import React from 'react'
import './resume.css'
import { Avatar } from '@mui/material';
import { MdPhone } from 'react-icons/md'
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

function ResumeDisplay(props) {
  return (
    <>
      <div className="resume-main">
        <div className='left-content'>
          <div className='image-holder'>
              <Avatar alt="image" src={props.image} sx={{ width: 150, height: 150 }}/>
          </div>
          <div className='bio'>
            {props.bio}
          </div>
          <div className='contact'>
            <div className='btn-box-left' style={{ paddingLeft: "65px", paddingRight: "65px"}}>
              Contact
            </div>
            <div className='contact-info'>
              <Avatar sx={{ bgcolor: "violet", width: 25, height: 25}}>
              <MdPhone style={{ color: "black", fontSize: "10px"  }}/>
              </Avatar>
              <span className='contact-info-text'>{props.phone}</span>
            </div>
            <div className='contact-info'>
              <Avatar sx={{ bgcolor: "violet", width: 25, height: 25}}>
              <FaEnvelope style={{ color: "black", fontSize: "10px" }}/>
              </Avatar>
              <span className='contact-info-text'>{props.email}</span>
            </div>
            <div className='contact-info'>
              <Avatar sx={{ bgcolor: "violet", width: 25, height: 25}}>
              <FaMapMarkerAlt style={{ color: "black", fontSize: "10px" }}/>
              </Avatar>
              <span className='contact-info-text'>{props.address}</span>
            </div>
          </div>
          <div>
            <div className='btn-box-left' style={{ paddingLeft: "75px", paddingRight: "75px"}}>
              Skills
            </div>
            <div className='skills-content'>
              <ul>
              {props.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
            <div className='btn-box-left' style={{ paddingLeft: "45px", paddingRight: "45px"}}>
              Certifications
            </div>
            <div className='skills-content'>
            <ul>
                {props.certificates.map((certificate, index) => (
                    <li key={index}>{certificate}</li>
                ))}
            </ul>
            </div>
            </div>
            <div>
            <div className='btn-box-left' style={{ paddingLeft: "65px", paddingRight: "65px"}}>
              Hobbies
            </div>
            <div className='skills-content'>
            <ul>
                {props.hobbies.map((hobby, index) => (
                    <li key={index}>{hobby}</li>
                ))}
            </ul>
            </div>
            </div>
          </div>
        </div>
        <div className='right-content'>
          <div className='title'>
            <div className='title-name'>
              {props.name}
            </div>
            <div className='title-subtitle'>
              {props.tag}
            </div>
          </div>
          <div className='info-content'>
            <div className='education-content'>
              <div className='btn-box'>
                Education
              </div>
              <div>
                {props.secondary.year_of_passing}
              </div>
              <div>
                {props.secondary.schoolname}
              </div>
              <div className='percentage'>
                {props.secondary.percentage}%
              </div>
              <div>
                {props.intermediate.year_of_passing}
              </div>
              <div>
                {props.intermediate.collegename}
              </div>
              <div>
                {props.intermediate.course}
              </div>
              <div className='percentage'>
                {props.intermediate.percentage}%
              </div>
              <div>
                {props.graduation.year_of_passing}
              </div>
              <div>
                {props.graduation.collegename}
              </div>
              <div>
                {props.graduation.course}
              </div>
              <div className='percentage'>
                {props.graduation.percentage}%
              </div>
            </div>
          </div>
          <div className='project-content'>
            <div className='btn-box'>
              Projects
            </div>
            <div>
            {props.projects.map((project, index) => (
                <div key={index}>
                    <div>
                        {project.title}
                    </div>
                    <div className='project-desc'>
                        {project.info}
                    </div>
                </div>
            ))}
              
              
            </div>
          </div>
          <div className='achievements-content'>
            <div className='btn-box' style={{ marginTop: "20px"}}>
              ACHIEVEMENTS
            </div>
            
            {props.achievements.map((achievement, index) => (
                <div key={index}>
                    <div>
                        {achievement.title}
                    </div>
                    <div className='achievement-desc'>
                        {achievement.info}
                    </div>
                </div>
            ))}
            
          </div>
          
          
        </div>
      </div>
    </>
  );
}

export default ResumeDisplay;