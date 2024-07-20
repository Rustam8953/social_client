import React from 'react'
import { selectCurrent } from '../../features/user/user-slice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Card, CardBody, user } from '@nextui-org/react';
import { User } from '../../components/user';

export const Followers = () => {
  const currentUser = useSelector(selectCurrent);
  if(!currentUser) return null;
  return (
    currentUser.followers.length > 0 ? (
      <div className="gap-5 flex flex-col">
        {
          currentUser.followers.map(i => (
            <Link to={`/users/${i.follower.id}`} key={i.follower.id}>
              <Card>
                <CardBody className="block">
                  <User
                    name={i.follower.name ?? ''}
                    avatarUrl={i.follower.avatarUrl ?? ''}
                    description={i.follower.email ?? ''}
                  />
                </CardBody>
              </Card>
            </Link>
          ))
        }
      </div>
    ) : (
      <h1>У вас нет подписчиков</h1>
    )
  )
}
