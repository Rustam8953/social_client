import React, { useEffect } from 'react';
import { Header } from '../header';
import { Container } from '../container';
import { NavBar } from '../nav-bar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../../features/user/user-slice';

export const Layout = () => {
  const isAuthenticate = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticate) {
      navigate('/auth');
    }
  })
  return (
    <>
        <Header />
        <Container>
            <div className="flex-2 p-4">
              <NavBar />
            </div>
            <div className="flex-1 p-4">
              <Outlet />
            </div>
        </Container>
    </>
  )
}