import { getFirestore, collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { RiNodejsLine } from "react-icons/ri";
import { FaDatabase, FaCloud } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { BsTools } from "react-icons/bs";
import { LuLanguages } from "react-icons/lu";
import { IoLogoPython } from "react-icons/io5";

// Crea un objeto que mapea nombres de íconos a componentes de íconos
const iconMapping = {
  IoLogoPython,
  RiNodejsLine,
  FaDatabase,
  FaCloud,
  RiComputerFill,
  BsTools,
  LuLanguages,
};

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const db = getFirestore();
  
    useEffect(() => {
      const fetchSkills = async () => {
        // Consulta con orden por el campo "order"
        const skillsQuery = query(collection(db, "skills"), orderBy("order"));
        const querySnapshot = await getDocs(skillsQuery);
        const skillsData = querySnapshot.docs.map((doc) => doc.data());
        setSkills(skillsData);
      };
      fetchSkills();
    }, []);
  
    return (
      <Row xs={1} md={2} className="g-4">
        {skills.map((skill) => {
          const IconComponent = iconMapping[skill.icon] || FaDatabase; // Ícono por defecto si no existe
  
          return (
            <Col key={skill.title}>
              <h2 className="d-flex align-items-center icon">
                <IconComponent {...skill.iconStyle} />
                {skill.title}
              </h2>
              <ul>
                {skill.skills.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Col>
          );
        })}
      </Row>
    );
  };
  
  export default Skills;
