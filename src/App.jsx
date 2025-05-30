import React from 'react';
import Autocomplete from './components/Autocomplete';

export default function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Noto Sans' }}>Product Search</h1>
      <Autocomplete />
    </div>
  );
}
