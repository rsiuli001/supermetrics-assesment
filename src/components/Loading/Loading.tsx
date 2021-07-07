import React from 'react';
import './Loading.css';

interface LoadingProps {
  text: string;
}

const Loading: React.FC<LoadingProps> = ({ text }): JSX.Element => {
  return (
    <div className="login-card">
      <div data-testid="loading" className="loading">
        {text}
      </div>
    </div>
  );
};

export default React.memo(Loading);
