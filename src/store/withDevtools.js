import { devtools } from 'zustand/middleware';

export const withDevtools = (config, name) => devtools(config, { name }); 