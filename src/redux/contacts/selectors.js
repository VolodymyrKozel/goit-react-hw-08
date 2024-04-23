import { createSelector } from '@reduxjs/toolkit';
export const selectContacts = state => state.contacts.items;
/* 
export const selectContactById = createSelector(
  [selectContacts],
  (state, id) => {
    const contacts = selectContacts(state);
    return contacts.find(contact => contact.id === id);
  }
); */
export const selectContactById = (state, contactId) => {
  if (!contactId) return;
  const contacts = selectContacts(state);
  return contacts.find(contact => contact.id === contactId);
};

export const selectIsLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectNameFilter = state => state.filters.name;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter(
      contact =>
        contact.number.toLowerCase().includes(filter.toLowerCase()) ||
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
export const seclectSortedContacts = createSelector(
  [selectFilteredContacts],
  contacts => {
    return [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  }
);
