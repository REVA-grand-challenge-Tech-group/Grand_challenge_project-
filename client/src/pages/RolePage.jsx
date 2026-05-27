import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSelector from '../components/RoleSelector';

const RolePage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <RoleSelector onNext={() => navigate('/register')} />
    </div>
  );
};

export default RolePage;