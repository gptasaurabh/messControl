import React from 'react';
// Import React Bootstrap components
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function CreateComplaint() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={7} lg={5} xl={5}>
          <Form
            method="POST"
            className="w-100 rounded-1 p-4 border bg-white"
            action="##"
            encType="multipart/form-data"
          >
            <Form.Group className="mb-4">
              <Form.Label>Your name</Form.Label>
              <Form.Control type="text" placeholder="Joe Bloggs" name="name" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="joe.bloggs@example.com" name="email" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Write your problems ?</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Please describe your problem" name="message" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Add photo</Form.Label>
              <Form.Control type="file" name="receipt" />
            </Form.Group>

            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <Button variant="primary" type="submit" className="px-3 rounded-3">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}







/*    <Container maxWidth="md">
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="Name"
              label="Name"
              sx={{ border: 'none' }} // Adding borderBottom style
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="HostelName"
              label="Hostel Name"
              sx={{ border: 'none' }} // Adding borderBottom style
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              type="email"
              sx={{ border: 'none' }} // Adding borderBottom style
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phone"
              label="Phone"
              type="number"
              sx={{ border: 'none' }} // Adding borderBottom style
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="subject"
              label="Subject"
              sx={{ border: 'none' }} // Adding borderBottom style
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="additionalInfo"
              label="Additional Information"
              multiline
              rows={4}
              sx={{ border: 'none' }} // Set border to none for text areas
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Place Complaint
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>*/