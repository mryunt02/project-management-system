import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { updateListInProject } from '@/redux/reducers/projectReducer';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Edit } from 'lucide-react';

interface ListDialogProps {
  listId: string;
}

const ListDialog = ({ listId }: ListDialogProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // Use useSelector to get the list details and projectId from the Redux store
  const { list, projectId } = useSelector((state: RootState) => {
    if (!state.projects.selectedProject) {
      return { list: null, projectId: null };
    }

    const projectId = state.projects.selectedProject._id;
    const list = state.projects.selectedProject.lists.find(
      (list) => list._id === listId
    );

    return { list, projectId };
  });

  // Initialize state with default values
  const [listTitle, setListTitle] = useState(list?.name || '');

  useEffect(() => {
    if (list) {
      setListTitle(list.name);
    }
  }, [list]);

  const handleUpdateList = () => {
    const updatedList = {
      name: listTitle || '',
    };

    if (!list || !projectId) return;

    dispatch(updateListInProject({ projectId, listId: list._id, updatedList }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='flex items-center text-sm gap-1 py-1.5 px-2'>
          <Edit width={16} height={16} /> Edit list
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] border border-t-blue-300 border-b-blue-300 p-3 bg-blue-300'>
        <DialogHeader>
          <DialogTitle>Edit List</DialogTitle>
          <DialogDescription>Make changes to your list here.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Input
              id='title'
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              className='col-span-3'
              placeholder='List Title'
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleUpdateList}>Save Changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListDialog;
