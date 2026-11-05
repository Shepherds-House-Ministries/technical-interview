import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchVolunteers } from './api';
import { VolunteersPage } from './VolunteersPage';

jest.mock('./api', () => ({
  fetchVolunteers: jest.fn(),
  createVolunteer: jest.fn(),
}));

it('shows the volunteers from the API', async () => {
  jest.mocked(fetchVolunteers).mockResolvedValue([
    {
      id: 1,
      name: 'Test Volunteer',
      email: 'test@example.com',
      shiftDate: '2030-06-01',
      createdAt: '2030-01-01T00:00:00.000Z',
      updatedAt: '2030-01-01T00:00:00.000Z',
    },
  ]);
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  render(
    <QueryClientProvider client={queryClient}>
      <VolunteersPage />
    </QueryClientProvider>,
  );

  expect(await screen.findByText('Test Volunteer')).toBeInTheDocument();
  expect(screen.getByText('test@example.com')).toBeInTheDocument();
  expect(screen.getByText('Sat, Jun 1, 2030')).toBeInTheDocument();
});
