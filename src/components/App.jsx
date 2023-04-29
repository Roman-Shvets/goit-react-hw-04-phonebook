import React, { useState, useEffect } from 'react';
import { ContactForm } from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import css from './App.module.css';

export function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    if (
      contacts.find(
        item =>
          item.name.toLowerCase() === data.name.toLowerCase() ||
          item.number === data.number
      )
    ) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    setContacts(prev => [newContact, ...prev]);
  };

  const handleSearchChange = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normFilter)
    );
  };

  const handleContactDelete = evt => {
    const id = evt.target.id;
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter onChange={handleSearchChange} value={filter} />
      <ContactList
        contacts={getVisibleContacts()}
        handleContactDelete={handleContactDelete}
      />
    </div>
  );
}
