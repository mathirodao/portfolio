import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Modal, ListGroup, Button } from "react-bootstrap";
import { BiLogoPostgresql } from "react-icons/bi";
import { IoLogoPython, IoLogoFirebase, IoLogoNodejs } from "react-icons/io5";
import { RiNodejsLine, RiReactjsLine } from "react-icons/ri";
import { SiJavascript } from "react-icons/si";
import { FaDatabase, FaFileImage } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { BsTools } from "react-icons/bs";
import { LuLanguages } from "react-icons/lu";
import AboutMe from "../AboutMe/AboutMe";
import ProjectCard from "../ProjectCard/ProjectCard";
import PdfViewer from "../PdfViewer/PdfViewer";
import { FaFilePdf } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithubSquare } from "react-icons/fa";
import { BiLogoFlask } from "react-icons/bi";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import useInView from "../../Hooks/UseInView";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import Skills from "../Skills/Skills";
import Navbar from "../NavBar/NavBar";
// import "particles.js";

const Home = () => {
  const [showViewer, setShowViewer] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const sectionRefs = useRef([]);
  const [isInView, setIsInView] = useState([]);

  // const [skills, setSkills] = useState([]);
  const [projects, setprojects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      // Cambia 200 por el valor que consideres adecuado
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchCertifications = async () => {
      const certsSnapshot = await getDocs(collection(db, "certifications"));
      const certifications = certsSnapshot.docs.map((doc) => doc.data());
      console.log(certifications);
      setCertifications(certifications);
    };

    const fetchProjects = async () => {
      const projectsSnapshot = await getDocs(collection(db, "projects"));
      const projects = projectsSnapshot.docs.map((doc) => doc.data());
      console.log(projects);
      setprojects(projects);
    };
    fetchProjects();
    fetchCertifications();
  }, []);

  // Función para abrir el modal con el archivo seleccionado
  const handleOpenViewer = (cert) => {
    setSelectedFile(cert);
    setShowViewer(true);
  };

  // Función para cerrar el modal
  const handleCloseViewer = () => {
    setSelectedFile(null);
    setShowViewer(false);
  };

  useEffect(() => {
    window.particlesJS("particles-js", {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: "#fafafa" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: { enable: true, speed: 6 },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
        },
      },
      retina_detect: true,
    });
  }, []);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView((prev) => {
              const newState = [...prev];
              newState[index] = true; // Marca esta sección como visible
              return newState;
            });
          }
        },
        { threshold: 0.5 } // Detecta visibilidad al 50%
      );

      if (ref) observer.observe(ref);

      return () => {
        if (ref) observer.unobserve(ref);
      };
    });

    // Limpieza de los observadores al desmontar
    return () => {
      observers.forEach((unobserve) => unobserve());
    };
  }, []);

  const addRef = (el, index) => {
    sectionRefs.current[index] = el; // Asigna la referencia al índice correspondiente
  };

  return (
    <>
      {/* Contenedor de partículas */}
      <div id="particles-js" className="particles-container z-index-2"></div>

      {/* Contenido principal */}
      <div className="d-flex justify-content-between">
        <div
          className="navbar-column d-none d-md-block"
          style={{ width: "15%" }}
        >
          <Navbar className="p-2" />
        </div>

        <div className="main-content align-self-center">
          <div className="p-2">
            <section id="home">
              <Row className="vh-100 justify-content-center align-items-center position-relative z-index-1">
                <Col xs={12} className="text-center animate-fadeIn">
                  <h1 className="display-1 plus-jakarta-sans-bold">
                    Mathias Rodao
                  </h1>
                  <h2 className="mt-2 text-secondary plus-jakarta-sans-bold">
                    Software Developer
                  </h2>
                  <div className="d-flex flex-wrap justify-content-center gap-0 mt-2">
                    <a
                      href="https://github.com/mathirodao"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-flex align-items-center icon"
                    >
                      <FaGithubSquare size={30} className="me-0" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mathias-rodao/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-flex align-items-center icon"
                    >
                      <FaLinkedin size={30} className="me-0" />
                    </a>
                  </div>
                </Col>

                <Col xs={12} className="text-center animate-fadeIn">
                  <h2 className="display-6 plus-jakarta-sans-bold">
                    Welcome to my site, I am a 27 years old IT Analyst &
                    Programmer Analyst.
                  </h2>
                </Col>
                <Col md={12} className="d-flex justify-content-center mt-0">
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    <Col xs={12} className="text-center animate-fadeIn">
                      <p className="display-10 plus-jakarta-sans-bold mt-3">
                        These are technologies I excel at
                      </p>
                    </Col>
                    {/* Iconos */}
                    <div className="text-center icon">
                      <BiLogoPostgresql
                        style={{
                          fontSize: "3rem",
                          color: "#336791",
                          marginTop: "-5px",
                        }}
                      />{" "}
                      <p className="mt-1 small">PostgreSQL</p>
                    </div>
                    <div className="text-center icon">
                      <IoLogoPython
                        style={{
                          fontSize: "3rem",
                          color: "#3776AB",
                          marginTop: "-5px",
                        }}
                      />{" "}
                      <p className="mt-1 small">Python</p>
                    </div>
                    <div className="text-center icon">
                      <BiLogoFlask
                        style={{
                          fontSize: "3rem",
                          color: "#5C940D",
                          marginTop: "-5px",
                        }}
                      />{" "}
                      <p className="mt-1 small">Flask</p>
                    </div>
                    <div className="text-center icon">
                      <SiJavascript
                        style={{
                          fontSize: "3rem",
                          color: "#F7DF1E",
                          marginTop: "-5px",
                        }}
                      />{" "}
                      <p className="mt-1 small">Javascript</p>
                    </div>
                    <div className="text-center icon">
                      <RiNodejsLine
                        style={{
                          fontSize: "3rem",
                          color: "#339933",
                          marginTop: "-5px",
                        }}
                      />{" "}
                      <p className="mt-1 small">Node JS</p>
                    </div>

                    <div className="text-center icon">
                      <RiReactjsLine
                        style={{
                          fontSize: "3rem",
                          color: "#61DAFB",
                          marginTop: "-5px",
                        }}
                      />{" "}
                      <p className="mt-1 small">React</p>
                    </div>

                    <div className="text-center icon">
                      <IoLogoFirebase
                        style={{
                          fontSize: "3rem",
                          color: "#FFCA28",
                          marginTop: "-5px",
                        }}
                      />{" "}
                      <p className="mt-1 small">Firebase</p>
                    </div>
                  </div>
                </Col>
                <Col xs={12} className="text-center animate-fadeIn">
                  <p className="display-10 plus-jakarta-sans-bold mt-3">
                    Below you can explore more about my skills, experience, and
                    projects.
                  </p>
                </Col>
              </Row>
            </section>

            <section id="about-me">
              <AboutMe
                addRef={addRef}
                isInView={isInView[0] || false} // Verifica si está visible
                index={0} // Índice de esta sección
              />
            </section>
            <section id="technical-skills">
              <Row
                key="technical-skills-row"
                id="technical-skills-row"
                className={`g-4 mt-5 ${
                  isInView[1] ? "animate-fadeInUp" : "invisible-animate"
                }`}
                ref={(el) => addRef(el, 1)}
              >
                <h1 className="display-1 plus-jakarta-sans-bold text-center mb-4">
                  Technical Skills
                </h1>
                <Skills />
              </Row>
            </section>

            {/* Renderización de ProjectCards */}
            <section id="my-projects">
              <Row
                id="my-projects-row"
                className={`g-4 mt-5 ${
                  isInView[2] ? "animate-fadeInUp" : "invisible-animate"
                }`}
                ref={(el) => addRef(el, 2)}
              >
                <h1 className="display-1 plus-jakarta-sans-bold text-center mb-4">
                  My Projects
                </h1>
                {projects.map((project, index) => (
                  <Col xs={12} md={12} lg={6} key={index}>
                    <ProjectCard
                      image={project.image}
                      title={project.title}
                      description={project.description}
                      link={project.link}
                      tag={project.tag}
                      stack={project.stack}
                    />
                  </Col>
                ))}
              </Row>
            </section>

            {/* Renderización de Professional Experience */}
            <section id="professional-experience">
              <Row
                id="professional-experience-row"
                className={`g-4 mt-5 ${
                  isInView[3] ? "animate-fadeInUp" : "invisible-animate"
                }`}
                ref={(el) => addRef(el, 3)}
              >
                <h1 className="display-1 plus-jakarta-sans-bold text-center mb-4">
                  Professional Experience
                </h1>
                <Col xs={12}>
                  <div>
                    <h2 className="display-5 fw-bold">Software Developer</h2>
                    <p className="h4 fw-bold">
                      <strong>Descartes Systems Group</strong> - <em>Canada</em>
                    </p>
                    <p>
                      <em>(March 2021 – September 2024)</em>
                    </p>
                    <ul>
                      <li>
                        Contributed to <strong>Datamyne</strong>, an ETL-driven
                        foreign trade information product, leveraging{" "}
                        <strong>Python</strong> for data processing and
                        transformation.
                      </li>
                      <br />
                      <li>
                        Developed and maintained multiple{" "}
                        <strong>web services</strong> using{" "}
                        <strong>Flask</strong>, enabling key functionalities
                        such as product searches, country-specific filters, and
                        advanced query processing.
                      </li>
                      <li>
                        <strong>Master Table Project:</strong> Led the
                        development of a search system supporting complex
                        queries using codes or keywords, enhancing data
                        retrieval for end-users.
                      </li>
                      <li>
                        Designed and implemented{" "}
                        <strong>custom databases</strong> with tailored schemas
                        for country-specific trade information, ensuring
                        scalability and efficiency across environments.
                      </li>
                      <li>
                        Integrated and optimized <strong>Apache Solr</strong>{" "}
                        for faster search capabilities, including data indexing
                        for valuable insights retrieval.
                      </li>
                      <li>
                        Collaborated on <strong>team-based projects</strong>,
                        while also leading individual initiatives to successful
                        deployment and maintenance.
                      </li>
                      <li>
                        Leveraged <strong>PostgreSQL</strong> databases for
                        robust data storage and processing, ensuring reliability
                        and performance.
                      </li>
                      <li>
                        Operated in a <strong>Linux environment</strong>,
                        proficiently utilizing CLI tools, screen sessions, and
                        scripting for automation and monitoring.
                      </li>
                    </ul>
                    <br />
                    <p>
                      <strong>Technical Stack:</strong> Python, Flask,
                      PostgreSQL, Solr, Linux
                    </p>
                  </div>
                </Col>
                <Col xs={12}>
                  <h2 className="display-5 fw-bold">Software Developer</h2>
                  <p className="h4 fw-bold">
                    <strong>Prismic</strong> - <em>Uruguay</em>
                  </p>
                  <p>
                    <em>(August 2024 – Present)</em>
                  </p>
                  <ul>
                    <li>
                      Contributing to the development of{" "}
                      <strong>Prismic Ecommerce Platform</strong>, an ongoing
                      project for a clothing and accessories e-commerce site.
                    </li>
                    <br />
                    <li>
                      Responsible for building and maintaining the{" "}
                      <strong>frontend</strong> using
                      <strong>JavaScript</strong>, <strong>React</strong>, and{" "}
                      <strong>Chakra UI</strong> to provide a modern and
                      responsive user interface.
                    </li>
                    <li>
                      Handling <strong>Firebase integration</strong> for user
                      authentication, product management, and order processing.
                    </li>
                    <li>
                      Integrated a <strong>MercadoPago payment gateway</strong>{" "}
                      to securely handle online transactions.
                    </li>
                    <li>
                      Developed the <strong>email notification system</strong>{" "}
                      to send automatic emails to users after making a purchase
                      or for account-related updates.
                    </li>
                    <li>
                      Implemented <strong>state management</strong> and routing
                      within the app to ensure a smooth and scalable shopping
                      experience for users.
                    </li>
                    <li>
                      Continuously improving the <strong>performance</strong>{" "}
                      and <strong>usability</strong> of the platform, with
                      regular updates and new features added to enhance the user
                      experience.
                    </li>
                  </ul>
                  <br />
                  <p>
                    <strong>Technical Stack</strong>: JavaScript, React, Chakra
                    UI, Firebase, MercadoPago API
                  </p>
                  <p>
                    <strong>Note</strong>: This project is actively maintained
                    with periodic updates, ensuring the platform evolves in
                    response to user feedback and new requirements.
                  </p>
                </Col>
              </Row>
            </section>

            <section id="certifications">
              <Row
                id="certifications-row"
                className={`g-4 mt-5 ${
                  isInView[4] ? "animate-fadeInUp" : "invisible-animate"
                }`}
                ref={(el) => addRef(el, 4)}
              >
                <h1 className="display-1 plus-jakarta-sans-bold text-center mb-4">
                  Certifications
                </h1>
                {certifications.map((cert) => (
                  <Col
                    key={cert.idCert}
                    xs={12}
                    md={3}
                    className="text-center mb-3"
                  >
                    <div
                      className="d-flex flex-column align-items-center justify-content-center cursor-pointer"
                      onClick={() => handleOpenViewer(cert)}
                      style={{ cursor: "pointer" }}
                    >
                      {cert.type === "pdf" ? (
                        <FaFilePdf size={50} className="mb-2" />
                      ) : (
                        <FaFileImage size={50} className="mb-2" />
                      )}
                      <p className="text-center">{cert.title}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </section>

            <Modal
              show={showViewer}
              onHide={handleCloseViewer}
              size="xl"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>{selectedFile?.modalTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedFile?.type === "pdf" ? (
                  <PdfViewer
                    show={showViewer}
                    fileUrl={selectedFile.fileUrl}
                    onClose={handleCloseViewer}
                    title={selectedFile.modalTitle}
                  />
                ) : selectedFile?.type === "image" ? (
                  <img
                    src={selectedFile.fileUrl}
                    alt={selectedFile.modalTitle}
                    style={{ width: "100%" }}
                  />
                ) : (
                  <p>File not found</p>
                )}
              </Modal.Body>
            </Modal>
            <section id="contact">
              <Row
                id="contact-row"
                className={`g-4 mt-5 ${
                  isInView[5] ? "animate-fadeInUp" : "invisible-animate"
                }`}
                ref={(el) => addRef(el, 5)}
              >
                <h1 className="display-1 plus-jakarta-sans-bold text-center mb-4">
                  Contact
                </h1>
                <Col xs={12} className="text-center">
                  <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-xl-4 justify-content-center">
                    {/* LinkedIn */}
                    <div className="col d-flex flex-column align-items-center mb-3">
                      <a
                        href="https://www.linkedin.com/in/mathias-rodao/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex flex-column align-items-center icon"
                      >
                        <FaLinkedin size={50} className="mb-2" />
                        <span>Mathias Rodao</span>
                      </a>
                    </div>

                    {/* Gmail */}
                    <div className="col d-flex flex-column align-items-center mb-3">
                      <a
                        href="mailto:mathirodao@gmail.com"
                        target="_blank"
                        className="d-flex flex-column align-items-center icon"
                      >
                        <BiLogoGmail size={50} className="mb-2" />
                        <span>mathirodao@gmail.com</span>
                      </a>
                    </div>

                    {/* GitHub */}
                    <div className="col d-flex flex-column align-items-center mb-3">
                      <a
                        href="https://github.com/mathirodao"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex flex-column align-items-center icon"
                      >
                        <FaGithubSquare size={50} className="mb-2" />
                        <span>mathirodao</span>
                      </a>
                    </div>
                    {/* WhatsApp */}
                    <div className="col d-flex flex-column align-items-center mb-3">
                      <a
                        href="https://wa.me/59898038327?text=Hola!%20Quisiera%20contactarme%20contigo"
                        target="_blank"
                        className="d-flex flex-column align-items-center icon"
                      >
                        <FaSquareWhatsapp size={50} className="me-3" />
                        <span>WhatsApp +598 98 038 327</span>
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </section>

            <Row
              id="footer-row"
              className={`g-4 mt-20 mb-20 ${
                isInView[6] ? "animate-fadeInUp" : "invisible-animate"
              }`}
              ref={(el) => addRef(el, 6)}
            >
              <h6 className="plus-jakarta-sans-bold text-center mb-4 fs-2">
                Made with React and ❤️ by Mathias Rodao
              </h6>
            </Row>
          </div>
        </div>

        <div className="d-none d-md-block" style={{ width: "15%" }}>
          <div
            className={`scroll-to-top ${isVisible ? "fade-in" : "fade-out"}`}
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="btn btn-outline-light"
            >
              <MdKeyboardDoubleArrowUp size={40} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
