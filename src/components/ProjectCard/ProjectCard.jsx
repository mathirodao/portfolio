import React from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { FaCode, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ image, title, description, link, tag, stack }) => {
  return (
    <Container>
      <Card className="shadow" border="light" bg="light" text="dark">
        <Card.Header className="d-flex justify-content-between">
          {title}
          {tag && (
            <Badge bg="dark" className="d-flex align-items-center gap-2">
              {tag}
            </Badge>
          )}
        </Card.Header>
        <Card.Body>
          <Row className="d-flex flex-column-reverse flex-md-row align-items-center justify-content-between mb-4">
            <Col xs={12} md={12} lg={12}>
              <h2 className="text-center plus-jakarta-sans-bold">
                <p className="text-justify">{description}</p>
              </h2>
            </Col>
            <Col
              xs={12}
              md={12}
              lg={4}
              className={`text-center ${!image ? "d-none d-md-block" : ""}`}
            >
              {image && (
                <Card.Img
                  variant="top"
                  src="holder.js/100px180"
                  alt={title}
                  className="img-fluid mb-3 mb-md-0"
                />
              )}
            </Col>
          </Row>

          {/* Badges */}
          {stack.length > 0 && <strong>Tech Stack:</strong>}
          <div
            className="d-flex flex-wrap align-items-center gap-2"
            style={{ margin: 0 }}
          >
            {stack.map((item, index) => (
              <Badge
                key={index}
                bg="dark"
                className="text-capitalize"
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.9rem",
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </Badge>
            ))}
          </div>

          {/* Link */}
          <Card.Link href={link} target="_blank" className="mt-3 d-block">
            <Badge bg="secondary" className="d-flex align-items-center gap-2">
              <FaExternalLinkAlt />
              {link}
            </Badge>
          </Card.Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProjectCard;
