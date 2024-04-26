import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box, Container, CssBaseline } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(unit) {
  return 1 * unit;
}

function createRow(desc, unit) {
  const price = priceRow(unit);
  return { desc, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

// Data for each day
const dailyRows = [
  [
    createRow('Morning', 30),
    createRow('Noon', 45),
    createRow('Evening', 30),
    createRow('Night', 30)
  ],
  [
    createRow('Morning', 50),
    createRow('Noon', 55),
    createRow('Evening', 23),
    createRow('Night', 54)
  ],
  [
    createRow('Morning', 78),
    createRow('Noon', 23),
    createRow('Evening', 78),
    createRow('Night', 23)
  ],
  [
    createRow('Morning', 98),
    createRow('Noon', 23),
    createRow('Evening', 45),
    createRow('Night', 40)
  ],
  [
    createRow('Morning', 50),
    createRow('Noon', 45),
    createRow('Evening', 32),
    createRow('Night', 20)
  ],
  [
    createRow('Morning', 50),
    createRow('Noon', 75),
    createRow('Evening', 30),
    createRow('Night', 70)
  ],
  [
    createRow('Morning', 30),
    createRow('Noon', 45),
    createRow('Evening', 30),
    createRow('Night', 30)
  ]
];

export default function UpdatePrice() {
  const [page, setPage] = React.useState(1);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Get rows and subtotal for current day
  const rows = dailyRows[page - 1];
  const invoiceSubtotal = subtotal(rows);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#f7f9fa', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Stack spacing={2} width="100%">
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Typography>Day: {page}</Typography>
            </div>
            <TableContainer component={Paper} sx={{ maxHeight: '60vh' }}>
              <Table aria-label="spanning table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.desc}>
                      <TableCell>{row.desc}</TableCell>
                      <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Pagination count={7} page={page} onChange={handleChange} />
            </div>
          </Stack>
        </Box><motion.div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '4px'
        }}>
          <Button style={{ backgroundColor: 'bisque', color: '#f86931' }} onClick={handleShow}>Edit</Button>
        </motion.div>
        <Modal show={show} onHide={handleClose} centered style={{backgroundColor: 'rgba(255, 255, 255, 0.3)',backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',borderRadius: '10px',border: '1px solid rgba(255, 255, 255, 0.18)'}}>
          <Modal.Header closeButton>
            <Modal.Title>Update Price:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2" controlId="formControlChooseDay">
                <Form.Control
                  type="number"
                  placeholder="choose day"
                  autoFocus
                  min="1"
                  max="7"
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formControlMorningPrice">
                <Form.Control
                  type="number"
                  placeholder="morning price"
                  step="0.01"
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formControlNoonPrice">
                <Form.Control
                  type="number"
                  placeholder="noon price"
                  step="0.01"
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formControlEveningPrice">
                <Form.Control
                  type="number"
                  placeholder="evening price"
                  step="0.01"
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formControlNightPrice">
                <Form.Control
                  type="number"
                  placeholder="night price"
                  step="0.01"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{gap:4}}>
            <Button variant="secondary" onClick={handleClose} style={{backgroundColor:"lightgray"}}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose} style={{backgroundColor:"lightblue"}}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </React.Fragment>
  );
}
