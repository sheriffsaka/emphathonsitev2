import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = 'https://wluzaooxiwbjhmjiylmb.supabase.co';
const PROJECT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdXphb294aXdiamhtaml5bG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NjE5OTcsImV4cCI6MjA4MzQzNzk5N30.lGBpsZj6yK12Mz0rAAG92oJZPnOcEsdwMHHk_3aKnFc';

export const supabase = createClient(PROJECT_URL, PROJECT_KEY);