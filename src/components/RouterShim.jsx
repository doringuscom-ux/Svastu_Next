'use client';
import React, { createContext, useContext } from 'react';

const ParamsContext = createContext({});

export function ParamsProvider({ params, children }) {
  return (
    <ParamsContext.Provider value={params}>
      {children}
    </ParamsContext.Provider>
  );
}

// Compatibility shim for react-router-dom Link and routing hooks in Next.js
export function Link({ to, href, children, ...props }) {
  const target = to || href || '#';
  return (
    <a href={target} {...props}>
      {children}
    </a>
  );
}

export function useNavigate() {
  return (to) => {
    if (typeof window !== 'undefined') {
      window.location.href = to;
    }
  };
}

export function useLocation() {
  if (typeof window !== 'undefined') {
    return {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash
    };
  }
  return { pathname: '/', search: '', hash: '' };
}

export function useParams() {
  const ctx = useContext(ParamsContext);
  if (ctx && Object.keys(ctx).length > 0) {
    return ctx;
  }
  if (typeof window !== 'undefined') {
    const segments = window.location.pathname.split('/').filter(Boolean);
    const slug = segments[segments.length - 1] || '';
    return { slug };
  }
  return {};
}

export function Outlet() {
  return null;
}

export function Navigate({ to }) {
  if (typeof window !== 'undefined') {
    window.location.href = to;
  }
  return null;
}

export function BrowserRouter({ children }) {
  return <>{children}</>;
}

export function Routes({ children }) {
  return <>{children}</>;
}

export function Route({ children }) {
  return <>{children}</>;
}

export default {
  Link,
  useNavigate,
  useLocation,
  useParams,
  ParamsProvider,
  Outlet,
  Navigate,
  BrowserRouter,
  Routes,
  Route
};
