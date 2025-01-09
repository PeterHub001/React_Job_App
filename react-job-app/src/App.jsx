import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, } from 'react-router-dom'
import React from "react";
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout';
import JobPages from './pages/JobPages';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
  
const App = () => {
// Add Job to Api post request
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return;

  }

  // Delete job from Api

  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',

    })
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/jobs' element={<JobPages />} />
      <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
      <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
    )
  );


  return <RouterProvider router={router} />;
};

export default App;
