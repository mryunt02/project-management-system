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
import { AppDispatch, RootState } from '@/redux/store';
import { AttendeesTable } from './attendee-table';
import { Calendar } from './ui/calendar';

export function EventDialog({ eventId }: { eventId: string }) {
  const dispatch = useDispatch<AppDispatch>();

  // Use useSelector to get the event details from the Redux store
  const { event, listId, projectId } = useSelector((state: RootState) => {
    // Log the entire lists structure for debugging
    if (!state.projects.selectedProject) {
      return { event: null, listId: null, projectId: null };
    }

    // Find the event in the lists
    const projectId = state.projects.selectedProject._id;
    for (const list of state.projects.selectedProject.lists) {
      const foundEvent = list.events.find((event) => event._id === eventId);
      if (foundEvent) {
        return { event: foundEvent, listId: list._id, projectId }; // Return the found event
      }
    }
    return { event: null, listId: null }; // Return null if no event is found
  });

  // Initialize state with default values
  const [title, setTitle] = useState(event?.title);
  const [description, setDescription] = useState('');
  const [attendees, setAttendees] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);

  // Effect to set state when event prop changes
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setAttendees(event.attendees.join(', '));
      setDeadline(event.deadline ? new Date(event.deadline) : null);
    }
  }, [event]);

  const handleUpdateEvent = () => {
    const updatedEvent = {
      title: title || '',
      description,
      attendees: attendees.split(', ').map((attendee) => attendee.trim()),
      deadline,
    };

    if (!event) return;

    dispatch(
      updateEventInList({ projectId, listId, eventId: event._id, updatedEvent })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='h-auto p-0'>
          <TaskCard title={title || ''} description={description || ''} />
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
              className='col-span-3 h-[100px]'
              placeholder='Event Description'
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
          {event && <AttendeesTable attendees={event.attendees} />}
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
