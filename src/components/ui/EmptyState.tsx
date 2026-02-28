import { ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

interface EmptyStateProps {
  message: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export default function EmptyState({ message, action, icon }: EmptyStateProps) {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ py: 6, px: 2 }}>
      {icon ?? <InboxOutlinedIcon sx={{ fontSize: 64, color: 'text.disabled' }} />}
      <Typography variant="h6" color="text.secondary" textAlign="center">
        {message}
      </Typography>
      {action && <Stack>{action}</Stack>}
    </Stack>
  );
}
