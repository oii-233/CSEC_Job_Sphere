import { Search, MapPin } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setFilters } from '../features/jobs/jobsSlice';
import { useState } from 'react';
import JobCard from '../components/JobCard';
import FilterSidebar from '../components/FilterSidebar';
import SavedJobs from '../components/SavedJobs';
import Navbar from '../components/Navbar';
import { motion } from 'motion/react';

export default function HomePage() {
  const dispatch = useDispatch();
  const { jobs, filters } = useSelector((state: RootState) => state.jobs);
  
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);
  const [locationQuery, setLocationQuery] = useState(filters.locationQuery);

  const handleSearch = () => {
    dispatch(setFilters({ searchQuery, locationQuery }));
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(filters.locationQuery.toLowerCase());
    
    // Simple filter matching for other filters if needed
    const matchesType = filters.type.length === 0 || filters.type.includes(job.type);
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[480px] overflow-hidden bg-blue-700 flex items-center">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-80 bg-white/10 rounded-3xl rotate-12 backdrop-blur-sm border border-white/10"></div>
          <div className="absolute top-40 right-20 w-80 h-60 bg-white/5 rounded-3xl -rotate-6 backdrop-blur-sm border border-white/10"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white/20 rotate-45"></div>
          <div className="absolute top-1/4 right-1/3 w-8 h-8 border-2 border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 right-10 text-white/20 text-6xl font-bold">△</div>
        </div>

        <div className="container mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="text-6xl font-bold text-white mb-6 leading-[1.1]">
              Find Your Dream <br /> Job with Ease
            </h1>
            <p className="text-blue-100 text-lg mb-2">
              Search, Apply, and Track Job Applications
            </p>
            <p className="text-blue-100 text-lg">
              All in One Place
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-end"
          >
            <div className="relative w-[500px] h-[500px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-white/10 rounded-full blur-3xl"></div>
              <img
                src="/hero.png"
                alt="Professional Character"
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl translate-y-6"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Sidebar - Filter */}
          <aside className="lg:col-span-3">
            <FilterSidebar />
          </aside>

          {/* Center - Job Listings */}
          <section className="lg:col-span-6 space-y-6">
            {/* Search Bar - Integrated above listings */}
            <div className="bg-white p-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 mb-8">
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

            <div className="space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-500">No jobs found matching your criteria.</p>
                </div>
              )}
            </div>
          </section>

          {/* Right Sidebar - Saved Jobs */}
          <aside className="lg:col-span-3">
            <SavedJobs />
          </aside>
        </div>
      </main>
    </div>
  );
}
