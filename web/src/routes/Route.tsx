import React from 'react';
import { Redirect, Route as RouterDOMRoute, RouteProps as RouteDOMProps } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends RouteDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  console.log(user);
  return (
    <RouterDOMRoute {...rest} render={({ location }) => {
      return isPrivate === !!user ? (
        <Component />
      ) : (
        <Redirect to={{
          pathname: isPrivate ? '/login' : 'app',
          state: { from: location }
        }} />
      )
    }} />
  )
}

export default Route;