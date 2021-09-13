import React from 'react';

export type SimpleComponentProps = {
  message: string | undefined | null
};

const SimpleComponent = ({
  message,
}: SimpleComponentProps) => (
  <div data-testid="message">
    {/* @ts-ignore */}
    {message.toUpperCase()}
  </div>
);

export default SimpleComponent;
