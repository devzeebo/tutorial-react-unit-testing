import React from 'react';

export type SimpleComponentProps = {
  message: string | undefined | null
};

// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles

const SimpleComponent = ({
  message,
}: SimpleComponentProps) => (
  <div role="main">
    {message?.toUpperCase()}
  </div>
);

export default SimpleComponent;
