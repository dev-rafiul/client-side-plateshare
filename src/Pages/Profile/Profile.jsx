import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Edit3, 
  Save, 
  X, 
  Calendar,
  MapPin,
  Award,
  TrendingUp,
  Heart,
  Users,
  Clock
} from "lucide-react";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    phone: "",
    bio: "",
    location: "",
    website: ""
  });
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "https://plateshare-server-mu.vercel.app/users";

  // Mock user statistics - in real app, fetch from backend
  const userStats = {
    foodsShared: 24,
    mealsProvided: 156,
    peopleHelped: 89,
    joinedDate: "January 2024",
    totalDonations: 42,
    communityRank: "Gold Contributor"
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        photoURL: user.photoURL || "",
        phone: user.phoneNumber || "",
        bio: user.bio || "Passionate about reducing food waste and helping the community.",
        location: user.location || "",
        website: user.website || ""
      });
    }
  }, [user]);

  const updateBackendProfile = async (updatedUser) => {
    try {
      await fetch(`${BACKEND_URL}/${user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
    } catch (error) {
      console.error("Backend update failed:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!user) return toast.error("You must be logged in!");

    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      const updatedUser = {
        uid: user.uid,
        name: formData.name,
        email: user.email,
        photoURL: formData.photoURL,
        phone: formData.phone,
        bio: formData.bio,
        location: formData.location,
        website: formData.website
      };

      await updateBackendProfile(updatedUser);

      setUser({
        ...user,
        displayName: formData.name,
        photoURL: formData.photoURL,
        phoneNumber: formData.phone,
        bio: formData.bio,
        location: formData.location,
        website: formData.website
      });

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        photoURL: user.photoURL || "",
        phone: user.phoneNumber || "",
        bio: user.bio || "Passionate about reducing food waste and helping the community.",
        location: user.location || "",
        website: user.website || ""
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-base-200 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-base-content opacity-50" />
          </div>
          <h2 className="text-2xl font-bold text-base-content mb-2">Access Restricted</h2>
          <p className="text-base-content opacity-70 mb-6">Please login to access your profile.</p>
          <button className="btn btn-primary">
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <title>Profile | PlateShare</title>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 pt-20 pb-32">
        <div className="absolute inset-0 bg-base-100 opacity-80"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-base-content mb-4">
              My Profile
            </h1>
            <p className="text-lg text-base-content opacity-70 max-w-2xl mx-auto">
              Manage your account, track your contributions, and make a difference in your community.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body text-center">
                {/* Profile Image */}
                <div className="relative mx-auto mb-6">
                  <div className="w-32 h-32 mx-auto relative">
                    <img
                      src={formData.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || user.email)}&background=ebc15e&color=fff&size=128`}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-primary shadow-lg"
                    />
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 btn btn-circle btn-sm btn-primary">
                        <Camera className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Basic Info */}
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="input input-bordered w-full text-center font-bold text-xl"
                        placeholder="Your Name"
                      />
                      <textarea
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="textarea textarea-bordered w-full text-center"
                        placeholder="Tell us about yourself..."
                        rows="3"
                      />
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-base-content">
                        {formData.name || "Anonymous User"}
                      </h2>
                      <p className="text-base-content opacity-70">
                        {formData.bio}
                      </p>
                    </>
                  )}

                  <div className="flex items-center justify-center gap-2 text-base-content opacity-60">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {userStats.joinedDate}</span>
                  </div>

                  <div className="badge badge-primary badge-lg">
                    <Award className="w-4 h-4 mr-2" />
                    {userStats.communityRank}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="card-actions justify-center mt-6">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={handleSave}
                        disabled={loading}
                        className="btn btn-primary"
                      >
                        {loading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Save Changes
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="btn btn-ghost"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="btn btn-primary"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details and Stats */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                  <h3 className="card-title text-base-content mb-4">
                    <User className="w-5 h-5" />
                    Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </span>
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="input input-bordered bg-base-200 cursor-not-allowed"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </span>
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="input input-bordered"
                          placeholder="+1 (555) 123-4567"
                        />
                      ) : (
                        <input
                          type="tel"
                          value={formData.phone || "Not provided"}
                          readOnly
                          className="input input-bordered bg-base-200"
                        />
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Location
                        </span>
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="input input-bordered"
                          placeholder="City, Country"
                        />
                      ) : (
                        <input
                          type="text"
                          value={formData.location || "Not specified"}
                          readOnly
                          className="input input-bordered bg-base-200"
                        />
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Photo URL</span>
                      </label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={formData.photoURL}
                          onChange={(e) => handleInputChange('photoURL', e.target.value)}
                          className="input input-bordered"
                          placeholder="https://example.com/photo.jpg"
                        />
                      ) : (
                        <input
                          type="url"
                          value={formData.photoURL || "Using default avatar"}
                          readOnly
                          className="input input-bordered bg-base-200"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Statistics */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                  <h3 className="card-title text-base-content mb-6">
                    <TrendingUp className="w-5 h-5" />
                    Your Impact
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="stat bg-primary/10 rounded-lg p-4">
                      <div className="stat-figure text-primary">
                        <Heart className="w-8 h-8" />
                      </div>
                      <div className="stat-title text-base-content opacity-70">Foods Shared</div>
                      <div className="stat-value text-primary">{userStats.foodsShared}</div>
                    </div>

                    <div className="stat bg-secondary/10 rounded-lg p-4">
                      <div className="stat-figure text-secondary">
                        <Users className="w-8 h-8" />
                      </div>
                      <div className="stat-title text-base-content opacity-70">People Helped</div>
                      <div className="stat-value text-secondary">{userStats.peopleHelped}</div>
                    </div>

                    <div className="stat bg-accent/10 rounded-lg p-4">
                      <div className="stat-figure text-accent">
                        <Award className="w-8 h-8" />
                      </div>
                      <div className="stat-title text-base-content opacity-70">Meals Provided</div>
                      <div className="stat-value text-accent">{userStats.mealsProvided}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                  <h3 className="card-title text-base-content mb-4">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { action: "Shared homemade pasta", time: "2 hours ago", type: "share" },
                      { action: "Helped 3 families with groceries", time: "1 day ago", type: "help" },
                      { action: "Joined PlateShare community", time: "2 weeks ago", type: "join" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'share' ? 'bg-primary' : 
                          activity.type === 'help' ? 'bg-secondary' : 'bg-accent'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-base-content font-medium">{activity.action}</p>
                          <p className="text-base-content opacity-60 text-sm">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


