import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';

interface BoxProps extends MuiBoxProps {
  display?: 'flex';
  content?: 'flex-start' | 'center' | 'flex-end';
  items?: 'flex-start' | 'center' | 'flex-end';
  direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
}

const Box = ({ sx, display, content, items, direction, children, ...props }: BoxProps) => {
  const styles: Record<string, unknown> = {
    justifyContent: content,
    alignItems: items,
    flexDirection: direction
  };

  if (display) {
    styles.display = 'flex';
  }

  return (
    <MuiBox sx={{ ...styles, ...sx }} {...props}>
      {children}
    </MuiBox>
  );
};

export default Box;
