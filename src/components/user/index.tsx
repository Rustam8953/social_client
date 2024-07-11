import React from 'react'

import {User as NextUiUser} from '@nextui-org/react';
import { BASE_URL } from '../../const';

type Props = {
    name: string;
    avatarUrl: string;
    description?: string;
    className?: string;
}

export const User = ({
    name = '',
    avatarUrl = '',
    description = '',
    className = ''
}: Props) => {
  return (
    <NextUiUser
        name={name} 
        description={description}
        className={className}
        avatarProps={{
            src: `${BASE_URL}${avatarUrl}`
        }}
    />
  )
}
