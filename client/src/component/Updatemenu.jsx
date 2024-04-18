import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import menuimg from '../images/menu.jpeg';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function UpdateMenu() {

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{
          bgcolor: '#cfe8fc',
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'  
        }}>
          <img src={menuimg} alt="menu image" style={{
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '100%'  
          }}/>
        </Box>
        <motion.div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '4px'
        }}>
          <Button style={{ backgroundColor: 'bisque', color: '#f86931' }} onClick={handleShow}>Edit</Button>
        </motion.div>
        <Modal show={show} onHide={handleClose} centered style={{backgroundColor: 'rgba(255, 255, 255, 0.3)',backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',borderRadius: '10px',border: '1px solid rgba(255, 255, 255, 0.18)'}}>
          <Modal.Header closeButton>
            <Modal.Title>Update Menu:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFile" className="mb-2">
                  <Form.Control type="file" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{gap:4}}>
            <Button variant="secondary" onClick={handleClose} style={{backgroundColor:"lightgray"}}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose} style={{backgroundColor:"lightblue"}}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </React.Fragment>
  );
}
