import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

interface JobsState {
  jobs: Job[];
  savedJobs: Job[];
  selectedJob: Job | null;
  filters: {
    type: string[];
    location: string;
    experience: string;
    salaryRange: [number, number];
  };
}

const initialState: JobsState = {
  jobs: [
    {
      id: '1',
      title: 'Product Design',
      company: 'Amazon',
      logo: 'https://picsum.photos/seed/amazon/100/100',
      location: 'Lagos (On-site)',
      type: 'Full-time',
      salary: '$200 - $1,200',
      description: 'We are seeking a highly skilled and creative Senior UI/UX Designer to join our dynamic team in Lagos. As a Senior UI/UX Designer, you will play a crucial role in designing intuitive and engaging user interfaces and enhancing user experience across various digital platforms.',
      responsibilities: [
        'Design and develop user-centric interfaces for web and mobile applications.',
        'Conduct user research, usability testing, and gather feedback to improve designs.',
        'Create wireframes, prototypes, and high-fidelity designs using design tools like Figma, Adobe XD, or Sketch.',
        'Collaborate with product managers and developers to ensure design consistency and feasibility.',
        'Stay updated with the latest UI/UX trends and best practices to ensure optimal user experience.',
        'Lead and mentor junior designers in the team, providing guidance and feedback.'
      ],
      applicants: 40,
      experience: '5years',
      rating: 4.5
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'Abstergo Ltd.',
      logo: 'https://picsum.photos/seed/abstergo/100/100',
      location: 'Remote',
      type: 'Full-time',
      salary: '$200 - $1,200',
      description: 'Develop and maintain high-quality web applications using React and TypeScript.',
      responsibilities: [],
      applicants: 25,
      experience: '3years',
      rating: 4.2
    },
    {
      id: '3',
      title: 'Digital Marketing Specialist',
      company: 'Sushi shop',
      logo: 'https://picsum.photos/seed/sushi/100/100',
      location: 'Remote',
      type: 'Full-time',
      salary: '$250 - $1,250',
      description: 'Create and execute digital marketing campaigns to drive traffic and increase brand awareness.',
      responsibilities: [],
      applicants: 15,
      experience: '2years',
      rating: 4.0
    },
    {
      id: '4',
      title: 'Data Analyst',
      company: 'GreenVita',
      logo: 'https://picsum.photos/seed/greenvita/100/100',
      location: 'Remote',
      type: 'Full-time',
      salary: '$300 - $1,500',
      description: 'Analyze data to provide insights and support decision-making processes.',
      responsibilities: [],
      applicants: 10,
      experience: '4years',
      rating: 4.3
    }
  ],
  savedJobs: [],
  selectedJob: null,
  filters: {
    type: [],
    location: '',
    experience: '',
    salaryRange: [0, 1500],
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
});

export const { setJobs, saveJob, unsaveJob, selectJob, setFilters, resetFilters } = jobsSlice.actions;
export default jobsSlice.reducer;
