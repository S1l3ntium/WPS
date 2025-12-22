// Simple test to check if API works
const API_BASE_URL = 'http://localhost:8000/api';

async function testAPI() {
  try {
    console.log('Testing API...');
    
    const eventsResponse = await fetch(`${API_BASE_URL}/events`);
    console.log('Events status:', eventsResponse.status);
    
    const events = await eventsResponse.json();
    console.log('Events loaded:', events.data.length);
    
    return true;
  } catch (error) {
    console.error('API test failed:', error);
    return false;
  }
}

testAPI();
