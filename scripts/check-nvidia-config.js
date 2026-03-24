// NVIDIA Configuration Checker
// Run this in browser console to diagnose configuration issues

console.log('=== NVIDIA Configuration Check ===\n');

// 1. Check localStorage settings
const settings = JSON.parse(localStorage.getItem('settings-storage') || '{}');
console.log('1. Current Provider:', settings.state?.providerId || 'not set');
console.log('   Current Model:', settings.state?.modelId || 'not set');
console.log('   Provider Config Keys:', Object.keys(settings.state?.providersConfig || {}));

// 2. Check if NVIDIA provider is configured
const nvidiaConfig = settings.state?.providersConfig?.nvidia;
if (nvidiaConfig) {
  console.log('\n2. NVIDIA Provider Config:');
  console.log('   - Enabled:', nvidiaConfig.enabled);
  console.log('   - Server Configured:', nvidiaConfig.isServerConfigured);
  console.log('   - Has API Key:', !!nvidiaConfig.apiKey);
  console.log('   - Base URL:', nvidiaConfig.baseUrl || 'default');
  console.log('   - Server Models:', nvidiaConfig.serverModels || 'none');
} else {
  console.log('\n2. NVIDIA Provider: NOT FOUND in localStorage');
}

// 3. Check if we need to reset
console.log('\n3. Recommendation:');
if (settings.state?.providerId !== 'nvidia') {
  console.log('   ❌ Wrong provider selected. Run this to fix:');
  console.log('   localStorage.clear(); location.reload();');
} else {
  console.log('   ✅ NVIDIA provider is selected');

  if (!settings.state?.modelId) {
    console.log('   ⚠️  No model selected. Please select a model from the UI.');
  }
}

// 4. Test fetch to server providers endpoint
console.log('\n4. Testing server provider endpoint...');
fetch('/api/server-providers')
  .then(r => r.json())
  .then(data => {
    console.log('   Server Response:');
    console.log('   - Providers:', Object.keys(data.providers || {}));
    console.log('   - NVIDIA configured:', !!data.providers?.nvidia);
    if (data.providers?.nvidia) {
      console.log('   - NVIDIA models:', data.providers.nvidia.models || ['using defaults']);
      console.log('   - NVIDIA base URL:', data.providers.nvidia.baseUrl || 'default');
    }
  })
  .catch(err => {
    console.error('   ❌ Error fetching server providers:', err.message);
  });

console.log('\n=== End Check ===');
