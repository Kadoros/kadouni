// components/Sidebar.tsx
import React from 'react';
import { FaDatabase } from 'react-icons/fa'; // Importing from react-icons

const Mdsidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-200 p-6 fixed">
      <h2 className="text-xl font-semibold mb-4">Database Topics</h2>
      <ul className="space-y-4">
        <li className="flex items-center space-x-2">
          <FaDatabase />
          <span>Database Management System</span>
        </li>
        <li className="flex items-center space-x-2">
          <FaDatabase />
          <span>Relational DBMS</span>
        </li>
        <li className="flex items-center space-x-2">
          <FaDatabase />
          <span>Non-Relational DBMS</span>
        </li>
      </ul>
    </div>
  );
};

export default Mdsidebar;
