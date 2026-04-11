import { useState, useEffect } from "react";
import api from "../api/axios";
import { Camera, User, Mail, Save, AlertCircle, CheckCircle2 } from "lucide-react";

export default function UpdateProfile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch logged-in user details to pre-fill the form
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        const userData = res.data.data;
        setUser(userData);
        setName(userData?.name || "");
        
        // Use the absolute URL via the backend base URL (if needed) or relative if proxy works
        // The picture comes as /uploads/... but if they logged in with Google it could be an absolute URL
        if (userData?.picture) {
          if (userData.picture.startsWith("http")) {
            setImagePreview(userData.picture);
          } else {
            // Assuming your REST API is running on localhost:8083, we construct the image URL.
            // Vite proxy might handle this, but it's safer to use the base API url. 
            setImagePreview(`http://localhost:8083${userData.picture}`);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        setError("Failed to load profile data.");
      }
    };
    fetchUser();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create a local preview of the uploaded image
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const formData = new FormData();
      if (name) formData.append("name", name);
      if (image) formData.append("image", image);

      // Putting formData to the new endpoint we just created
      const res = await api.put("/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Profile updated successfully!");
      
      // Update local storage context if user context relies on it, or just show success message
      const updatedUser = res.data.data;
      setUser(updatedUser);
      
      if (updatedUser?.picture) {
        if (updatedUser.picture.startsWith("http")) {
          setImagePreview(updatedUser.picture);
        } else {
          setImagePreview(`http://localhost:8083${updatedUser.picture}`);
        }
      }
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // We are using a beautiful dark-themed card container inside our layout
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Account Settings</h1>
        <p className="text-slate-500 mt-2">Manage your profile information and account preferences.</p>
      </div>

      <div className="bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-800">
        <div className="p-8 sm:p-12 border-b border-slate-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
              <User className="text-indigo-400 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Profile Details</h2>
              <p className="text-slate-400 text-sm">Update your personal information and profile picture.</p>
            </div>
          </div>

          {/* Alert Messages */}
          {message && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium text-sm">{message}</p>
            </div>
          )}
          {error && (
            <div className="mb-6 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-800 border-4 border-slate-800 outline outline-2 outline-indigo-500/50 shadow-2xl relative">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-slate-600 m-auto mt-7" />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white mb-1" />
                  </div>
                </div>
                
                {/* Hidden File Input */}
                <input 
                  type="file" 
                  id="profile-upload" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="hidden" 
                />
                
                <label 
                  htmlFor="profile-upload" 
                  className="absolute bottom-0 right-0 p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors cursor-pointer shadow-lg shadow-indigo-500/30 border-2 border-slate-900"
                  title="Change profile picture"
                >
                  <Camera className="w-4 h-4" />
                </label>
              </div>

              <div className="flex-1 space-y-4 text-center sm:text-left pt-2">
                <h3 className="text-white font-medium text-lg">Profile Picture</h3>
                <p className="text-sm text-slate-400 max-w-md">
                  Upload a high-resolution image to help your team members recognize you. JPG, GIF or PNG. Max size of 5MB.
                </p>
                <div className="mt-4 flex gap-3 justify-center sm:justify-start">
                  <button 
                    type="button"
                    onClick={() => document.getElementById('profile-upload').click()}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-colors border border-slate-700"
                  >
                    Change Image
                  </button>
                  {imagePreview && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setImage(null);
                        setImagePreview(user?.picture ? (user.picture.startsWith("http") ? user.picture : `http://localhost:8083${user.picture}`) : null);
                      }}
                      className="px-4 py-2 bg-transparent hover:bg-rose-500/10 text-rose-400 text-sm font-medium rounded-lg transition-colors border border-transparent hover:border-rose-500/20"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Inputs Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-800">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none placeholder-slate-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">
                  Email Address
                  {user?.provider === "google" && (
                    <span className="ml-2 text-xs px-2 py-0.5 bg-sky-500/10 text-sky-400 rounded-full border border-sky-500/20">Google Auth</span>
                  )}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-500" />
                  </div>
                  {/* Email is permanently disabled as per business rules usually; if need to change, another form needed */}
                  <input
                    type="email"
                    disabled
                    value={user?.email || ""}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 text-slate-400 rounded-xl cursor-not-allowed opacity-80 outline-none"
                    title="Email cannot be changed"
                  />
                </div>
                <p className="text-xs text-slate-500">Contact support to change your email address.</p>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-end border-t border-slate-800">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {loading ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
