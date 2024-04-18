import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Box, Container, CssBaseline } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function Receivefeedback() {

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#f7f9fa', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Stack spacing={2} width="100%">
            <TableContainer component={Paper} sx={{ maxHeight: '60vh' }}>
              <Table aria-label="spanning table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Rating</TableCell>
                    <TableCell align="right">No of people</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                      <TableCell>1 rating</TableCell>
                      <TableCell align="right">234</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell>2 rating</TableCell>
                      <TableCell align="right">134</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell>3 rating</TableCell>
                      <TableCell align="right">2334</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell>4 rating</TableCell>
                      <TableCell align="right">2324</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>4 rating</TableCell>
                        <TableCell align="right">1234</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}
