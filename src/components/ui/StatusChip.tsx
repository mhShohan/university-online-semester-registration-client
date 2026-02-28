import { Chip } from '@mui/material';

type StatusVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

interface StatusChipProps {
  label: string;
  status?: StatusVariant;
  size?: 'small' | 'medium';
}

const statusMap: Record<string, StatusVariant> = {
  ongoing: 'success',
  active: 'success',
  approved: 'success',
  success: 'success',
  rejected: 'error',
  error: 'error',
  declined: 'error',
  pending: 'warning',
  payment_pending: 'warning',
  warning: 'warning',
  info: 'info'
};

function getVariant(label: string, status?: StatusVariant): StatusVariant {
  if (status) return status;
  const lower = String(label).toLowerCase().replace(/\s+/g, '_');
  return statusMap[lower] ?? 'default';
}

export default function StatusChip({ label, status, size = 'small' }: StatusChipProps) {
  const variant = getVariant(label, status);
  const color = variant === 'default' ? undefined : variant;
  return (
    <Chip
      label={label}
      color={color}
      size={size}
      sx={{
        fontWeight: 600,
        textTransform: 'capitalize',
        height: size === 'small' ? 28 : undefined
      }}
    />
  );
}
