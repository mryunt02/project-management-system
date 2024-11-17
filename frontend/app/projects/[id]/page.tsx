'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProjectById,
  addListToProject,
} from '@/redux/reducers/projectReducer';
import { RootState, AppDispatch } from '@/redux/store';
import { trefoil } from 'ldrs';
import ProjectList from '@/components/ProjectList';
import TaskCard from '@/components/TaskCard';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
trefoil.register();

// Define the Project interface to include lists
interface Project {
  _id: string;
  name: string;
  type: string;
  members: string[];
  description: string;
  lists: Array<{
    _id: string;
    name: string;
    events: Array<{ _id: string; title: string; description: string }>;
  }>;
}

const ProjectPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector(
    (state: RootState) => state.projects.selectedProject as Project
  );
  const status = useSelector((state: RootState) => state.projects.loading);
  const error = useSelector((state: RootState) => state.projects.error);
  const [listName, setListName] = useState('');

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [dispatch, id]);

  // Define a function to handle adding a new list
  const handleAddList = () => {
    if (!listName.trim()) {
      alert('List name cannot be empty.'); // Alert for empty input
      return; // Prevent adding an empty list
    }

    const newList = {
      _id: 'new_id', // Generate a unique ID for the new list
      name: listName, // Use the name from the input
      events: [], // Initialize with an empty events array
    };
    dispatch(addListToProject({ projectId: project._id, newList }));
    setListName(''); // Clear the input after submission
  };

  if (status === true) {
    return (
      <div className='text-center'>
        <l-trefoil
          size='40'
          stroke='4'
          stroke-length='0.15'
          bg-opacity='0.1'
          speed='1.4'
          color='black'
        ></l-trefoil>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>No project found</div>;
  }
  console.log(project.lists);
  return (
    <div className='overflow-scroll w-full'>
      <ul className='flex gap-3 h-full p-4 overflow-x-auto'>
        {project.lists.map((list) => (
          <ProjectList key={list._id} title={list.name}>
            {list.events.map((event) => (
              <TaskCard
                key={event._id}
                title={event.title}
                description={event.description}
              />
            ))}
          </ProjectList>
        ))}
        <div className='min-w-[272px]'>
          <Dialog>
            <DialogTrigger asChild>
              <button className='flex items-center gap-1 p-3 text-white bg-[#ffffff3d] hover:bg-[#ffffff2e] rounded-lg text-sm w-full h-[42px]'>
                <Plus />
                <span>Add New List</span>
              </button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Add New List</DialogTitle>
                <DialogDescription>
                  Enter the name of the new list below.
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <Input
                  type='text'
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  placeholder='List Name'
                  className='border p-2 w-full mt-2'
                  required
                />
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button
                    type='button'
                    onClick={handleAddList}
                    disabled={!listName.trim()} // Disable if input is empty
                  >
                    Add
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ul>
    </div>
  );
};

export default ProjectPage;
