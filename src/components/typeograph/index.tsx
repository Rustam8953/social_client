import React from 'react';

type Props = {
    children: string;
    size?: string;
}

export const Typeograph = ({children, size}: Props) => {
  return (
    <p className={`${size}`}>{children}</p>
  )
}
