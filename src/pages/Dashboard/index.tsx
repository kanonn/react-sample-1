import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Box,
} from '@mui/material';
import {
  TrendingUp,
  AttachMoney,
  ShoppingBag,
  Person,
} from '@mui/icons-material';

const dashboardStats = [
  { title: '总销售额', value: '¥245,890', icon: AttachMoney, color: '#4caf50', change: '+12.5%' },
  { title: '新订单', value: '156', icon: ShoppingBag, color: '#2196f3', change: '+8.3%' },
  { title: '新用户', value: '89', icon: Person, color: '#ff9800', change: '+5.2%' },
  { title: '增长率', value: '23.5%', icon: TrendingUp, color: '#9c27b0', change: '+2.1%' },
];

const recentOrders = [
  { id: 'ORD-001', customer: '张三', amount: 1250, status: '已完成', date: '2024-01-15' },
  { id: 'ORD-002', customer: '李四', amount: 890, status: '处理中', date: '2024-01-15' },
  { id: 'ORD-003', customer: '王五', amount: 2340, status: '已发货', date: '2024-01-14' },
  { id: 'ORD-004', customer: '赵六', amount: 560, status: '已完成', date: '2024-01-14' },
  { id: 'ORD-005', customer: '钱七', amount: 1890, status: '待支付', date: '2024-01-13' },
];

const getStatusColor = (status: string): "success" | "warning" | "info" | "error" | "default" => {
  const colors: Record<string, "success" | "warning" | "info" | "error" | "default"> = {
    '已完成': 'success',
    '处理中': 'warning',
    '已发货': 'info',
    '待支付': 'error',
  };
  return colors[status] || 'default';
};

export default function Dashboard() {
  return (
    <Container maxWidth="xl">
      {/* 统计卡片 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {dashboardStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Chip 
                      label={stat.change} 
                      size="small" 
                      color="success"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>
                    <stat.icon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 最近订单 */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 2 }}>
          最近订单
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>订单号</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>客户</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>金额</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>状态</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>日期</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>¥{order.amount}</TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status} 
                      size="small" 
                      color={getStatusColor(order.status)}
                    />
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}