import React, { useState, useEffect, useRef } from 'react';

// Import the profile picture from the assets folder.
import myProfilePic from './assets/myimage.jpg';

// Import certificate images
import javaBootcampCert from './assets/javabootcamp.png';
import deloitteCert from './assets/deloitte.png';

// Import all necessary Font Awesome icon packages.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faJava,
  faPython,
  faGitAlt,
  faLinkedin,
  faGithub,
  faTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faMobileScreenButton,
  faBrain,
  faLightbulb,
  faPuzzlePiece,
  faC,
  faLink,
  faPaperPlane,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const sectionsRef = useRef({});

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    subject: '',
    message: ''
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Replace "YOUR_FORMSPREE_FORM_ID" with your actual Formspree form ID
    const formUrl = "https://formspree.io/f/YOUR_FORMSPREE_FORM_ID";
    
    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showToast('Message sent successfully!', 'success');
        setFormData({ email: '', name: '', subject: '', message: '' });
      } else {
        showToast('Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      showToast('An error occurred. Please try again later.', 'error');
    }
  };

  const useTypingEffect = (text, speed = 100) => {
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    useEffect(() => {
      if (!isTyping) return;
      const timer = setTimeout(() => {
        setTypedText(text.slice(0, typedText.length + 1));
      }, speed);
      if (typedText === text) {
        setIsTyping(false);
      }
      return () => clearTimeout(timer);
    }, [typedText, isTyping, text, speed]);
    return typedText;
  };

  const roles = ["coder", "problem solver", "Fullstack developer", "Software developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const typedHomeText = useTypingEffect("Hi, I'm Venkatachala V", 100);

  const renderRole = (role) => {
    return <span className="text-teal-400 font-bold">{role}</span>;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [roles]);

  const showToast = (text, type = 'success') => {
    setMessage({ text, type });
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 3000);
  };

  const handleScrollTo = (id) => {
    const element = sectionsRef.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionsRef.current.home) return;
      const home = sectionsRef.current.home.getBoundingClientRect().top;
      const about = sectionsRef.current.about.getBoundingClientRect().top;
      const skills = sectionsRef.current.skills.getBoundingClientRect().top;
      const projects = sectionsRef.current.projects.getBoundingClientRect().top;
      const education = sectionsRef.current.education.getBoundingClientRect().top;
      const certificates = sectionsRef.current.certificates.getBoundingClientRect().top;
      const contact = sectionsRef.current.contact.getBoundingClientRect().top;
      if (home <= 0 && about > 0) setActiveSection('home');
      else if (about <= 0 && skills > 0) setActiveSection('about');
      else if (skills <= 0 && projects > 0) setActiveSection('skills');
      else if (projects <= 0 && education > 0) setActiveSection('projects');
      else if (education <= 0 && certificates > 0) setActiveSection('education');
      else if (certificates <= 0 && contact > 0) setActiveSection('certificates');
      else if (contact <= 0) setActiveSection('contact');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSectionRef = (id) => (el) => {
    sectionsRef.current[id] = el;
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const skillIcons = {
    'HTML': faHtml5,
    'CSS': faCss3Alt,
    'JavaScript': faJs,
    'React': faReact,
    'Flutter': faMobileScreenButton,
    'Java': faJava,
    'Python': faPython,
    'C': faC,
    'Git': faGitAlt,
    'DSA': faBrain,
    'OOP': faLightbulb,
    'Problem Solving': faPuzzlePiece,
  };

  return (
    <div className="bg-slate-900 text-white font-inter">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
        .typing-effect::after {
          content: '|';
          animation: blink 1s infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .message-box {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
          opacity: 0;
          visibility: hidden;
        }
        .message-box.visible {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(-10px);
        }
        .parallax-card {
            transition: transform 0.3s ease-out;
        }
        .parallax-card:hover {
            transform: scale(1.05) perspective(1000px) rotateX(10deg) rotateY(-10deg);
        }
        .parallax-tilt-container {
            transform-style: preserve-3d;
        }
        /* Gradient button for send */
        .gradient-button {
            background-image: linear-gradient(to right, #8A2BE2, #FF1493); /* Purple to Pink */
            transition: all 0.3s ease;
        }
        .gradient-button:hover {
            background-image: linear-gradient(to left, #8A2BE2, #FF1493); /* Reverse gradient on hover */
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        /* Dark input field styling */
        .contact-input {
            background-color: #1a202c; /* slate-900 equivalent */
            border: 1px solid #4a5568; /* gray-700 equivalent */
            color: #e2e8f0; /* gray-200 equivalent */
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            width: 100%;
            box-sizing: border-box;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-input:focus {
            outline: none;
            border-color: #63b3ed; /* blue-400 equivalent */
            box-shadow: 0 0 0 2px rgba(99, 179, 237, 0.5); /* blue-400 with opacity */
        }
        `}
      </style>
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 bg-opacity-80 backdrop-filter backdrop-blur-sm shadow-lg">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-teal-400">Venkatachala.dev</div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
          <ul className={`md:flex md:items-center md:space-x-6 absolute md:static bg-slate-900 md:bg-transparent w-full md:w-auto left-0 transition-all duration-300 ease-in-out ${menuOpen ? 'top-14' : 'top-[-490px]'}`}>
            {['home', 'about', 'skills', 'projects', 'education', 'certificates', 'contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={() => handleScrollTo(item)}
                  className={`block md:inline-block px-4 py-2 rounded-md transition duration-300 hover:bg-slate-700 ${activeSection === item ? 'text-teal-400 font-bold' : 'text-gray-300'}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className={`message-box ${isMessageVisible ? 'visible' : ''}`}>
        <div className={`px-6 py-3 rounded-xl shadow-lg ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white text-sm`}>
          {message.text}
        </div>
      </div>
      <main className="container mx-auto p-4 md:p-8 pt-24">
        <section ref={getSectionRef('home')} id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left">
          <div className="flex-1 md:pr-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-teal-400 leading-tight mb-4">
              <span className="typing-effect">{typedHomeText}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto md:mx-0">
              I'm a {renderRole(roles[currentRoleIndex])}
            </p>
            <div className="mt-8 space-y-4 md:space-y-0 md:space-x-4">
              <a href="#about" onClick={() => handleScrollTo('about')} className="bg-teal-500 hover:bg-teal-600 transition duration-300 text-white font-bold py-3 px-6 rounded-full shadow-lg inline-block">About Me</a>
            </div>
          </div>
          <div className="flex-1 mt-10 md:mt-0 flex justify-center md:justify-end">
            <img
              // Replace this URL with the direct link to the image you want to use.
              src="https://personal-portfolio-three-sage.vercel.app/assets/images/hero.png"
              alt="Venkatachala V"
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-teal-500 shadow-xl"
            />
          </div>
        </section>
        <section ref={getSectionRef('about')} id="about" className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-4xl mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
              <img
                src={myProfilePic}
                alt="Venkatachala V"
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-teal-500 shadow-xl mx-auto"
              />
            </div>
            <div className="md:w-1/2 md:pl-8 text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                About Me
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-6">
                An Aspiring Software Developer
              </p>
              <p className="text-md md:text-lg text-gray-400 leading-relaxed mb-4">
                I am a third-year Computer Science student at M. S. Ramaiah Institute of Technology. My journey into software development is driven by a passion for problem-solving and a desire to build impactful applications. I specialize in Java, Data Structures & Algorithms, and modern web technologies. My projects showcase my dedication to creating efficient, scalable, and user-friendly solutions. I am a quick learner and a team player, always eager to take on new challenges and contribute to a collaborative environment.</p>
              <a href="./resume.pdf" download className="bg-teal-500 hover:bg-teal-600 transition duration-300 text-white font-bold py-3 px-6 rounded-full shadow-lg inline-block">Download Resume</a>
            </div>
          </div>
        </section>
        <section ref={getSectionRef('skills')} id="skills" className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center w-full max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
              My Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {[
                { name: 'HTML', color: 'text-orange-500' },
                { name: 'CSS', color: 'text-blue-500' },
                { name: 'JavaScript', color: 'text-yellow-500' },
                { name: 'React', color: 'text-sky-500' },
                { name: 'Flutter', color: 'text-blue-400' },
                { name: 'Java', color: 'text-red-500' },
                { name: 'Python', color: 'text-cyan-500' },
                { name: 'C', color: 'text-blue-700' },
                { name: 'Git', color: 'text-red-600' },
                { name: 'DSA', color: 'text-purple-400' },
                { name: 'OOP', color: 'text-yellow-300' },
                { name: 'Problem Solving', color: 'text-green-500' },
              ].map((skill, index) => (
                <div key={index} className="parallax-tilt-container">
                  <div className="parallax-card bg-slate-800 p-8 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:bg-slate-700 cursor-pointer">
                    <div className={`text-6xl ${skill.color} mb-4`}>
                      <FontAwesomeIcon icon={skillIcons[skill.name]} />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section ref={getSectionRef('projects')} id="projects" className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center w-full max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
              My Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Crichub Website',
                  desc: 'Designed and developed an interactive cricket fan website dedicated to the ICC Cricket World Cup 2023. Implemented features such as team profiles, match schedules, and player statistics to deliver an engaging experience for cricket enthusiasts. Focused on creating a responsive and user-friendly interface to ensure seamless access across devices.',
                  github: 'https://github.com/Venkatachla',
                  live: '#'
                },
                {
                  title: 'Doctor\'s appointment booking app',
                  desc: 'This app is able to connect doctors and patients within a short time. This app simplifies the process of finding and scheduling doctor visits, improving convenience for both patients and healthcare providers.',
                  github: 'https://github.com/Venkatachla/Mediapp',
                  live: '#'
                },
                {
                  title: 'Fake News Detection System',
                  desc: 'Developed a machine learning model to classify news articles as real or fake. Applied Natural Language Processing (NLP) techniques for text preprocessing and feature extraction. Achieved high accuracy in detecting fake news, contributing to combating misinformation.',
                  github: 'https://github.com/Venkatachla/Fake_News_Detection_usingEDA',
                  live: '#'
                },
              ].map((project, index) => (
                <div key={index} className="parallax-tilt-container">
                  <div className="parallax-card bg-slate-800 p-8 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:bg-slate-700 cursor-pointer">
                    <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-gray-400 mb-6">{project.desc}</p>
                    <div className="flex justify-center space-x-4">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-slate-700 text-gray-300 px-4 py-2 rounded-full hover:bg-slate-600 transition duration-300 flex items-center space-x-2">
                        <FontAwesomeIcon icon={faGithub} className="text-xl" />
                        <span>GitHub</span>
                      </a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition duration-300 flex items-center space-x-2">
                        <FontAwesomeIcon icon={faLink} className="text-xl" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section ref={getSectionRef('education')} id="education" className="min-h-screen flex items-center justify-center p-4">
  <div className="text-center w-full max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
      My Education
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
  <div className="text-left bg-slate-800 p-8 rounded-xl shadow-lg">
    <h3 className="text-2xl font-bold text-teal-400 mb-4">BE in Computer Science</h3>
    <p className="text-gray-300 font-semibold mb-2">M. S. Ramaiah Institute of Technology</p>
    <p className="text-400 text-sm">Present: 2023 - 2027</p>
    <p className="text-400 text-sm">CGPA: 9.77</p>
    <p className="text-gray-400 leading-relaxed">
      I am a third-year Computer Science student at M. S. Ramaiah Institute of Technology. My journey into software development is driven by a passion for problem-solving and a desire to build impactful applications. I specialize in Java, Data Structures & Algorithms, and modern web technologies. 
    </p>
  </div>
  <div className="flex justify-center">
    <img src="https://www.iesonline.co.in/colleges-image/ramaiah-institute-of-technology.jpg" alt="M. S. Ramaiah Institute of Technology" className="rounded-xl shadow-lg w-96 h-100" />
  </div>
</div>
    <div className="mt-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-left bg-slate-800 p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Pre-University (12th Grade)</h3>
          <p className="text-gray-300 font-semibold">Mandavya Excellence PU College</p>
          <p className="text-400 text-sm">Completed: 2023</p>
          <p className="text-gray-400 text-sm">Percentage: 97.33%</p>
          <p className="text-gray-400 leading-relaxed">
            I completed my class 12 education from Mandavya Excellence PU college, Mandya, under the Karnataka state board, where I studied Physics, Chemistry, and Mathematics (PCM) with Biology.
          </p>
        </div>
        <div className="flex justify-center">
          <img src="https://cache.careers360.mobi/media/schools/social-media/media-gallery/25651/2020/8/19/Mandavya%20Excellence%20Pre%20University%20College-Campus-View.jpg" alt="Mandavya Excellence PU College" className="rounded-xl shadow-lg w-80 h-auto" />
        </div>
      </div>
    </div>
    <div className="mt-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-left bg-slate-800 p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Secondary School (10th Grade)</h3>
          <p className="text-gray-300 font-semibold">Poorna Prajna Convent</p>
          <p className="text-400 text-sm">Completed: 2021</p>
          <p className="text-gray-400 text-sm">Percentage: 97.12%</p>
          <p className="text-gray-400 leading-relaxed">
            I completed my class 10 education from Poorna Prajna Convent, Maddur, under the Karnataka stateboard.
          </p>
        </div>
        <div className="flex justify-center">
          <img src="https://poornaprajna.ac.in/img/bhadravati.jpg" alt="Poorna Prajna Convent" className="rounded-xl shadow-lg w-80 h-auto" />
        </div>
      </div>
    </div>
  </div>
</section>
        <section ref={getSectionRef('certificates')} id="certificates" className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center w-full max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
              Certificates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-800 p-8 rounded-xl shadow-lg text-left flex flex-col items-center">
                <h3 className="text-xl font-bold text-teal-400 mb-2">Deloitte Australia Technology Job Simulation on Forage</h3>
                <p className="text-gray-400 text-sm mb-4">September 2025</p>
                <p className="text-gray-400 leading-relaxed mb-4">Completed a Job simulation involving development and coding. Wrote a proposal for creating a dashboard.</p>
                <img src={deloitteCert} alt="Deloitte Certificate" className="w-full h-auto rounded-lg shadow-md mt-auto max-w-xs md:max-w-none" />
              </div>
              <div className="bg-slate-800 p-8 rounded-xl shadow-lg text-left flex flex-col items-center">
                <h3 className="text-xl font-bold text-teal-400 mb-2">Java Bootcamp - LetsUpgrade</h3>
                <p className="text-gray-400 text-sm mb-4">August 2025</p>
                <p className="text-gray-400 leading-relaxed mb-4">Completed a 3-day intensive program focusing on Java programming, OOP, DSA, and project-based learning.</p>
                <img src={javaBootcampCert} alt="Java Bootcamp Certificate" className="w-full h-auto rounded-lg shadow-md mt-auto max-w-xs md:max-w-none" />
              </div>
            </div>
          </div>
        </section>
        <section ref={getSectionRef('contact')} id="contact" className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
          <div className="text-center max-w-2xl mx-auto w-full">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              CONTACT
            </h2>
            <p className="text-gray-400 mb-8">
              I’d love to hear from you—reach out for any opportunities or questions!
            </p>
            <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 mx-auto max-w-md">
              <h3 className="text-2xl font-bold text-teal-400 mb-6 flex items-center justify-center space-x-2">
                Connect With Me 🚀
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="contact-input"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="contact-input"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="contact-input"
                    value={formData.subject}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows="5"
                    className="contact-input resize-y"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="gradient-button text-white font-bold py-3 px-8 rounded-full shadow-lg w-full flex items-center justify-center space-x-2"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                  <span>Send</span>
                </button>
              </form>
              <div className="mt-8 pt-6 border-t border-slate-700 text-left">
                <h4 className="text-xl font-bold text-white mb-4">My Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FontAwesomeIcon icon={faEnvelope} className="text-teal-400 text-xl" />
                    <span>venkatachalavenku@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FontAwesomeIcon icon={faPhone} className="text-teal-400 text-xl" />
                    <span>7483074226</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-teal-400 text-xl" />
                    <span>Bengaluru, Karnataka, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-slate-800 p-8 text-center text-gray-400">
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl font-bold text-white mb-4">Venkatachala V</p>
          <ul className="flex justify-center space-x-6 mb-6">
            {['about', 'skills', 'projects', 'education'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={() => handleScrollTo(item)}
                  className={`text-gray-300 hover:text-teal-400 transition duration-300 ${activeSection === item ? 'font-semibold' : ''}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://www.linkedin.com/in/venkatachala-v-41532029a/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-white transition duration-300">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com/Venkatachla" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-white transition duration-300">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://twitter.com/Venkatachla" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-white transition duration-300">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.instagram.com/venkatachala__v?igsh=MWd3ZWRreDV2NDZtMg==" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-white transition duration-300">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://youtube.com/@venkatachalavenku?si=KIgvWpH2Kj_1tGWG" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-white transition duration-300">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Venkatachala V. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;