import { useQuery } from '@tanstack/react-query';
import {
  Alert,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { fetchVolunteers } from './api';
import { AddVolunteerForm } from './AddVolunteerForm';

export function VolunteersPage() {
  const { data: volunteers, isPending, isError } = useQuery({
    queryKey: ['volunteers'],
    queryFn: fetchVolunteers,
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1">
          Volunteers
        </Typography>
        <AddVolunteerForm />
        {isPending && <CircularProgress aria-label="Loading volunteers" />}
        {isError && <Alert severity="error">Could not load volunteers.</Alert>}
        {volunteers && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Shift date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {volunteers.map((volunteer) => (
                  <TableRow key={volunteer.id}>
                    <TableCell>{volunteer.name}</TableCell>
                    <TableCell>{volunteer.email}</TableCell>
                    <TableCell>{moment(volunteer.shiftDate, 'YYYY-MM-DD').format('ddd, MMM D, YYYY')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Container>
  );
}
