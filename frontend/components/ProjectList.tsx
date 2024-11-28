import { FlipHorizontal2 } from 'lucide-react';
import { EventDialog } from './event-dialog';
import ProjectDropdown from './project-dropdown';
import AddEventDialog from './add-event-dialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ProjectListProps {
  key: string;
  title: string;
  color: string;
  events: { _id: string; title: string; description: string }[];
}

const ProjectList = ({ title, events, color }: ProjectListProps) => {
  const getColorClass = (color: string): string => {
    switch (color) {
      case 'green':
        return 'bg-green-400';
      case 'red':
        return 'bg-red-400';
      case 'yellow':
        return 'bg-yellow-400';
      case 'blue':
        return 'bg-blue-400';
      default:
        return 'bg-[#101204]'; // Default color if none match
    }
  };
  const { projectId, listId } = useSelector((state: RootState) => {
    if (!state.projects.selectedProject) {
      return { projectId: null, listId: null };
    }
    const projectId = state.projects.selectedProject._id;
    const listId = state.projects.selectedProject.lists.find(
      (list) => list.name === title
    )?._id;
    return { projectId, listId };
  });
  return (
    <li className='flex-shrink-0'>
      <div className='rounded-xl w-[272px] bg-[#101204]'>
        <div
          className={`flex items-center justify-between py-2 px-3 border-b border-gray-700/50 ${getColorClass(
            color
          )} rounded-t-xl`}
        >
          <p className='font-medium text-white overflow-hidden'>{title}</p>
          <div className='flex gap-2 text-white'>
            <ProjectDropdown title={title} />
            <button className='p-1 hover:bg-white/10 rounded'>
              <FlipHorizontal2 size={18} />
            </button>
          </div>
        </div>

        <div className='p-2 flex flex-col gap-2'>
          {events.map((task, index) => (
            <EventDialog key={index} eventId={task._id} />
          ))}

          <AddEventDialog projectId={projectId || ''} listId={listId || ''} />
        </div>
      </div>
    </li>
  );
};

export default ProjectList;
