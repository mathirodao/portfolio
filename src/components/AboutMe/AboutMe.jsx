import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row, Modal } from "react-bootstrap";
import { TbFileCv } from "react-icons/tb";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import PdfViewer from "../PdfViewer/PdfViewer";

const AboutMe = ({ addRef, isInView, index }) => {
  const [showViewer, setShowViewer] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lista de archivos que puedes visualizar (puedes adaptar esto a tus necesidades)
  const files = [
    {
      id: 1,
      title: "My CV",
      fileUrl: "/assets/pdf/MathiasRodaoCV.pdf", // Cambia el archivo de acuerdo a tu necesidad
      type: "pdf",
      modalTitle: "Curriculum Vitae",
    },
    // Agrega más archivos si lo necesitas
  ];

  // Función para abrir el archivo seleccionado
  const handleOpenViewer = (file) => {
    setSelectedFile(file);
    setShowViewer(true);
  };

  // Función para cerrar el modal
  const handleCloseViewer = () => {
    setSelectedFile(null);
    setShowViewer(false);
  };

  // Detectar si el componente está en el viewport
  const handleScroll = () => {
    const element = document.getElementById("about-me-row"); // Usa el id correcto
    if (!element) return; // Sal de la función si el elemento no existe
    const rect = element.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Llamar a handleScroll en el montaje inicial para detectar la visibilidad al cargar la página
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container
      id="about-me-row"
      key="about-me-row"
      ref={(el) => addRef(el, index)} // Asignar la referencia
      className={`py-5 mx-auto transition-opacity duration-1000 ${
        isInView ? "animate-fadeInUp" : "opacity-0"
      }`} // Agregar clase de animación
    >
      <Col xs={12} md={12} lg={12} className="mx-auto">
        <Card className="shadow" border="light" bg="dark" text="light">
          <Row className="g-0">
            <Col xs={12}>
              <Card.Header>About Me</Card.Header>
              <Card.Body>
                <Row className="d-flex align-items-center">
                  <Col xs={12} md={12} lg={10} className="mb-4">
                    <h2 className="text-center plus-jakarta-sans-bold">
                      <blockquote className="blockquote mb-0">
                        <p className="text-justify">
                          I am an IT Analyst and Programmer Analyst, I
                          characterize myself as a sociable person who adapts
                          well to work teams. Constantly looking to continue
                          developing as a professional and improving my skills
                          to grow in my professional career. Seeking to advance
                          in Python and JavaScript, open to exploring other
                          technologies for further professional growth.
                        </p>
                      </blockquote>
                    </h2>
                  </Col>
                  <Col xs={12} md={12} lg={2} className="text-center continuous-pulse">
                    <TbFileCv
                      style={{
                        fontSize: "7rem",
                        color: "gray",
                        cursor: "pointer",
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "white")}
                      onMouseLeave={(e) => (e.target.style.color = "gray")}
                      onClick={() => handleOpenViewer(files[0])}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>

      {/* Modal para el visor */}
      <Modal show={showViewer} onHide={handleCloseViewer} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFile?.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFile?.type === "pdf" ? (
            <PdfViewer fileUrl={selectedFile.fileUrl} />
          ) : (
            <img src={selectedFile?.fileUrl} alt="Certificate" />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AboutMe;
