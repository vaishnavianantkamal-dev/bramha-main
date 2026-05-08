import { useEffect, useState } from 'react';

export default function Diagnostic() {
  const [diagnostics, setDiagnostics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkDiagnostics = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost/brahmavalley-main/brahmavalley-main/backend/api';
        
        console.log('🔍 Checking API at:', apiUrl);
        
        const response = await fetch(`${apiUrl}/diagnostic.php`);
        const data = await response.json();
        
        console.log('📦 Diagnostic response:', data);
        setDiagnostics(data);
      } catch (err) {
        console.error('❌ Diagnostic error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkDiagnostics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading diagnostics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-red-500">❌ Diagnostic Error</h1>
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
            <p className="text-red-300">{error}</p>
          </div>
          <div className="mt-6 bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Troubleshooting Steps:</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Make sure XAMPP Apache and MySQL are running</li>
              <li>Check that the backend .env file is configured correctly</li>
              <li>Verify the database exists: <code className="bg-gray-900 px-2 py-1 rounded">brahmavalley_db</code></li>
              <li>Check the API URL: <code className="bg-gray-900 px-2 py-1 rounded">{import.meta.env.VITE_API_BASE_URL}</code></li>
              <li>Check browser console for CORS errors</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🔍 Backend Diagnostics</h1>

        {diagnostics?.data?.database?.status === 'CONNECTED' ? (
          <div className="bg-green-900/20 border border-green-500 rounded-lg p-6 mb-6">
            <p className="text-green-300">✅ Database Connection: OK</p>
          </div>
        ) : (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 mb-6">
            <p className="text-red-300">❌ Database Connection: FAILED</p>
            {diagnostics?.data?.database?.error && (
              <p className="text-red-400 mt-2">{diagnostics.data.database.error}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PHP Info */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">PHP Information</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-400">Version:</span> {diagnostics?.data?.php_version}</p>
              <p><span className="text-gray-400">Server:</span> {diagnostics?.data?.server}</p>
              <p><span className="text-gray-400">Time:</span> {diagnostics?.data?.timestamp}</p>
            </div>
          </div>

          {/* Database Info */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Database Information</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-400">Status:</span> <span className={diagnostics?.data?.database?.status === 'CONNECTED' ? 'text-green-400' : 'text-red-400'}>{diagnostics?.data?.database?.status}</span></p>
              <p><span className="text-gray-400">Host:</span> {diagnostics?.data?.database?.host}</p>
              <p><span className="text-gray-400">Database:</span> {diagnostics?.data?.database?.database}</p>
              <p><span className="text-gray-400">MySQL Version:</span> {diagnostics?.data?.database?.mysql_version}</p>
              <p><span className="text-gray-400">Tables:</span> {diagnostics?.data?.database?.tables_count}</p>
            </div>
          </div>

          {/* Data Counts */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Data Counts</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-400">Hero Slides:</span> {diagnostics?.data?.database?.hero_slides_count || 0}</p>
              <p><span className="text-gray-400">Statistics:</span> {diagnostics?.data?.database?.statistics_count || 0}</p>
            </div>
          </div>

          {/* File Permissions */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">File Permissions</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-400">Uploads Writable:</span> <span className={diagnostics?.data?.file_permissions?.uploads_writable ? 'text-green-400' : 'text-red-400'}>{diagnostics?.data?.file_permissions?.uploads_writable ? '✅' : '❌'}</span></p>
              <p><span className="text-gray-400">Config Readable:</span> <span className={diagnostics?.data?.file_permissions?.config_readable ? 'text-green-400' : 'text-red-400'}>{diagnostics?.data?.file_permissions?.config_readable ? '✅' : '❌'}</span></p>
              <p><span className="text-gray-400">API Readable:</span> <span className={diagnostics?.data?.file_permissions?.api_readable ? 'text-green-400' : 'text-red-400'}>{diagnostics?.data?.file_permissions?.api_readable ? '✅' : '❌'}</span></p>
            </div>
          </div>
        </div>

        {/* Tables List */}
        {diagnostics?.data?.database?.tables && (
          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">Database Tables ({diagnostics.data.database.tables.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {diagnostics.data.database.tables.map((table) => (
                <div key={table} className="bg-gray-700 px-3 py-2 rounded text-sm">
                  {table}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">✅ Next Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-300">
            <li>If database is connected, go to <a href="/" className="underline hover:text-blue-200">Home Page</a></li>
            <li>If database is not connected, check your XAMPP MySQL server</li>
            <li>If tables are missing, import the SQL file from backend/database/ALL_TABLES_COMPLETE.sql</li>
            <li>Check browser console (F12) for any CORS or network errors</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
