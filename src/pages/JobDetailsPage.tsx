import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { ArrowLeft, Bookmark, Share2, Star, MapPin, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import { saveJob, unsaveJob, setFilters } from '../features/jobs/jobsSlice';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs, savedJobs, filters } = useSelector((state: RootState) => state.jobs);
  
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);
  const [locationQuery, setLocationQuery] = useState(filters.locationQuery);

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

  const handleSearch = () => {
    dispatch(setFilters({ searchQuery, locationQuery }));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      
      <main className="container mx-auto py-8 px-6 max-w-7xl">
        {/* Top Header with Back and Search */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-800 hover:text-blue-600 font-bold transition-colors text-lg"
          >
            <ArrowLeft size={24} />
            Back
          </button>

          <div className="flex-1 bg-white p-2 rounded-full shadow-md border border-gray-100 flex items-center gap-2 w-full">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Job title, Keywords, or Company name"
                className="w-full bg-transparent text-sm text-gray-700 focus:outline-none placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="w-px h-6 bg-gray-200"></div>
            <div className="flex-1 flex items-center gap-3 px-4">
              <MapPin size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="w-full bg-transparent text-sm text-gray-700 focus:outline-none placeholder:text-gray-400"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="px-8 py-2.5 bg-blue-700 text-white text-sm font-bold rounded-full hover:bg-blue-800 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Job Card */}
          <div className="lg:col-span-9 bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl relative overflow-hidden">
            {/* Header section with icons */}
            <div className="absolute top-8 right-8 flex items-center gap-3">
              <button
                onClick={handleSave}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Bookmark size={24} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Share2 size={24} />
              </button>
            </div>

            <div className="flex items-start gap-8 mb-12">
              <div className="w-24 h-24 rounded-3xl bg-white p-0 flex items-center justify-center overflow-hidden">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 pt-2">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-medium text-gray-600">{job.company}</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill={i < Math.floor(job.rating) ? 'currentColor' : 'none'}
                        className={i < Math.floor(job.rating) ? 'text-yellow-400' : 'text-gray-200'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button className="px-12 py-3.5 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/20 text-lg">
                  Apply now
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Column - Metadata */}
              <div className="lg:w-48 flex-shrink-0 space-y-8">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold text-gray-900">Job type:</span>
                  <span className="text-lg text-gray-600">{job.type}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold text-gray-900">Location:</span>
                  <span className="text-lg text-gray-600">{job.location}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold text-gray-900">Experience:</span>
                  <span className="text-lg text-gray-600">{job.experience}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold text-gray-900">Number of Applicants:</span>
                  <span className="text-lg text-gray-600">{job.applicants}</span>
                </div>
              </div>

              {/* Right Column - Description & Responsibilities */}
              <div className="flex-1 space-y-12">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Job description</h2>
                  <div className="text-gray-600 leading-relaxed text-lg space-y-4">
                    <p>{job.description}</p>
                    <p>
                      If you are passionate about creating top-notch digital experiences and have a keen eye for design, we would love to have you on board!
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Responsibilities</h2>
                  <ul className="space-y-4">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-4 text-gray-600 text-lg">
                        <div className="w-2 h-2 rounded-full bg-gray-900 mt-2.5 flex-shrink-0"></div>
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>

          {/* Related Jobs */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
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
                        <p className="text-[10px] text-gray-400 font-medium">Remote | <span className="text-blue-600 font-bold">{rj.salary}</span></p>
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
