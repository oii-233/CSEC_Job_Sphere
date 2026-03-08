import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { ArrowLeft, Bookmark, Share2, Star, MapPin, Briefcase, Clock, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import { saveJob, unsaveJob } from '../features/jobs/jobsSlice';
import { motion } from 'motion/react';

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs, savedJobs } = useSelector((state: RootState) => state.jobs);
  
  const job = jobs.find((j) => j.id === id) || jobs[0];
  const isSaved = savedJobs.some((j) => j.id === job.id);
  const relatedJobs = jobs.filter((j) => j.id !== job.id).slice(0, 4);

  const handleSave = () => {
    if (isSaved) {
      dispatch(unsaveJob(job.id));
    } else {
      dispatch(saveJob(job));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto py-12 px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Job Info */}
          <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-medium text-gray-600">{job.company}</span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < Math.floor(job.rating) ? 'currentColor' : 'none'}
                          className={i < Math.floor(job.rating) ? 'text-yellow-400' : 'text-gray-200'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={handleSave}
                  className={`p-3 rounded-xl border transition-all ${
                    isSaved ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-gray-400 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Bookmark size={24} fill={isSaved ? 'currentColor' : 'none'} />
                </button>
                <button className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 transition-all">
                  <Share2 size={24} />
                </button>
                <button className="flex-1 md:flex-none px-10 py-3.5 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/20">
                  Apply now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-8 border-y border-gray-50">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-gray-900">Job type:</span>
                <span className="text-sm text-gray-500">{job.type}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-gray-900">Location:</span>
                <span className="text-sm text-gray-500">{job.location}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-gray-900">Experience:</span>
                <span className="text-sm text-gray-500">{job.experience}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-gray-900">Number of Applicants:</span>
                <span className="text-sm text-gray-500">{job.applicants}</span>
              </div>
            </div>

            <div className="space-y-10">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Job description</h2>
                <p className="text-gray-500 leading-relaxed">
                  {job.description}
                </p>
                <p className="text-gray-500 leading-relaxed mt-4">
                  If you are passionate about creating top-notch digital experiences and have a keen eye for design, we would love to have you on board!
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Related Jobs */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Related Jobs</h2>
              <div className="space-y-4">
                {relatedJobs.map((rj) => (
                  <div
                    key={rj.id}
                    onClick={() => navigate(`/job/${rj.id}`)}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 p-1.5 flex items-center justify-center overflow-hidden">
                        <img
                          src={rj.logo}
                          alt={rj.company}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {rj.title}
                        </h3>
                        <p className="text-[10px] text-gray-400 font-medium">{rj.company}</p>
                        <p className="text-[10px] text-gray-400 font-medium">Remote | {rj.salary}</p>
                      </div>
                    </div>
                    <button className="text-gray-300 hover:text-red-500 transition-colors">
                      <Bookmark size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
