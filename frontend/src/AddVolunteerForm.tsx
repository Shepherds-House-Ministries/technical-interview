import { useState, type FormEvent } from 'react';
import moment from 'moment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Stack, TextField } from '@mui/material';
import { createVolunteer, type NewVolunteer } from './api';

// The date starts as today. An empty date input looks filled in on some
// browsers (Safari shows today's date) but submits as blank.
const emptyForm = (): NewVolunteer => ({ name: '', email: '', shiftDate: moment().format('YYYY-MM-DD') });

export function AddVolunteerForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<NewVolunteer>(emptyForm);

  const mutation = useMutation({
    mutationFn: createVolunteer,
    onSuccess: async () => {
      setForm(emptyForm());
      await queryClient.invalidateQueries({ queryKey: ['volunteers'] });
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutation.mutate(form);
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />
        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <TextField
          label="Shift date"
          type="date"
          value={form.shiftDate}
          onChange={(event) => setForm({ ...form, shiftDate: event.target.value })}
          slotProps={{ inputLabel: { shrink: true } }}
          required
        />
        <Button type="submit" variant="contained" disabled={mutation.isPending}>
          Add
        </Button>
      </Stack>
      {mutation.isError && <Alert severity="error">Could not add the volunteer.</Alert>}
    </Stack>
  );
}
