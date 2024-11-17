import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEventInList } from '@/redux/reducers/projectReducer'; // Import the new thunk
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
import { Textarea } from './ui/textarea';
import { Button } from '@/components/ui/button';
import TaskCard from './TaskCard'; // Ensure TaskCard is imported
import { RootState } from '@/redux/store';
import { AttendeesTable } from './attendee-table';

export function EventDialog({ eventId }) {
  const dispatch = useDispatch();

  // Use useSelector to get the event details from the Redux store
  const event = useSelector((state: RootState) => {
    // Log the entire lists structure for debugging
    console.log(state.projects.selectedProject.lists);

    // Find the event in the lists
    for (const list of state.projects.selectedProject.lists) {
      console.log(`Checking list: ${list._id}`); // Log the current list ID
      const foundEvent = list.events.find((event) => event._id === eventId);
      if (foundEvent) {
        console.log(`Found event: ${foundEvent}`); // Log the found event
        return foundEvent; // Return the found event
      }
    }
    console.log('No event found'); // Log if no event is found
    return null; // Return null if no event is found
  });
  console.log(event.attendees);

  // Initialize state with default values
  const [title, setTitle] = useState(event?.title);
  const [description, setDescription] = useState('');
  const [attendees, setAttendees] = useState('');

  // Effect to set state when event prop changes
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setAttendees(event.attendees.join(', '));
    }
  }, [event]);

  const handleUpdateEvent = () => {
    const updatedEvent = {
      title,
      description,
      attendees: attendees.split(', ').map((attendee) => attendee.trim()),
    };

    dispatch(
      updateEventInList({ projectId, listId, eventId: event._id, updatedEvent })
    );
    onClose(); // Close the dialog after updating
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='h-auto p-0'>
          <TaskCard title={title} description={description} />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Make changes to your event here.
          </DialogDescription>
        </DialogHeader>
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
          <AttendeesTable attendees={event.attendees} />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button onClick={handleUpdateEvent}>Save Changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
