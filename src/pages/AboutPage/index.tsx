import React from 'react';
import ButtonGo from '@/components/ButtonGo';
 
const HomePage: React.FC = () =>{
  return (
    <div>
      <h1>about</h1>
      <ButtonGo path="/login">Go to Login</ButtonGo>
    </div>
  )
}

export default HomePage;