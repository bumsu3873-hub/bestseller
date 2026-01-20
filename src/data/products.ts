// 신제품 베스트셀러 샘플 데이터

export interface Product {
  id: string;
  name: string;
  category: string;
  launchDate: string;
  price: number;
  salesQty: number;
  revenue: number;
  growthRate: number;
  rating: number;
  stock: number;
}

export interface DailyTrend {
  date: string;
  totalSales: number;
  totalRevenue: number;
}

export interface CategoryData {
  category: string;
  salesQty: number;
  revenue: number;
  productCount: number;
  [key: string]: string | number;
}

// 신제품 목록 (2025년 출시)
export const products: Product[] = [
  { id: 'NP001', name: '글로우 세럼 2.0', category: '스킨케어', launchDate: '2025-01-15', price: 58000, salesQty: 15420, revenue: 894360000, growthRate: 45.2, rating: 4.8, stock: 2500 },
  { id: 'NP002', name: '비타민C 앰플', category: '스킨케어', launchDate: '2025-02-01', price: 42000, salesQty: 12800, revenue: 537600000, growthRate: 38.5, rating: 4.7, stock: 1800 },
  { id: 'NP003', name: '매트 립스틱 컬렉션', category: '메이크업', launchDate: '2025-01-20', price: 28000, salesQty: 18500, revenue: 518000000, growthRate: 52.3, rating: 4.9, stock: 3200 },
  { id: 'NP004', name: '수분크림 리치', category: '스킨케어', launchDate: '2025-02-10', price: 65000, salesQty: 9800, revenue: 637000000, growthRate: 28.7, rating: 4.6, stock: 1500 },
  { id: 'NP005', name: '클린 선크림 SPF50+', category: '선케어', launchDate: '2025-03-01', price: 32000, salesQty: 22100, revenue: 707200000, growthRate: 65.8, rating: 4.8, stock: 4500 },
  { id: 'NP006', name: '볼륨 마스카라', category: '메이크업', launchDate: '2025-01-25', price: 24000, salesQty: 14200, revenue: 340800000, growthRate: 41.2, rating: 4.5, stock: 2800 },
  { id: 'NP007', name: '딥클렌징 오일', category: '클렌징', launchDate: '2025-02-15', price: 35000, salesQty: 11500, revenue: 402500000, growthRate: 33.4, rating: 4.7, stock: 2100 },
  { id: 'NP008', name: '히알루론산 토너', category: '스킨케어', launchDate: '2025-03-10', price: 38000, salesQty: 16800, revenue: 638400000, growthRate: 48.9, rating: 4.8, stock: 3000 },
  { id: 'NP009', name: '컬러 컨실러 팔레트', category: '메이크업', launchDate: '2025-02-20', price: 45000, salesQty: 8900, revenue: 400500000, growthRate: 25.6, rating: 4.4, stock: 1200 },
  { id: 'NP010', name: '모공 프라이머', category: '메이크업', launchDate: '2025-01-30', price: 29000, salesQty: 13600, revenue: 394400000, growthRate: 39.8, rating: 4.6, stock: 2400 },
  { id: 'NP011', name: '레티놀 나이트크림', category: '스킨케어', launchDate: '2025-03-05', price: 72000, salesQty: 7200, revenue: 518400000, growthRate: 22.1, rating: 4.7, stock: 900 },
  { id: 'NP012', name: '글리터 아이섀도우', category: '메이크업', launchDate: '2025-02-25', price: 22000, salesQty: 19800, revenue: 435600000, growthRate: 58.4, rating: 4.8, stock: 3800 },
  { id: 'NP013', name: '시카 진정 마스크', category: '마스크팩', launchDate: '2025-01-10', price: 3500, salesQty: 85000, revenue: 297500000, growthRate: 72.3, rating: 4.9, stock: 15000 },
  { id: 'NP014', name: 'AHA/BHA 토닝패드', category: '스킨케어', launchDate: '2025-03-15', price: 28000, salesQty: 14500, revenue: 406000000, growthRate: 44.7, rating: 4.6, stock: 2600 },
  { id: 'NP015', name: '듀이 쿠션 파운데이션', category: '메이크업', launchDate: '2025-02-05', price: 48000, salesQty: 11200, revenue: 537600000, growthRate: 35.2, rating: 4.7, stock: 1900 },
  { id: 'NP016', name: '티트리 스팟 젤', category: '스킨케어', launchDate: '2025-01-05', price: 18000, salesQty: 21500, revenue: 387000000, growthRate: 61.8, rating: 4.8, stock: 4200 },
  { id: 'NP017', name: '립 앤 치크 틴트', category: '메이크업', launchDate: '2025-03-20', price: 19000, salesQty: 17800, revenue: 338200000, growthRate: 55.3, rating: 4.7, stock: 3500 },
  { id: 'NP018', name: '펩타이드 아이크림', category: '스킨케어', launchDate: '2025-02-28', price: 55000, salesQty: 6800, revenue: 374000000, growthRate: 19.4, rating: 4.5, stock: 800 },
  { id: 'NP019', name: '클렌징 폼 약산성', category: '클렌징', launchDate: '2025-01-18', price: 15000, salesQty: 28500, revenue: 427500000, growthRate: 68.9, rating: 4.9, stock: 5500 },
  { id: 'NP020', name: '세팅 스프레이', category: '메이크업', launchDate: '2025-03-25', price: 26000, salesQty: 10500, revenue: 273000000, growthRate: 31.2, rating: 4.6, stock: 1700 },
];

