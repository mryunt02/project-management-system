import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { addListToProject } from '@/redux/reducers/projectReducer'; // Adjust the import path as necessary
import { AppDispatch } from '@/redux/store';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';

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
      color: '#FFFFFF', // Add a default color or generate one
      events: [],
    };

    dispatch(addListToProject({ projectId, newList }));
    setListName('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex items-center gap-1 p-3 text-white bg-[#ffffff3d] hover:bg-[#ffffff2e] rounded-lg text-sm w-full h-[42px] cursor-pointer'>
          <Plus />
          <span>Add New List</span>
        </div>
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
