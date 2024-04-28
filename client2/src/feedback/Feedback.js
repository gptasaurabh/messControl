import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function Feedback() {

    const [showModal,setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    
    const handleComplaint = (e) =>{
        e.preventDefault();
    }

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
        <Button onClick={openModal}>Feedback</Button>
        <Modal show={showModal} onHide={closeModal}>
            <form onSubmit={handleComplaint}>
                <Modal.Header closeButton style={{ backgroundColor: '#3498db', color: 'white' }}>
                <Modal.Title style={{ textAlign: 'center', fontSize: '20px' }}>Add new complaint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    body
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" type="submit" onClick={closeModal} style={{ borderRadius: '5px' }}>
                    Submit
                </Button>
                </Modal.Footer>
            </form>
        </Modal>
    </div>
  )
}
