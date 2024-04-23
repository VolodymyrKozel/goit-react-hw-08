import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts', // Використовуємо символ підкреслення як ім'я першого параметра, // тому що в цій операції він нам не потрібен
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${url}'/contacts'`); // При успішному запиті повертаємо проміс із даними
      return res.data;
    } catch (error) {
      // При помилці запиту повертаємо проміс
      // який буде відхилений з текстом помилки
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const res = await axios.post(`${url}/contacts`, contact);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const res = await axios.delete(`${url}/contacts/${contactId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (contact, thunkAPI) => {
    const { name, number } = contact;
    try {
      const res = await axios.patch(`${url}/contacts/${contact.id}`, {
        name,
        number,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
