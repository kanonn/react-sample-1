import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  Box,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import {
  Visibility,
  Edit,
  Delete,
  Add,
  Search,
  FilterList,
} from '@mui/icons-material';

// 模拟订单数据
const mockOrders = [
  { id: 'ORD-001', customer: '张三', product: 'iPhone 15 Pro', amount: 8999, status: '已完成', date: '2024-01-15', phone: '138****1234' },
  { id: 'ORD-002', customer: '李四', product: 'MacBook Pro', amount: 15999, status: '处理中', date: '2024-01-15', phone: '139****5678' },
  { id: 'ORD-003', customer: '王五', product: 'AirPods Pro', amount: 1999, status: '已发货', date: '2024-01-14', phone: '136****9012' },
  { id: 'ORD-004', customer: '赵六', product: 'iPad Air', amount: 4799, status: '已完成', date: '2024-01-14', phone: '137****3456' },
  { id: 'ORD-005', customer: '钱七', product: 'Apple Watch', amount: 3199, status: '待支付', date: '2024-01-13', phone: '135****7890' },
  { id: 'ORD-006', customer: '孙八', product: 'Magic Keyboard', amount: 2399, status: '已完成', date: '2024-01-13', phone: '133****2345' },
  { id: 'ORD-007', customer: '周九', product: 'AirTag 4件装', amount: 799, status: '已发货', date: '2024-01-12', phone: '158****6789' },
  { id: 'ORD-008', customer: '吴十', product: 'HomePod mini', amount: 749, status: '处理中', date: '2024-01-12', phone: '188****0123' },
  { id: 'ORD-009', customer: '郑十一', product: 'iPhone 15', amount: 5999, status: '已完成', date: '2024-01-11', phone: '166****4567' },
  { id: 'ORD-010', customer: '王十二', product: 'iPad Pro', amount: 6799, status: '待支付', date: '2024-01-11', phone: '177****8901' },
  { id: 'ORD-011', customer: '陈十三', product: 'Mac mini', amount: 4299, status: '已完成', date: '2024-01-10', phone: '155****2345' },
  { id: 'ORD-012', customer: '林十四', product: 'Studio Display', amount: 11499, status: '已发货', date: '2024-01-10', phone: '199****6789' },
];

type OrderStatus = '全部' | '已完成' | '处理中' | '已发货' | '待支付';

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: string;
  date: string;
  phone: string;
}

const getStatusColor = (status: string): "success" | "warning" | "info" | "error" | "default" => {
  const colors: Record<string, "success" | "warning" | "info" | "error" | "default"> = {
    '已完成': 'success',
    '处理中': 'warning',
    '已发货': 'info',
    '待支付': 'error',
  };
  return colors[status] || 'default';
};

export default function Orders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('全部');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // 筛选订单
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchText.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      order.product.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === '全部' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // 分页
  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setDetailDialogOpen(true);
  };

  const handleDelete = (order: Order) => {
    setSelectedOrder(order);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log('删除订单:', selectedOrder?.id);
    setDeleteDialogOpen(false);
    setSelectedOrder(null);
    // 这里应该调用 API 删除订单
  };

  return (
    <Container maxWidth="xl">
      <Paper sx={{ p: 3 }}>
        {/* 标题和操作栏 */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" component="div" sx={{ fontWeight: 600, mb: 1 }}>
              订单管理
            </Typography>
            <Typography variant="body2" color="text.secondary">
              共 {filteredOrders.length} 条订单记录
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ textTransform: 'none' }}
          >
            新建订单
          </Button>
        </Box>

        {/* 搜索和筛选栏 */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
          <TextField
            placeholder="搜索订单号、客户、产品..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            size="small"
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>订单状态</InputLabel>
            <Select
              value={statusFilter}
              label="订单状态"
              onChange={(e) => setStatusFilter(e.target.value as OrderStatus)}
              startAdornment={<FilterList sx={{ ml: 1, mr: -0.5, color: 'text.secondary' }} />}
            >
              <MenuItem value="全部">全部状态</MenuItem>
              <MenuItem value="已完成">已完成</MenuItem>
              <MenuItem value="处理中">处理中</MenuItem>
              <MenuItem value="已发货">已发货</MenuItem>
              <MenuItem value="待支付">待支付</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* 订单表格 */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>订单号</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>客户</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>产品</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>金额</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>状态</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>日期</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ¥{order.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={order.status} 
                        size="small" 
                        color={getStatusColor(order.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {order.date}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        <Tooltip title="查看详情">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleViewDetail(order)}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="编辑">
                          <IconButton size="small" color="info">
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="删除">
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDelete(order)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">
                      没有找到匹配的订单
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 分页 */}
        <TablePagination
          component="div"
          count={filteredOrders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="每页显示："
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} 共 ${count} 条`}
        />
      </Paper>

      {/* 订单详情对话框 */}
      <Dialog 
        open={detailDialogOpen} 
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" component="div">
            订单详情
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  订单号
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {selectedOrder.id}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  客户姓名
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">
                  {selectedOrder.customer}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  联系电话
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">
                  {selectedOrder.phone}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  产品名称
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">
                  {selectedOrder.product}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  订单金额
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  ¥{selectedOrder.amount.toLocaleString()}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  订单状态
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Chip 
                  label={selectedOrder.status} 
                  size="small" 
                  color={getStatusColor(selectedOrder.status)}
                />
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  下单时间
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">
                  {selectedOrder.date}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>
            关闭
          </Button>
          <Button variant="contained" onClick={() => setDetailDialogOpen(false)}>
            编辑订单
          </Button>
        </DialogActions>
      </Dialog>

      {/* 删除确认对话框 */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <Typography>
            确定要删除订单 <strong>{selectedOrder?.id}</strong> 吗？
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            此操作不可恢复。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            取消
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={confirmDelete}
          >
            确认删除
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}