import { Link } from "react-router-dom";
import backgroundVideo from "../assets/background.mp4";
import "./Home.css";

function Home() {
    return (
        <div className="home">

            {/* Hero Section */}

            <section className="hero-section">

                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="background-video"
                >
                    <source
                        src={backgroundVideo}
                        type="video/mp4"
                    />
                </video>

                <div className="overlay"></div>

                <div className="hero">

                    <h1>Internship Portal</h1>

                    <p>
                        Find internships, apply to top companies,
                        and kickstart your career.
                    </p>

                    <div className="hero-buttons">

                        <Link to="/internships">
                            <button className="primary">
                                Explore Internships
                            </button>
                        </Link>

                        <Link to="/register">
                            <button className="secondary">
                                Get Started
                            </button>
                        </Link>

                    </div>

                </div>

            </section>

            {/* Features */}

            <section className="features">

                <h2>Why Choose Us?</h2>

                <div className="feature-grid">

                    <div className="feature-card">
                        <h3>🏢 Verified Companies</h3>
                        <p>Connect with trusted companies offering quality internships.</p>
                    </div>

                    <div className="feature-card">
                        <h3>🚀 Easy Applications</h3>
                        <p>Apply for internships quickly with a simple process.</p>
                    </div>

                    <div className="feature-card">
                        <h3>💼 Career Growth</h3>
                        <p>Gain valuable experience and build your professional career.</p>
                    </div>

                    <div className="feature-card">
                        <h3>🌍 Remote Opportunities</h3>
                        <p>Find internships from companies around the world.</p>
                    </div>

                </div>

            </section>

            {/* Statistics */}

            <section className="stats">

                <div className="stat-box">
                    <h2>500+</h2>
                    <p>Internships</p>
                </div>

                <div className="stat-box">
                    <h2>150+</h2>
                    <p>Companies</p>
                </div>

                <div className="stat-box">
                    <h2>2500+</h2>
                    <p>Students</p>
                </div>

                <div className="stat-box">
                    <h2>95%</h2>
                    <p>Success Rate</p>
                </div>

            </section>

            {/* About */}

            <section className="about">

                <h2>About Internship Portal</h2>

                <p>
                    Internship Portal connects students with top companies.
                    Students can explore internship opportunities, apply online,
                    and companies can post and manage internships efficiently.
                </p>

            </section>

            {/* Contact */}

            <section className="contact">

                <h2>Contact Us</h2>

                <p>📧 support@internshipportal.com</p>

                <p>📞 +91 98765 43210</p>

                <p>📍 Vijayawada, Andhra Pradesh</p>

            </section>

        </div>
    );
}

export default Home;