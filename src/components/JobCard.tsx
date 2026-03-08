import React from 'react';
import { Bookmark, Share2 } from 'lucide-react';
import { Job } from '../features/jobs/jobsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { saveJob, unsaveJob, selectJob } from '../features/jobs/jobsSlice';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';

interface JobCardProps {
  job: Job;
  key?: string;
}

export default function JobCard({ job }: JobCardProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedJobs = useSelector((state: RootState) => state.jobs.savedJobs);
  const isSaved = savedJobs.some((j) => j.id === job.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      dispatch(unsaveJob(job.id));
    } else {
      dispatch(saveJob(job));
    }
  };

  const handleClick = () => {
    dispatch(selectJob(job));
    navigate(`/job/${job.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center p-2 border border-gray-100 overflow-hidden">
            <img
              src={job.logo}
              alt={job.company}
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500">{job.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className={`p-2 rounded-full transition-colors ${
              isSaved ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 rounded-full text-gray-400 hover:bg-gray-50 transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md">
          {job.location}
        </span>
        <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md">
          {job.type}
        </span>
        <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md">
          {job.salary}
        </span>
      </div>

      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
        {job.description}
      </p>
    </div>
  );
}
