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
import { useDispatch } from 'react-redux';
import { createEventInList } from '../redux/reducers/projectReducer'; // Adjust the import path as necessary
import { Button } from './ui/button';
import { AppDispatch } from '@/redux/store';
import { Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';

interface AddEventDialogProps {
  projectId: string;
  listId: string;
}

const AddEventDialog: React.FC<AddEventDialogProps> = ({
  projectId,
  listId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attendees, setAttendees] = useState('');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddEvent = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const newEvent = {
      title: title || '',
      description,
      attendees: attendees.split(', ').map((attendee) => attendee.trim()),
      deadline,
    };

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
      setDeadline(undefined);
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
            <div className='grid grid-cols-4 items-center gap-4'>
              <Calendar
                mode='single'
                selected={deadline}
                onSelect={setDeadline}
                className='col-span-3'
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
