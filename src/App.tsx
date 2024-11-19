import React from 'react';
import FormGenerator from './component/FormGenerator.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded">
        <FormGenerator />
      </div>
    </div>
  );
};

export default App;
