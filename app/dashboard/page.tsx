import { mockStats, mockBills } from '@/lib/mockData';
import { formatCurrency, formatDate, getCategoryIcon, getUrgencyColor } from '@/lib/utils';
import { FiTrendingUp, FiUsers, FiCheckCircle, FiDollarSign, FiClock, FiHeart } from 'react-icons/fi';

export default function DashboardPage() {
  const recentActivity = mockBills.slice(0, 5);
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Platform Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Real-time insights into our community&apos;s impact
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <FiDollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-green-600">+12.5%</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(mockStats.totalAmount)}
              </div>
              <div className="text-sm text-gray-600">Total Amount Paid</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-blue-600">+8.2%</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {mockStats.totalPaid.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Bills Paid</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-purple-600">+15.3%</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {mockStats.activeUsers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-orange-600">Excellent</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {mockStats.verificationRate}%
              </div>
              <div className="text-sm text-gray-600">Verification Rate</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Bills by Category</h3>
            <div className="space-y-4">
              {[
                { category: 'medical', count: 432, percentage: 35 },
                { category: 'education', count: 287, percentage: 23 },
                { category: 'housing', count: 249, percentage: 20 },
                { category: 'utilities', count: 162, percentage: 13 },
                { category: 'debt', count: 117, percentage: 9 },
              ].map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getCategoryIcon(item.category)}</span>
                      <span className="font-semibold capitalize">{item.category}</span>
                    </div>
                    <span className="text-gray-600">{item.count} bills</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((bill) => (
                <div key={bill.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {bill.userName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {bill.userName}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getUrgencyColor(bill.urgency)}`}>
                        {bill.urgency}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{bill.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">{formatDate(bill.createdAt)}</span>
                      <span className="text-xs font-semibold text-purple-600">
                        {formatCurrency(bill.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Community Impact</h2>
            <p className="text-purple-100">Together, we&apos;re changing lives</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">2,450</div>
              <div className="text-purple-100">Lives Changed</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">18 hrs</div>
              <div className="text-purple-100">Avg. Time to Help</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">98.2%</div>
              <div className="text-purple-100">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Contributors This Month</h3>
          <div className="space-y-4">
            {[
              { name: 'Anonymous Benefactor', amount: 125000, bills: 15 },
              { name: 'Sarah M.', amount: 85000, bills: 12 },
              { name: 'Tech Corp Foundation', amount: 72000, bills: 8 },
              { name: 'John D.', amount: 45000, bills: 18 },
              { name: 'Community Fund', amount: 38000, bills: 22 },
            ].map((contributor, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                  index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                  'bg-gradient-to-br from-purple-400 to-pink-400'
                }`}>
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{contributor.name}</h4>
                  <p className="text-sm text-gray-600">{contributor.bills} bills paid</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{formatCurrency(contributor.amount)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
