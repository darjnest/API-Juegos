import React from 'react';

export default function Footer() {
  return (
    <>
      <footer className="text-center p-3">
        <div className="footer-icon">
          <a href="#">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
        </div>
        <p className="m-0">
          ©2023 Todos los derechos reservados - Explorador de Juegos
        </p>
      </footer>
    </>
  );
}
