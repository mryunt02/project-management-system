// frontend/components/CreateProject.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store'; // Adjust the path as necessary
import { createProject } from '@/redux/reducers/projectReducer'; // Adjust the path to your projectsSlice
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [members, setMembers] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

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
      .then((response) => {
        // Handle success (e.g., show a success message or reset the form)
        console.log('Project created successfully');
        setName('');
        setType('');
        setMembers('');
        setDescription('');

        const projectId = response.payload._id; // Make sure your API returns the project ID
        router.push(`/projects/${projectId}`);
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        console.error('Failed to create project', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
      <Input
        type='text'
        placeholder='Project Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className='border p-2 w-full'
      />
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
