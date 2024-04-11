import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://6616c0beed6b8fa4348149f3.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts', // Використовуємо символ підкреслення як ім'я першого параметра, // тому що в цій операції він нам не потрібен
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts'); // При успішному запиті повертаємо проміс із даними
      return response.data;
    } catch (e) {
      // При помилці запиту повертаємо проміс
      // який буде відхилений з текстом помилки
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contact);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
