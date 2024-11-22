// frontend/components/CreateProject.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { createProject } from '@/redux/reducers/projectReducer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { RootState } from '@/redux/store'; // Adjust the import based on your store structure

const CreateProject = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [members, setMembers] = useState('');
  const [description, setDescription] = useState('');
  const [, setError] = useState<string | null>(null); // State for error message
  const [nameExists, setNameExists] = useState<boolean>(false); // State to check if name exists

  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.projects.projects); // Get projects from Redux store

  // Effect to check if the project name already exists
  useEffect(() => {
    const existingProject = projects.find((project) => project.name === name);
    setNameExists(!!existingProject);
  }, [name, projects]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if the project name already exists
    if (nameExists) {
      setError('Project with this name already exists.'); // Set error message
      return; // Prevent form submission
    }

    const projectMembers = members.split(',').map((member) => member.trim()); // Convert to array

    const newProject = {
      name,
      type,
      members: projectMembers,
      description,
    };

    try {
      await dispatch(createProject(newProject)).unwrap();
      // Handle success (e.g., show a success message or reset the form)
      setName('');
      setType('');
      setMembers('');
      setDescription('');
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to create project', error);
        setError(error.message);
      } else {
        console.error('Failed to create project', error);
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
      {/* Display error message */}
      <Input
        type='text'
        placeholder='Project Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className='border p-2 w-full'
      />
      {nameExists && (
        <div className='text-red-500'>
          Project with this name already exists.
        </div>
      )}{' '}
      {/* Validation error */}
      <Input
        type='text'
        placeholder='Project Type'
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
        className='border p-2 w-full'
      />
      <Input
        type='text'
        placeholder='Members (comma-separated)'
        value={members}
        onChange={(e) => setMembers(e.target.value)}
        required
        className='border p-2 w-full'
      />
      <Textarea
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className='border p-2 w-full bg-white'
      />
      <Button
        type='submit'
        className='bg-blue-500 text-white p-2 hover:bg-blue-400'
      >
        Create Project
      </Button>
    </form>
  );
};

export default CreateProject;
