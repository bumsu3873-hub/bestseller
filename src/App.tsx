import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Line
} from 'recharts';
import {
  Trophy, TrendingUp, Package, Star, ShoppingCart, Zap,
  ArrowUp, Calendar, Filter, Award
} from 'lucide-react';
import { products, dailyTrends, getCategoryData, getStats } from './data/products';

// 색상 팔레트
const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'];
const CATEGORY_COLORS: Record<string, string> = {
  '스킨케어': '#3b82f6',
  '메이크업': '#ec4899',
  '선케어': '#f59e0b',
  '클렌징': '#10b981',
  '마스크팩': '#8b5cf6',
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'salesQty' | 'revenue' | 'growthRate'>('salesQty');

  const stats = useMemo(() => getStats(), []);
  const categoryData = useMemo(() => getCategoryData(), []);

  // 필터링 및 정렬된 제품 목록
  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === 'ALL'
      ? [...products]
      : products.filter(p => p.category === selectedCategory);

    return filtered.sort((a, b) => b[sortBy] - a[sortBy]);
  }, [selectedCategory, sortBy]);

  // Top 10 제품 (차트용)
  const top10Products = useMemo(() => {
    return [...products].sort((a, b) => b.salesQty - a.salesQty).slice(0, 10);
  }, []);

  // 카테고리 목록
  const categories = useMemo(() => {
    return ['ALL', ...new Set(products.map(p => p.category))];
  }, []);

  // 숫자 포맷
  const formatNumber = (num: number) => num.toLocaleString('ko-KR');
  const formatCurrency = (num: number) => {
    if (num >= 100000000) return `${(num / 100000000).toFixed(1)}억`;
    if (num >= 10000) return `${(num / 10000).toFixed(0)}만`;
    return formatNumber(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">New Product Bestseller</h1>
                <p className="text-xs text-slate-500">2025 신제품 베스트셀러 대시보드</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Category Filter */}
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

              {/* Date Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                <Calendar className="w-4 h-4" />
                2025.12
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Sales */}
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

          {/* Total Revenue */}
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

          {/* Avg Growth Rate */}
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

          {/* Avg Rating */}
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
          {/* Top 10 Products Bar Chart */}
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

          {/* Category Pie Chart */}
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
            {/* Category Legend */}
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

        {/* Product Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-500" />
              신제품 상세 목록
              <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                {filteredProducts.length}개
              </span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">순위</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">제품명</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">카테고리</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600">가격</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600">판매량</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600">매출</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600">성장률</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">평점</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-purple-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index < 3 ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-slate-800">{product.name}</p>
                      <p className="text-xs text-slate-400">{product.id}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: (CATEGORY_COLORS[product.category] || '#6366f1') + '20',
                          color: CATEGORY_COLORS[product.category] || '#6366f1'
                        }}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-slate-600">{formatNumber(product.price)}원</td>
                    <td className="py-4 px-6 text-right font-semibold text-slate-800">{formatNumber(product.salesQty)}개</td>
                    <td className="py-4 px-6 text-right font-semibold text-slate-800">{formatCurrency(product.revenue)}원</td>
                    <td className="py-4 px-6 text-right">
                      <span className={`flex items-center justify-end gap-1 font-medium ${product.growthRate >= 50 ? 'text-emerald-600' : product.growthRate >= 30 ? 'text-amber-600' : 'text-slate-600'}`}>
                        <ArrowUp className="w-4 h-4" />
                        {product.growthRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-medium text-slate-700">{product.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Top Product */}
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

          {/* Fastest Growing */}
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
      </main>
    </div>
  );
}

export default App;
