import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Header() {
  return (
    <div>
         <Navbar className="bg-body-black">
        <Container>
          <Navbar.Brand href="/">
            <i class="fa-solid fa-layer-group me-3"></i>
            EMS Application
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header