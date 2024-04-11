import { createSelector } from '@reduxjs/toolkit';
export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectNameFilter = state => state.filters.name;
export const selectVisibleContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
export const seclectSortedContacts = createSelector(
  [selectVisibleContacts],
  contacts => {
    return [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  }
);
