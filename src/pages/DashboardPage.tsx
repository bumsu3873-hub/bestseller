import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Line
} from 'recharts';
import {
  Trophy, TrendingUp, Package, Star, ShoppingCart, Zap,
  ArrowUp, Filter, Award
} from 'lucide-react';
import { products, dailyTrends, getCategoryData, getStats } from '../data/products';

const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'];
const CATEGORY_COLORS: Record<string, string> = {
  '스킨케어': '#3b82f6',
  '메이크업': '#ec4899',
  '선케어': '#f59e0b',
  '클렌징': '#10b981',
  '마스크팩': '#8b5cf6',
};

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'salesQty' | 'revenue' | 'growthRate'>('salesQty');

  const stats = useMemo(() => getStats(), []);
  const categoryData = useMemo(() => getCategoryData(), []);

  const top10Products = useMemo(() => {
    return [...products].sort((a, b) => b.salesQty - a.salesQty).slice(0, 10);
  }, []);

  const categories = useMemo(() => {
    return ['ALL', ...new Set(products.map(p => p.category))];
  }, []);

  const formatNumber = (num: number) => num.toLocaleString('ko-KR');
  const formatCurrency = (num: number) => {
    if (num >= 100000000) return `${(num / 100000000).toFixed(1)}억`;
    if (num >= 10000) return `${(num / 10000).toFixed(0)}만`;
    return formatNumber(num);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">대시보드</h1>
          <p className="text-slate-500">2025 신제품 베스트셀러 현황</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
            <Filter className="w-4 h-4 text-slate-400 ml-2" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent border-none text-sm font-medium text-slate-700 focus:ring-0 pr-8"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'ALL' ? '전체 카테고리' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4" />
              +23.5%
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-1">총 판매량</p>
          <p className="text-2xl font-bold text-slate-900">{formatNumber(stats.totalSales)}개</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4" />
              +31.2%
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-1">총 매출액</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalRevenue)}원</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
            <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4" />
              High
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-1">평균 성장률</p>
          <p className="text-2xl font-bold text-slate-900">{stats.avgGrowthRate.toFixed(1)}%</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-rose-600" />
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={`w-3 h-3 ${i <= Math.round(stats.avgRating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-1">평균 평점</p>
          <p className="text-2xl font-bold text-slate-900">{stats.avgRating.toFixed(1)} / 5.0</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              Top 10 베스트셀러
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-purple-500"
            >
              <option value="salesQty">판매량순</option>
              <option value="revenue">매출순</option>
              <option value="growthRate">성장률순</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10Products} layout="vertical" margin={{ left: 100, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={95} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [formatNumber(Number(value)), '판매량']}
                />
                <Bar dataKey="salesQty" name="판매량" fill="url(#colorGradient)" radius={[0, 6, 6, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
            <Package className="w-5 h-5 text-purple-500" />
            카테고리별 매출
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="revenue"
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                  nameKey="category"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [formatCurrency(Number(value)) + '원', '매출']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.map(cat => (
              <div key={cat.category} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cat.category] || '#6366f1' }} />
                <span className="text-slate-600 truncate">{cat.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-purple-500" />
          일별 판매 트렌드 (최근 30일)
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                formatter={(value, name) => [
                  name === 'totalSales' ? formatNumber(Number(value)) + '개' : formatCurrency(Number(value)) + '원',
                  name === 'totalSales' ? '판매량' : '매출'
                ]}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Area yAxisId="left" type="monotone" dataKey="totalSales" name="판매량" stroke="#8b5cf6" strokeWidth={2} fill="url(#salesGradient)" />
              <Line yAxisId="right" type="monotone" dataKey="totalRevenue" name="매출" stroke="#ec4899" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6" />
            <h3 className="text-lg font-bold">Best Seller</h3>
          </div>
          <p className="text-3xl font-bold mb-2">{stats.topProduct.name}</p>
          <p className="text-purple-100 mb-4">{stats.topProduct.category}</p>
          <div className="flex gap-6">
            <div>
              <p className="text-purple-200 text-sm">판매량</p>
              <p className="text-xl font-bold">{formatNumber(stats.topProduct.salesQty)}개</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm">매출</p>
              <p className="text-xl font-bold">{formatCurrency(stats.topProduct.revenue)}원</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-6 h-6" />
            <h3 className="text-lg font-bold">Fastest Growing</h3>
          </div>
          <p className="text-3xl font-bold mb-2">{stats.fastestGrowing.name}</p>
          <p className="text-amber-100 mb-4">{stats.fastestGrowing.category}</p>
          <div className="flex gap-6">
            <div>
              <p className="text-amber-200 text-sm">성장률</p>
              <p className="text-xl font-bold">+{stats.fastestGrowing.growthRate.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-amber-200 text-sm">평점</p>
              <p className="text-xl font-bold">{stats.fastestGrowing.rating} / 5.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
