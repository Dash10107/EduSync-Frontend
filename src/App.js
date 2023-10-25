import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes';
import { useEffect } from 'react';

function App() {
  // // Function to clear the localStorage
  // const clearLocalStorage = () => {
  //   localStorage.clear();
  // };

  // useEffect(() => {
  //   // Add an event listener to the beforeunload event
  //   const beforeUnloadListener = (e) => {
  //     clearLocalStorage();
  //     // This line will display a confirmation prompt to the user
  //     e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
  //   };

  //   window.addEventListener('beforeunload', beforeUnloadListener);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('beforeunload', beforeUnloadListener);
  //   };
  // }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  function handleBeforeUnload(event) {
    localStorage.clear();
    event.preventDefault();
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
