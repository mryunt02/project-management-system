// frontend/components/CreateProject.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store'; // Adjust the path as necessary
import { createProject } from '@/redux/reducers/projectReducer'; // Adjust the path to your projectsSlice

const CreateProject = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [members, setMembers] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const projectMembers = members.split(',').map((member) => member.trim()); // Convert to array

    const newProject = {
      name,
      type,
      members: projectMembers,
      description,
    };

    dispatch(createProject(newProject))
      .then(() => {
        // Handle success (e.g., show a success message or reset the form)
        console.log('Project created successfully');
        setName('');
        setType('');
        setMembers('');
        setDescription('');
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        console.error('Failed to create project', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
      <input
        type='text'
        placeholder='Project Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className='border p-2 w-full'
      />
      <input
        type='text'
        placeholder='Project Type'
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
        className='border p-2 w-full'
      />
      <input
        type='text'
        placeholder='Members (comma-separated)'
        value={members}
        onChange={(e) => setMembers(e.target.value)}
        required
        className='border p-2 w-full'
      />
      <textarea
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className='border p-2 w-full'
      />
      <button type='submit' className='bg-blue-500 text-white p-2'>
        Create Project
      </button>
    </form>
  );
};

export default CreateProject;