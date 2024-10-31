import React from 'react';
import Project from './project';
const dummyProjects = [
  { name: 'Project 1', id: 1 },
  { name: 'Project 2', id: 2 },
  { name: 'Project 3', id: 3 },
  { name: 'Project 4', id: 4 },
  { name: 'Project 5', id: 5 },
  { name: 'Project 6', id: 6 },
  { name: 'Project 7', id: 7 },
  { name: 'Project 8', id: 8 },
  { name: 'Project 9', id: 9 },
  { name: 'Project 10', id: 10 },
];
const Projects = () => {
  return (
    <ul className='grid grid-cols-3 gap-5'>
      {dummyProjects.map((project) => (
        <li key={project.id}>
          <Project key={project.id} name={project.name} />
        </li>
      ))}
    </ul>
  );
};

export default Projects;
