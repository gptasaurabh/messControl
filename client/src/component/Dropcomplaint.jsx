import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
// import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function Dropcomplaint() {
  const [show, setShow] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "First card title",
      date: "2022-01-01",
      description: "Description for the first card.Description for the first card.Description for the first card.Description for the first card.Description for the first card.Description for the first card.Description for the first card.Description for the first card.Description for the first card.Description for the first card."
    },
    {
      id: 2,
      title: "Second card title",
      date: "2022-02-01",
      description: "Description for the second card.Description for the first card.Description for the first card.Description for the first card.Description for the first card.Description for the first card.Description for the first card."
    }
  ]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteCard = cardId => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
  };

  return (
    <div className="container px-4">
      <div className="row gx-5">
        <div className="col" style={{ margin: '4px' }}>
          <div className="p-2 border bg-light compl-num-cont">
            <div className="containt-header">
              <motion.div
                className="drop-containt-butt"
                whileHover={{ scale: 1.03 }}
              >
                <Button
                  className="button"
                  style={{ backgroundColor: 'aliceblue', borderRadius: '10px' }} variant="primary" onClick={handleShow}
                >
                  Drop Your Complaint
                </Button>
              </motion.div>
              <Modal show={show} onHide={handleClose} centered style={{backgroundColor: 'rgba(255, 255, 255, 0.3)',backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',borderRadius: '10px',border: '1px solid rgba(255, 255, 255, 0.18)'}}>
                <Modal.Header closeButton>
                  <Modal.Title>Create complaint:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                      <Form.Control
                        type="text"
                        placeholder="hostel name"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                      <Form.Control
                        type="number"
                        placeholder="room no"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control as="textarea" rows={3} placeholder="describe your problem in short"/>
                    </Form.Group>
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
            </div>
            {/* <div className="contain-complaints">No Complaint's Yet!</div> */}
            <div className='card-holder' style={{display:"flex",justifyContent:"center",flexWrap:"wrap",alignItems:"center",gap:"20px"}}>
            {cards.length > 0 ? (cards.map((card) => (
                  <div className="card mb-3" key={card.id} style={{ maxWidth: '25rem', flex: '1 0 45%', backdropFilter: 'blur(10px)' }}>
                    <div className="card-header" style={{ display: "flex", justifyContent: "space-between" }}>
                      <p>{card.title}</p>
                      <p>{card.date}</p>
                    </div>
                    <div className="card-body text-success" style={{ maxHeight: '150px', overflow: 'auto' }}>
                      <p className="card-text">{card.description}</p>
                    </div>
                    <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }}>
                      <Button style={{ backgroundColor: "lightblue", borderRadius: "10px" }} onClick={() => deleteCard(card.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <p style={{color:"lightcoral"}}>No Complaints Yet!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}