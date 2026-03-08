import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { unsaveJob } from '../features/jobs/jobsSlice';

export default function SavedJobs() {
  const dispatch = useDispatch();
  const { savedJobs } = useSelector((state: RootState) => state.jobs);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Saved Jobs</h2>
      
      <div className="space-y-4">
        {savedJobs.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No saved jobs yet.</p>
        ) : (
          savedJobs.map((job) => (
            <div
              key={job.id}
              className="group relative p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all"
            >
              <button
                onClick={() => dispatch(unsaveJob(job.id))}
                className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={14} />
              </button>
              
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 p-1.5 flex items-center justify-center overflow-hidden">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{job.title}</h3>
                  <p className="text-[10px] text-gray-400 font-medium">{job.company}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                <span>{job.location}</span>
                <span className="text-blue-600">{job.salary}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
