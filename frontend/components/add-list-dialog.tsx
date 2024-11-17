import React, { useState } from 'react';
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
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addListToProject } from '@/redux/reducers/projectReducer'; // Adjust the import path as necessary
import { AppDispatch } from '@/redux/store';

interface AddListDialogProps {
  projectId: string;
}

const AddListDialog: React.FC<AddListDialogProps> = ({ projectId }) => {
  const [listName, setListName] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleAddList = () => {
    if (!listName.trim()) {
      alert('List name cannot be empty.');
      return;
    }

    const newList = {
      _id: 'new_id', // Generate a unique ID for the new list
      name: listName,
      events: [],
    };

    dispatch(addListToProject({ projectId, newList }));
    setListName('');
  };

  return (
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
              disabled={!listName.trim()}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddListDialog;
