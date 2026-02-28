import { ReactNode } from 'react';
import { Paper, Stack, SxProps, Theme, Typography } from '@mui/material';

interface AppCardProps {
  children: ReactNode;
  title?: string;
  action?: ReactNode;
  padding?: number;
  sx?: SxProps<Theme>;
}

export default function AppCard({ children, title, action, padding = 3, sx }: AppCardProps) {
  return (
    <Paper elevation={2} sx={{ overflow: 'hidden', ...sx }}>
      <Stack padding={padding} spacing={2}>
        {(title || action) && (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {title && (
              <Typography variant="h6" fontWeight={600}>
                {title}
              </Typography>
            )}
            {action && (
              <Stack direction="row" spacing={1}>
                {action}
              </Stack>
            )}
          </Stack>
        )}
        {children}
      </Stack>
    </Paper>
  );
}
