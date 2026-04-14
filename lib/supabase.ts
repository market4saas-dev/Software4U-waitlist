import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgeptxqgourvrckoyrqd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXB0eHFnb3VydnJja295cnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NzM1MjQsImV4cCI6MjA4OTM0OTUyNH0.x7mZzH7d_Wb5LzN8yzl2JE3jFiMd2clSc6xy6aYGO90';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);