// 일별 트렌드 데이터 (최근 30일)
export const dailyTrends: DailyTrend[] = [
  { date: '11/30', totalSales: 8500, totalRevenue: 285000000 },
  { date: '12/01', totalSales: 9200, totalRevenue: 312000000 },
  { date: '12/02', totalSales: 8800, totalRevenue: 298000000 },
  { date: '12/03', totalSales: 10500, totalRevenue: 356000000 },
  { date: '12/04', totalSales: 11200, totalRevenue: 378000000 },
  { date: '12/05', totalSales: 12800, totalRevenue: 425000000 },
  { date: '12/06', totalSales: 14500, totalRevenue: 489000000 },
  { date: '12/07', totalSales: 13200, totalRevenue: 445000000 },
  { date: '12/08', totalSales: 11800, totalRevenue: 398000000 },
  { date: '12/09', totalSales: 10200, totalRevenue: 345000000 },
  { date: '12/10', totalSales: 9800, totalRevenue: 332000000 },
  { date: '12/11', totalSales: 10500, totalRevenue: 355000000 },
  { date: '12/12', totalSales: 11800, totalRevenue: 398000000 },
  { date: '12/13', totalSales: 13500, totalRevenue: 456000000 },
  { date: '12/14', totalSales: 15200, totalRevenue: 512000000 },
  { date: '12/15', totalSales: 14800, totalRevenue: 498000000 },
  { date: '12/16', totalSales: 12500, totalRevenue: 422000000 },
  { date: '12/17', totalSales: 11200, totalRevenue: 378000000 },
  { date: '12/18', totalSales: 10800, totalRevenue: 365000000 },
  { date: '12/19', totalSales: 11500, totalRevenue: 388000000 },
  { date: '12/20', totalSales: 13200, totalRevenue: 445000000 },
  { date: '12/21', totalSales: 15800, totalRevenue: 532000000 },
  { date: '12/22', totalSales: 18500, totalRevenue: 625000000 },
  { date: '12/23', totalSales: 21200, totalRevenue: 715000000 },
  { date: '12/24', totalSales: 24500, totalRevenue: 825000000 },
  { date: '12/25', totalSales: 19800, totalRevenue: 668000000 },
  { date: '12/26', totalSales: 16500, totalRevenue: 556000000 },
  { date: '12/27', totalSales: 14200, totalRevenue: 478000000 },
  { date: '12/28', totalSales: 13500, totalRevenue: 455000000 },
  { date: '12/29', totalSales: 12800, totalRevenue: 432000000 },
];

// 카테고리별 집계
export const getCategoryData = (): CategoryData[] => {
  const categoryMap = new Map<string, CategoryData>();

  products.forEach(product => {
    const existing = categoryMap.get(product.category);
    if (existing) {
      existing.salesQty += product.salesQty;
      existing.revenue += product.revenue;
      existing.productCount += 1;
    } else {
      categoryMap.set(product.category, {
        category: product.category,
        salesQty: product.salesQty,
        revenue: product.revenue,
        productCount: 1,
      });
    }
  });

  return Array.from(categoryMap.values()).sort((a, b) => b.revenue - a.revenue);
};

// 통계 계산
export const getStats = () => {
  const totalSales = products.reduce((sum, p) => sum + p.salesQty, 0);
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const avgGrowthRate = products.reduce((sum, p) => sum + p.growthRate, 0) / products.length;
  const avgRating = products.reduce((sum, p) => sum + p.rating, 0) / products.length;
  const topProduct = [...products].sort((a, b) => b.salesQty - a.salesQty)[0];
  const fastestGrowing = [...products].sort((a, b) => b.growthRate - a.growthRate)[0];

  return {
    totalSales,
    totalRevenue,
    avgGrowthRate,
    avgRating,
    topProduct,
    fastestGrowing,
    productCount: products.length,
  };
};
