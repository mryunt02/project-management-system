import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog';
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog';
import { useDispatch, useSelector } from 'react-redux';
import { createEventInList } from '../redux/reducers/projectReducer'; // Adjust the import path as necessary
import { Button } from './ui/button';
// Adjust the import path as necessary
import { AppDispatch, RootState } from '@/redux/store';
import { Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const AddEventDialog = ({ projectId, listId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attendees, setAttendees] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddEvent = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const newEvent = {
      title: title || '',
      description,
      attendees: attendees.split(', ').map((attendee) => attendee.trim()),
    };

    console.log('Adding new event:', newEvent);
    console.log('projectId:', projectId);
    console.log('listId:', listId);

    dispatch(createEventInList({ projectId, listId, newEvent }));
    setIsDialogOpen(false); // Close the dialog after adding the event
    window.location.reload(); // Reload the page after adding the event
  };

  useEffect(() => {
    // Reset form fields when the dialog opens
    if (isDialogOpen) {
      setTitle('');
      setDescription('');
      setAttendees('');
    }
  }, [isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className='flex items-center gap-1 p-2 text-gray-400 hover:text-gray-300 hover:bg-white/5 rounded-lg text-sm'>
          <Plus size={16} />
          <span>Add Card</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>
            Fill in the details for the new event.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddEvent}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Input
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='col-span-3'
                placeholder='Event Title'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='col-span-3 h-[200px]'
                placeholder='Event Description'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Input
                id='attendees'
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
                className='col-span-3'
                placeholder='Attendees (comma separated)'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Add Event</Button>
            <DialogClose asChild>
              <Button variant='ghost'>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
