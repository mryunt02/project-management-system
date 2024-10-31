'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const ProjectDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return <div>{id}</div>;
};

export default ProjectDetail;
