import React from 'react';

export type SimpleComponentProps = {
  message: string
};

const SimpleComponent = ({
  message,
}: SimpleComponentProps) => (
  <div data-testid="message">
    {message.toUpperCase()}
  </div>
);

export default SimpleComponent;
