import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { useState } from 'react';

// 销售趋势数据（折线图）
const salesTrendData = [
  { month: '1月', sales: 45000, orders: 120, users: 45 },
  { month: '2月', sales: 52000, orders: 145, users: 58 },
  { month: '3月', sales: 61000, orders: 168, users: 72 },
  { month: '4月', sales: 58000, orders: 152, users: 65 },
  { month: '5月', sales: 69000, orders: 189, users: 85 },
  { month: '6月', sales: 75000, orders: 205, users: 96 },
  { month: '7月', sales: 82000, orders: 225, users: 108 },
  { month: '8月', sales: 78000, orders: 210, users: 102 },
  { month: '9月', sales: 88000, orders: 242, users: 125 },
  { month: '10月', sales: 95000, orders: 268, users: 142 },
  { month: '11月', sales: 102000, orders: 295, users: 158 },
  { month: '12月', sales: 115000, orders: 320, users: 175 },
];

// 产品销售分布数据（柱状图）
const productSalesData = [
  { product: 'iPhone', sales: 285000, quantity: 458 },
  { product: 'MacBook', sales: 425000, quantity: 285 },
  { product: 'iPad', sales: 198000, quantity: 356 },
  { product: 'Watch', sales: 145000, quantity: 512 },
  { product: 'AirPods', sales: 89000, quantity: 645 },
  { product: '配件', sales: 56000, quantity: 892 },
];

// 订单状态分布数据（饼图）
const orderStatusData = [
  { name: '已完成', value: 1245, color: '#4caf50' },
  { name: '处理中', value: 385, color: '#ff9800' },
  { name: '已发货', value: 528, color: '#2196f3' },
  { name: '待支付', value: 156, color: '#f44336' },
  { name: '已取消', value: 89, color: '#9e9e9e' },
];

// 地区销售数据（柱状图）
const regionSalesData = [
  { region: '华东', sales: 185000, growth: 12.5 },
  { region: '华南', sales: 156000, growth: 8.3 },
  { region: '华北', sales: 142000, growth: 15.2 },
  { region: '西南', sales: 98000, growth: 6.8 },
  { region: '东北', sales: 75000, growth: -2.3 },
  { region: '西北', sales: 62000, growth: 4.5 },
];

// 用户增长数据（面积图）
const userGrowthData = [
  { date: '1/1', newUsers: 45, totalUsers: 1245 },
  { date: '1/8', newUsers: 58, totalUsers: 1303 },
  { date: '1/15', newUsers: 72, totalUsers: 1375 },
  { date: '1/22', newUsers: 65, totalUsers: 1440 },
  { date: '1/29', newUsers: 85, totalUsers: 1525 },
  { date: '2/5', newUsers: 96, totalUsers: 1621 },
  { date: '2/12', newUsers: 108, totalUsers: 1729 },
  { date: '2/19', newUsers: 102, totalUsers: 1831 },
];

// 统计卡片数据
const statsCards = [
  {
    title: '总销售额',
    value: '¥1,245,890',
    change: '+12.5%',
    trend: 'up',
    color: '#4caf50',
  },
  {
    title: '总订单数',
    value: '2,403',
    change: '+8.3%',
    trend: 'up',
    color: '#2196f3',
  },
  {
    title: '平均订单额',
    value: '¥518',
    change: '+3.2%',
    trend: 'up',
    color: '#ff9800',
  },
  {
    title: '客户满意度',
    value: '96.5%',
    change: '-1.2%',
    trend: 'down',
    color: '#9c27b0',
  },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('year');

  // 自定义 Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, border: '1px solid #e0e0e0' }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color }}
            >
              {entry.name}: {entry.value.toLocaleString()}
              {entry.dataKey === 'sales' && ' 元'}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Container maxWidth="xl">
      {/* 页面标题和时间筛选 */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600, mb: 1 }}>
            数据分析
          </Typography>
          <Typography variant="body2" color="text.secondary">
            实时业务数据统计与分析
          </Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>时间范围</InputLabel>
          <Select
            value={timeRange}
            label="时间范围"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="week">最近一周</MenuItem>
            <MenuItem value="month">最近一月</MenuItem>
            <MenuItem value="quarter">最近三月</MenuItem>
            <MenuItem value="year">最近一年</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 统计卡片 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" variant="body2" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {card.value}
                </Typography>
                <Chip
                  icon={card.trend === 'up' ? <TrendingUp /> : <TrendingDown />}
                  label={card.change}
                  size="small"
                  color={card.trend === 'up' ? 'success' : 'error'}
                  sx={{ fontWeight: 600 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* 销售趋势 - 折线图 */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              📈 销售趋势分析
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#2196f3"
                  strokeWidth={3}
                  name="销售额"
                  dot={{ fill: '#2196f3', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#4caf50"
                  strokeWidth={3}
                  name="订单数"
                  dot={{ fill: '#4caf50', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* 订单状态分布 - 饼图 */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              🥧 订单状态分布
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 2 }}>
              {orderStatusData.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: item.color,
                      }}
                    />
                    <Typography variant="body2">{item.name}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* 产品销售排行 - 柱状图 */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              📊 产品销售排行
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={productSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="sales" fill="#2196f3" name="销售额" radius={[8, 8, 0, 0]} />
                <Bar dataKey="quantity" fill="#4caf50" name="销量" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* 地区销售对比 - 横向柱状图 */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              🗺️ 地区销售对比
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={regionSalesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" />
                <YAxis dataKey="region" type="category" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="sales" fill="#9c27b0" name="销售额" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                增长率排名：
              </Typography>
              {regionSalesData
                .sort((a, b) => b.growth - a.growth)
                .map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">
                      {index + 1}. {item.region}
                    </Typography>
                    <Chip
                      label={`${item.growth > 0 ? '+' : ''}${item.growth}%`}
                      size="small"
                      color={item.growth > 0 ? 'success' : 'error'}
                    />
                  </Box>
                ))}
            </Box>
          </Paper>
        </Grid>

        {/* 用户增长趋势 - 面积图 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              👥 用户增长趋势
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2196f3" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4caf50" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="newUsers"
                  stroke="#2196f3"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorNew)"
                  name="新增用户"
                />
                <Area
                  type="monotone"
                  dataKey="totalUsers"
                  stroke="#4caf50"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                  name="累计用户"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}