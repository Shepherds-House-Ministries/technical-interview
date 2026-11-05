import axios from 'axios';

export const api = axios.create({ baseURL: '/api' });

export interface Volunteer {
  id: number;
  name: string;
  email: string;
  /** A calendar date, 'YYYY-MM-DD'. */
  shiftDate: string;
  createdAt: string;
  updatedAt: string;
}

export type NewVolunteer = Pick<Volunteer, 'name' | 'email' | 'shiftDate'>;

export async function fetchVolunteers(): Promise<Volunteer[]> {
  const { data } = await api.get<Volunteer[]>('/volunteers');
  return data;
}

export async function createVolunteer(volunteer: NewVolunteer): Promise<Volunteer> {
  const { data } = await api.post<Volunteer>('/volunteers', volunteer);
  return data;
}
