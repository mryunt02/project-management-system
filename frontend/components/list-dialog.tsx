import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  deleteListFromProject,
  updateListInProject,
} from '@/redux/reducers/projectReducer';
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
  title: string;
}

const ListDialog = ({ title }: ListDialogProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // Use useSelector to get the list details and projectId from the Redux store
  const { list, projectId } = useSelector((state: RootState) => {
    if (!state.projects.selectedProject) {
      return { list: null, projectId: null };
    }
    const projectId = state.projects.selectedProject._id;
    const list = state.projects.selectedProject.lists.find(
      (list) => list.name === title
    );

    return { list, projectId };
  });

  // Initialize state with default values
  const [listTitle, setListTitle] = useState(list?.name || '');
  const [listColor, setListColor] = useState(list?.color || 'green');

  useEffect(() => {
    if (list) {
      setListTitle(list.name);
      setListColor(list.color || 'green');
    }
  }, [list]);

  const handleUpdateList = () => {
    const updatedList = {
      name: listTitle || '',
      color: listColor || '',
    };

    if (!list || !projectId) return;

    dispatch(
      updateListInProject({ projectId, listId: list._id, updatedList })
    ).then(() => {
      window.location.reload(); // Reload the page after saving changes
    });
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
          <div className='flex flex-col items-baseline gap-4'>
            <label className='col-span-1'>Name:</label>
            <Input
              id='title'
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              className='col-span-3'
              placeholder='List Title'
            />
          </div>
          <div className='flex flex-col items-baseline  gap-4'>
            <label className='col-span-1'>Color:</label>
            <div className='col-span-3 flex gap-2'>
              {['green', 'red', 'yellow', 'blue'].map((color) => (
                <div
                  key={color}
                  onClick={() => setListColor(color)}
                  className={`w-10 h-10 cursor-pointer rounded ${
                    listColor === color ? 'ring-2 ring-purple-500' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
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
