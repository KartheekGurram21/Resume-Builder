import React from 'react';
import HomeImage from '../assets/home.svg';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate = useNavigate()
    const handleNavigation = (path) => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        console.log(user)
        if (user == null)
            navigate("/login")
        else {
            navigate(path)
        }
    };

    return (
        <>
            <section id="header" className="d-flex align-items-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-11 mx-auto">
                            <div className="row">
                                <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                                    <h1>
                                        <div>
                                            Create your Resume with <strong className="brand-name">Resume Builder</strong>
                                        </div>
                                    </h1>
                                    <h2 className="my-3">
                                        
Create your professional resume effortlessly with Resume Builder. Say goodbye to formatting headaches and hello to your dream job.
                                    </h2>
                                    <div className="mt-3">
                                        <div className="btn-get-started ptr" onClick={() => {
                                            handleNavigation('/resume')
                                            console.log("Templates")
                                        }}>
                                            Get Started
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 order-1 order-lg-2 header-image">
                                    <img src={HomeImage} className="img-fluid animated small-image" alt="Home Img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default LandingPage;
