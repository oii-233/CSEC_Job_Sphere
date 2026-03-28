import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  responsibilities: string[];
  applicants: number;
  experience: string;
  rating: number;
  isBookMarked?: boolean;
  publicationDate?: string;
}

interface JobsState {
  jobs: Job[];
  savedJobs: Job[];
  selectedJob: Job | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: {
    type: string[];
    location: string;
    experience: string;
    salaryRange: [number, number];
    searchQuery: string;
    locationQuery: string;
    datePosted: string;
  };
}

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (page: number = 1) => {
  const response = await fetch(`https://www.themuse.com/api/public/jobs?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  const data = await response.json();
  
  // Map The Muse API format to our Job interface
  const mappedJobs: Job[] = data.results.map((job: any) => {
    // Determine location
    const locationName = job.locations && job.locations.length > 0 
      ? job.locations[0].name 
      : 'Remote';
      
    // Determine experience/level
    const levelName = job.levels && job.levels.length > 0 
      ? job.levels[0].name 
      : 'Entry Level';

    // Strip basic HTML from Muse job contents for description snippet
    let cleanDescription = 'No description available.';
    if (job.contents) {
        // Simple HTML stripping
        cleanDescription = job.contents.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
        if (cleanDescription.length > 300) {
            cleanDescription = cleanDescription.substring(0, 300) + '...';
        }
    }

    return {
      id: String(job.id),
      title: job.name,
      company: job.company?.name || 'Unknown Company',
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company?.name || 'U')}&background=random`,
      location: locationName,
      type: 'Full-time', // The Muse doesn't reliably provide Type at top level
      salary: 'Competitive', 
      description: cleanDescription,
      responsibilities: [],
      applicants: Math.floor(Math.random() * 100) + 10, // Simulated fallback
      experience: levelName,
      rating: +(Math.random() * 2 + 3).toFixed(1), // Simulated 3.0 to 5.0
      publicationDate: job.publication_date || new Date().toISOString(),
    };
  });

  return mappedJobs;
});

const initialState: JobsState = {
  jobs: [],
  savedJobs: [],
  selectedJob: null,
  status: 'idle',
  error: null,
  filters: {
    type: [],
    location: '',
    experience: '',
    salaryRange: [0, 5000],
    searchQuery: '',
    locationQuery: '',
    datePosted: '',
  },
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    saveJob: (state, action: PayloadAction<Job>) => {
      if (!state.savedJobs.find(j => j.id === action.payload.id)) {
        state.savedJobs.push(action.payload);
      }
    },
    unsaveJob: (state, action: PayloadAction<string>) => {
      state.savedJobs = state.savedJobs.filter(j => j.id !== action.payload);
    },
    selectJob: (state, action: PayloadAction<Job | null>) => {
      state.selectedJob = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<JobsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch jobs';
      });
  },
});

export const { setJobs, saveJob, unsaveJob, selectJob, setFilters, resetFilters } = jobsSlice.actions;
export default jobsSlice.reducer;
