import { createClient } from '@supabase/supabase-js';

const URL = "https://oopemiitrawvjorggzdf.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vcGVtaWl0cmF3dmpvcmdnemRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMzUwNTUsImV4cCI6MjA4MDcxMTA1NX0.fZTQTZ_r3XCaTdkU9K07x3E93RGxQfa5VKA45ERCv0s";

export const supabase = createClient(URL, API_KEY);