import { useState, useEffect } from 'react';
import Navigation from "../components/Navigation";
import { User, Lock, Mail, LogOut, Trash2 } from 'lucide-react';
import URL from '../config/api/baseURL';
interface UserData {
  name: string;
  email: string;
}

export default function SettingsPage() {
  const [userData, setUserData] = useState<UserData>({ name: '', email: '' });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/user/password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(passwordData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setPasswordData({
          current_password: '',
          new_password: '',
          new_password_confirmation: ''
        });
        setIsChangingPassword(false);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to change password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('favorites');
    localStorage.removeItem('playlists');
    window.location.href = '/login';
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 pt-20 px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
            <p className="text-purple-200">Manage your account and preferences</p>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg backdrop-blur-md ${
              message.type === 'success' 
                ? 'bg-green-500/20 border border-green-400/30 text-green-100' 
                : 'bg-red-500/20 border border-red-400/30 text-red-100'
            }`}>
              {message.text}
            </div>
          )}

          {/* Profile Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-white/20">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-purple-300 mr-3" />
              <h2 className="text-2xl font-bold text-white">Your Profile</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-purple-300 text-sm mb-2 block">Username</label>
                <p className="text-white text-lg font-medium">{userData.name || 'Loading...'}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="text-purple-300 text-sm mb-2 block flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </label>
                <p className="text-white text-lg font-medium">{userData.email || 'Loading...'}</p>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-white/20">
            <div className="flex items-center mb-6">
              <Lock className="w-6 h-6 text-purple-300 mr-3" />
              <h2 className="text-2xl font-bold text-white">Password & Security</h2>
            </div>

            {!isChangingPassword ? (
              <button
                onClick={() => setIsChangingPassword(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Change Password
              </button>
            ) : (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="text-purple-300 text-sm mb-2 block">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.current_password}
                    onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-purple-300 text-sm mb-2 block">New Password</label>
                  <input
                    type="password"
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
                    required
                    minLength={8}
                  />
                </div>

                <div>
                  <label className="text-purple-300 text-sm mb-2 block">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.new_password_confirmation}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password_confirmation: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordData({
                        current_password: '',
                        new_password: '',
                        new_password_confirmation: ''
                      });
                      setMessage({ type: '', text: '' });
                    }}
                    className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/10 backdrop-blur-md rounded-2xl p-8 border border-red-400/30">
            <h2 className="text-2xl font-bold text-red-200 mb-6">Danger Zone</h2>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-all mb-4"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                  // TODO: Implement account deletion
                  alert('Account deletion will be implemented in future update');
                }
              }}
              className="flex items-center gap-2 bg-red-600/20 text-red-200 px-6 py-3 rounded-lg font-medium hover:bg-red-600/30 transition-all border border-red-400/30"
            >
              <Trash2 className="w-5 h-5" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}