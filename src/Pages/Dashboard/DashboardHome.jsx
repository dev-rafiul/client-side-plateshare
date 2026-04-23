import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { motion } from 'framer-motion';
import { 
  Plus, 
  List, 
  FileText, 
  TrendingUp, 
  Users, 
  Utensils, 
  Clock,
  Award,
  ArrowUpRight,
  Activity,
  Heart,
  Share2
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFoods: 0,
    totalRequests: 0,
    totalShares: 0,
    userFoodsShared: 0,
    userPeopleHelped: 0,
    userRequests: 0,
    impactScore: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  const isAdmin = user?.email === 'admin@plateshare.com' || user?.role === 'admin';

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        
        // Fetch all statistics in parallel
        const [
          usersResponse,
          foodsResponse,
          requestsResponse,
          userFoodsResponse,
          userRequestsResponse
        ] = await Promise.all([
          // Total users count
          fetch('https://plateshare-server-mu.vercel.app/users'),
          // Total foods count
          fetch('https://plateshare-server-mu.vercel.app/foods'),
          // Total requests count
          fetch('https://plateshare-server-mu.vercel.app/food-requests'),
          // User's foods
          fetch(`https://plateshare-server-mu.vercel.app/my-foods?email=${user?.email}`),
          // User's requests
          fetch(`https://plateshare-server-mu.vercel.app/myFoodRequests?email=${user?.email}`)
        ]);

        const [
          usersData,
          foodsData,
          requestsData,
          userFoodsData,
          userRequestsData
        ] = await Promise.all([
          usersResponse.json(),
          foodsResponse.json(),
          requestsData.json(),
          userFoodsResponse.json(),
          userRequestsResponse.json()
        ]);

        // Calculate statistics
        const totalUsers = Array.isArray(usersData) ? usersData.length : 0;
        const totalFoods = Array.isArray(foodsData) ? foodsData.length : 0;
        const totalRequests = Array.isArray(requestsData) ? requestsData.length : 0;
        const userFoodsShared = Array.isArray(userFoodsData) ? userFoodsData.length : 0;
        const userRequests = Array.isArray(userRequestsData) ? userRequestsData.length : 0;

        // Calculate unique food sharers
        const uniqueSharers = new Set();
        if (Array.isArray(foodsData)) {
          foodsData.forEach(food => {
            if (food.donator_email) {
              uniqueSharers.add(food.donator_email);
            }
          });
        }
        const totalShares = uniqueSharers.size;

        // Calculate user's people helped (requests for user's foods)
        let userPeopleHelped = 0;
        if (Array.isArray(requestsData) && Array.isArray(userFoodsData)) {
          const userFoodIds = userFoodsData.map(food => food._id);
          userPeopleHelped = requestsData.filter(request => 
            userFoodIds.includes(request.food_id) && request.status === 'donated'
          ).length;
        }

        // Calculate impact score based on user's activity
        const impactScore = Math.min(100, (userFoodsShared * 10) + (userPeopleHelped * 15) + (userRequests * 5));

        setStats({
          totalUsers,
          totalFoods,
          totalRequests,
          totalShares,
          userFoodsShared,
          userPeopleHelped,
          userRequests,
          impactScore
        });

        // Generate recent activity based on user's data
        const activities = [];
        
        if (Array.isArray(userFoodsData)) {
          userFoodsData.slice(0, 2).forEach(food => {
            activities.push({
              id: `food-${food._id}`,
              action: `Shared ${food.food_name}`,
              time: new Date(food.created_at || Date.now()).toLocaleDateString(),
              type: "share",
              status: food.food_status === "Available" ? "Active" : "Completed"
            });
          });
        }

        if (Array.isArray(userRequestsData)) {
          userRequestsData.slice(0, 2).forEach(request => {
            activities.push({
              id: `request-${request._id}`,
              action: `Request for food from ${request.name}`,
              time: new Date(request.created_at || Date.now()).toLocaleDateString(),
              type: "request",
              status: request.status === "pending" ? "Pending" : "Completed"
            });
          });
        }

        setRecentActivity(activities.slice(0, 4));

      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        // Set fallback data in case of error
        setStats({
          totalUsers: 0,
          totalFoods: 0,
          totalRequests: 0,
          totalShares: 0,
          userFoodsShared: 0,
          userPeopleHelped: 0,
          userRequests: 0,
          impactScore: 0
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchDashboardStats();
    }
  }, [user]);

  const quickActions = [
    {
      title: "Add Food",
      description: "Share food with your community",
      icon: Plus,
      link: "/dashboard/add-food",
      color: "bg-primary text-primary-content",
      count: "Quick Action"
    },
    {
      title: "Manage Foods", 
      description: "View and edit your shared items",
      icon: List,
      link: "/dashboard/manage-foods",
      color: "bg-secondary text-secondary-content",
      count: `${stats.userFoodsShared} Active`
    },
    {
      title: "My Requests",
      description: "Track your food requests", 
      icon: FileText,
      link: "/dashboard/my-requests",
      color: "bg-accent text-accent-content",
      count: `${stats.userRequests} Total`
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <span className="ml-4 text-base-content">Loading dashboard statistics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-base-content mb-2">
              Welcome back, {user?.displayName?.split(' ')[0] || 'Friend'}! 👋
            </h1>
            <p className="text-base-content/70 text-lg">
              Here's what's happening in the PlateShare community.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-base-content/60">Today's Date</p>
              <p className="font-semibold text-base-content">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Community Stats Cards */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-base-content mb-4">Community Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Users",
              value: stats.totalUsers,
              icon: Users,
              description: "Registered members",
              color: "text-primary",
              bgColor: "bg-primary/10"
            },
            {
              title: "Available Foods",
              value: stats.totalFoods,
              icon: Utensils,
              description: "Food items shared",
              color: "text-secondary",
              bgColor: "bg-secondary/10"
            },
            {
              title: "Food Requests",
              value: stats.totalRequests,
              icon: FileText,
              description: "Total requests made",
              color: "text-accent",
              bgColor: "bg-accent/10"
            },
            {
              title: "Food Sharers",
              value: stats.totalShares,
              icon: Share2,
              description: "People sharing food",
              color: "text-success",
              bgColor: "bg-success/10"
            }
          ].map((stat) => (
            <div key={stat.title} className="card bg-base-100 shadow-lg border border-base-200">
              <div className="card-body p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-base-content">
                      {stat.value}
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-base-content mb-1">
                  {stat.title}
                </h3>
                <p className="text-base-content/60 text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Personal Stats Cards */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-base-content mb-4">Your Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Foods Shared",
              value: stats.userFoodsShared,
              icon: Utensils,
              change: "Your contributions",
              color: "text-primary",
              bgColor: "bg-primary/10"
            },
            {
              title: "People Helped",
              value: stats.userPeopleHelped,
              icon: Heart,
              change: "Lives impacted",
              color: "text-secondary",
              bgColor: "bg-secondary/10"
            },
            {
              title: "Your Requests",
              value: stats.userRequests,
              icon: FileText,
              change: "Requests made",
              color: "text-accent",
              bgColor: "bg-accent/10"
            },
            {
              title: "Impact Score",
              value: stats.impactScore,
              icon: Award,
              change: "Community rating",
              color: "text-success",
              bgColor: "bg-success/10"
            }
          ].map((stat) => (
            <div key={stat.title} className="card bg-base-100 shadow-lg border border-base-200">
              <div className="card-body p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="flex items-center gap-1 text-base-content/60 text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-base-content mb-1">
                  {stat.value}
                </h3>
                <p className="text-base-content/60 text-sm">
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body">
              <h2 className="card-title text-base-content mb-6">
                <Plus className="w-5 h-5" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <NavLink
                    key={action.title}
                    to={action.link}
                    className="p-4 rounded-lg border border-base-300 hover:shadow-md transition-all duration-300 group hover:border-primary/50"
                  >
                    <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-base-content mb-1">{action.title}</h3>
                    <p className="text-base-content/60 text-sm mb-2">{action.description}</p>
                    <span className="text-xs text-primary font-medium">{action.count}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Request Status Summary */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body">
              <h3 className="card-title text-base-content mb-4">
                <TrendingUp className="w-5 h-5" />
                Community Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-base-content/70">Active Foods</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-base-300 rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full" 
                        style={{width: `${Math.min(100, (stats.totalFoods / Math.max(stats.totalUsers, 1)) * 100)}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{stats.totalFoods}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base-content/70">Total Requests</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-base-300 rounded-full h-2">
                      <div 
                        className="bg-warning h-2 rounded-full" 
                        style={{width: `${Math.min(100, (stats.totalRequests / Math.max(stats.totalFoods, 1)) * 100)}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{stats.totalRequests}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base-content/70">Active Sharers</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-base-300 rounded-full h-2">
                      <div 
                        className="bg-info h-2 rounded-full" 
                        style={{width: `${Math.min(100, (stats.totalShares / Math.max(stats.totalUsers, 1)) * 100)}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{stats.totalShares}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <motion.div
          className="card bg-base-100 shadow-lg border border-base-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="card-body">
            <h2 className="card-title text-base-content mb-6">
              <Clock className="w-5 h-5" />
              Your Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'share' ? 'bg-primary' : 
                      activity.type === 'request' ? 'bg-secondary' : 'bg-accent'
                    }`}></div>
                    <div>
                      <p className="font-medium text-base-content">{activity.action}</p>
                      <p className="text-sm text-base-content/60 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'Active' ? 'bg-primary text-primary-content' :
                    activity.status === 'Pending' ? 'bg-warning text-warning-content' :
                    'bg-success text-success-content'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardHome;