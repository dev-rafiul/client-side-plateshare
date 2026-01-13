import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { motion } from 'framer-motion';
import { Plus, List, FileText, TrendingUp, Users, Utensils } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const quickActions = [
    {
      title: "Add Food",
      description: "Share food with your community",
      icon: Plus,
      link: "/add-food",
      color: "bg-primary text-primary-content"
    },
    {
      title: "Manage Foods",
      description: "View and edit your shared items",
      icon: List,
      link: "/manage-my-foods",
      color: "bg-secondary text-secondary-content"
    },
    {
      title: "My Requests",
      description: "Track your food requests",
      icon: FileText,
      link: "/my-food-request",
      color: "bg-accent text-accent-content"
    }
  ];

  const stats = [
    {
      title: "Foods Shared",
      value: "12",
      icon: Utensils,
      change: "+3 this month",
      color: "text-primary"
    },
    {
      title: "People Helped",
      value: "28",
      icon: Users,
      change: "+8 this month",
      color: "text-secondary"
    },
    {
      title: "Impact Score",
      value: "95",
      icon: TrendingUp,
      change: "+12 this month",
      color: "text-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto space-container py-8">
        {/* Welcome Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-heading-1 mb-2">
            Welcome back, {user?.displayName || 'Friend'}! 👋
          </h1>
          <p className="text-body">
            Here's what's happening with your food sharing activities.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <div key={stat.title} className="card-base p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-base-200 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-success font-medium">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-1">
                {stat.value}
              </h3>
              <p className="text-base-content/60 text-sm">
                {stat.title}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-heading-2 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <NavLink
                key={action.title}
                to={action.link}
                className="card-base p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <h3 className="text-heading-3 mb-2">{action.title}</h3>
                <p className="text-body">{action.description}</p>
              </NavLink>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="card-base p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-heading-2 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                action: "Shared homemade lasagna",
                time: "2 hours ago",
                status: "Active"
              },
              {
                action: "Received request for fresh bread",
                time: "1 day ago",
                status: "Completed"
              },
              {
                action: "Added vegetable soup to sharing",
                time: "3 days ago",
                status: "Completed"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                <div>
                  <p className="font-medium text-base-content">{activity.action}</p>
                  <p className="text-sm text-base-content/60">{activity.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'Active' 
                    ? 'bg-primary text-primary-content' 
                    : 'bg-success text-success-content'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;