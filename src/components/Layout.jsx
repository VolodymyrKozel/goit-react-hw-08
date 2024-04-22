import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import Loader from './Loader/Loader';
import { AppBar } from './AppBar/AppBar';

export const Layout = ({ children }) => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <AppBar />
        <div>{children}</div>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{ duration: 5000 }}
        />
      </Suspense>
    </>
  );
};
