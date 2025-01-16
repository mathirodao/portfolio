import React, { useState, useEffect } from 'react';

const useInView = (offset = 0) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('elementId'); // Cambia 'elementId' por el id de tu fila o componente
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight + offset && rect.bottom >= 0) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al cargar la página

    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return isInView;
};

export default useInView;
