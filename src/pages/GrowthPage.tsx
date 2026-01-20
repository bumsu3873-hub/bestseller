import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { TrendingUp, Zap, ArrowUp } from 'lucide-react';
import { products, getStats } from '../data/products';

const GROWTH_COLORS = {
  high: '#10b981',
  medium: '#f59e0b',
  low: '#64748b',
};

export default function GrowthPage() {
  const stats = useMemo(() => getStats(), []);

  const productsByGrowth = useMemo(() =>
    [...products].sort((a, b) => b.growthRate - a.growthRate),
  []);

  const topGrowthProducts = productsByGrowth.slice(0, 10);

  const growthDistribution = useMemo(() => {
    const high = products.filter(p => p.growthRate >= 50).length;
    const medium = products.filter(p => p.growthRate >= 30 && p.growthRate < 50).length;
    const low = products.filter(p => p.growthRate < 30).length;
    return [
      { name: '고성장 (50%+)', value: high, color: GROWTH_COLORS.high },
      { name: '중성장 (30-50%)', value: medium, color: GROWTH_COLORS.medium },
      { name: '저성장 (<30%)', value: low, color: GROWTH_COLORS.low },
    ];
  }, []);

  const getGrowthColor = (rate: number) => {
    if (rate >= 50) return GROWTH_COLORS.high;
    if (rate >= 30) return GROWTH_COLORS.medium;
    return GROWTH_COLORS.low;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">성장률 분석</h1>
        <p className="text-slate-500">제품별 성장률 데이터를 분석하세요</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-1">평균 성장률</p>
          <p className="text-2xl font-bold text-slate-900">{stats.avgGrowthRate.toFixed(1)}%</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-1">최고 성장률</p>
          <p className="text-2xl font-bold text-slate-900">{stats.fastestGrowing.growthRate.toFixed(1)}%</p>
          <p className="text-xs text-slate-400 mt-1">{stats.fastestGrowing.name}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <ArrowUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-1">고성장 제품 수</p>
          <p className="text-2xl font-bold text-slate-900">{growthDistribution[0].value}개</p>
          <p className="text-xs text-slate-400 mt-1">50% 이상 성장</p>
        </div>
      </div>

      {/* Growth Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {growthDistribution.map((item) => (
          <div key={item.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
              <h4 className="font-medium text-slate-700">{item.name}</h4>
            </div>
            <p className="text-3xl font-bold text-slate-900">{item.value}개</p>
            <p className="text-sm text-slate-500 mt-1">
              전체의 {((item.value / products.length) * 100).toFixed(0)}%
            </p>
          </div>
        ))}
      </div>

      {/* Top Growth Products Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <ArrowUp className="w-5 h-5 text-emerald-500" />
          성장률 Top 10 제품
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topGrowthProducts} layout="vertical" margin={{ left: 100, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
              <YAxis dataKey="name" type="category" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={95} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`${Number(value).toFixed(1)}%`, '성장률']}
              />
              <Bar dataKey="growthRate" name="성장률" radius={[0, 6, 6, 0]}>
                {topGrowthProducts.map((entry) => (
                  <Cell key={entry.id} fill={getGrowthColor(entry.growthRate)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">전체 제품 성장률 현황</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">순위</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">제품명</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">카테고리</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600">성장률</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">상태</th>
              </tr>
            </thead>
            <tbody>
              {productsByGrowth.map((product, index) => (
                <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index < 3 ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-slate-800">{product.name}</p>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{product.category}</td>
                  <td className="py-4 px-6 text-right">
                    <span className="flex items-center justify-end gap-1 font-bold" style={{ color: getGrowthColor(product.growthRate) }}>
                      <ArrowUp className="w-4 h-4" />
                      {product.growthRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: getGrowthColor(product.growthRate) + '20',
                          color: getGrowthColor(product.growthRate)
                        }}
                      >
                        {product.growthRate >= 50 ? '고성장' : product.growthRate >= 30 ? '중성장' : '저성장'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
