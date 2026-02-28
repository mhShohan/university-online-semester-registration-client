import { ReactNode } from 'react';
import { Divider, Stack, Typography } from '@mui/material';

interface PageSectionProps {
  title: string;
  children: ReactNode;
  withDivider?: boolean;
}

export default function PageSection({ title, children, withDivider = true }: PageSectionProps) {
  return (
    <Stack spacing={2}>
      {withDivider && <Divider />}
      <Typography variant="h5" textAlign="center" fontWeight={600}>
        {title}
      </Typography>
      {withDivider && <Divider />}
      {children}
    </Stack>
  );
}
