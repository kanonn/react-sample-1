import { Container, Paper, Typography } from '@mui/material';

export default function Orders() {
  return (
    <Container maxWidth="xl">
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          订单管理
        </Typography>
        <Typography color="text.secondary">
          这个页面的内容待开发...
        </Typography>
      </Paper>
    </Container>
  );
}