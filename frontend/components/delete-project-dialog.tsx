import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from './ui/dialog';

interface DeleteProjectProps {
  projectId: string;
  handleDeleteProject: (projectId: string) => void;
}

const DeleteProject: React.FC<DeleteProjectProps> = ({
  projectId,
  handleDeleteProject,
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className='bg-red-400 text-white cursor-pointer rounded-xl p-1.5'>
          Delete
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-5'>Delete Project</DialogTitle>
          <DialogDescription>
            Do you really want to delete this Project? This process cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <DialogClose
            onClick={() => handleDeleteProject(projectId)}
            className='py-1.5 px-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
          >
            Delete
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProject;
