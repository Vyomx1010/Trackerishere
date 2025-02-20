import { supabase } from './supabase';

async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('streaks').select('count');
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      return false;
    }
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
}

testSupabaseConnection();