import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '../features/jobs/jobsSlice';
import { RootState } from '../store';

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.jobs);

  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Volunteer',
    'Internship',
    'Remote',
    'Hybrid',
    'On-Site',
  ];

  const handleTypeChange = (type: string) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter((t) => t !== type)
      : [...filters.type, type];
    dispatch(setFilters({ type: newTypes }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Filter</h2>
        <button
          onClick={() => dispatch(resetFilters())}
          className="text-xs font-semibold text-blue-700 hover:underline"
        >
          Reset all filter
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Date Posted</h3>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Job Type</h3>
          <div className="space-y-3">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.type.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Location</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your location"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.location}
              onChange={(e) => dispatch(setFilters({ location: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Experience Level</h3>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Intermediate</option>
            <option>Entry Level</option>
            <option>Senior Level</option>
          </select>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Salary Range</h3>
          <div className="px-2">
            <input
              type="range"
              min="0"
              max="1500"
              step="50"
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              value={filters.salaryRange[1]}
              onChange={(e) =>
                dispatch(setFilters({ salaryRange: [filters.salaryRange[0], parseInt(e.target.value)] }))
              }
            />
            <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400">
              <span>$0</span>
              <span>$1,500</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1">
              <label className="text-[10px] font-bold text-gray-400 block mb-1">From</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-600"
                placeholder="$0"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-bold text-gray-400 block mb-1">To</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-600"
                placeholder="$1,500"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Currency</h3>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Dollar</option>
            <option>Euro</option>
            <option>Pound</option>
          </select>
        </div>

        <button className="w-full py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/20">
          Reset all filter
        </button>
      </div>
    </div>
  );
}
