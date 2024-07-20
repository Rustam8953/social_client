import React from 'react'
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/user/user-slice';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
import { User } from '../../components/user';

export const Following = () => {
  const currentUser = useSelector(selectCurrent);
  if(!currentUser) return null;
  return (
    currentUser.following.length > 0 ? (
      <div className="gap-5 flex flex-col">
        {
          currentUser.following.map(i => (
            <Link to={`/users/${i.following.id}`} key={i.following.id}>
              <Card>
                <CardBody className="block">
                  <User
                    name={i.following.name ?? ''}
                    avatarUrl={i.following.avatarUrl ?? ''}
                    description={i.following.email ?? ''}
                  />
                </CardBody>
              </Card>
            </Link>
          ))
        }
      </div>
    ) : (
      <h1>У вас нет подписок</h1>
    )
  )
}
