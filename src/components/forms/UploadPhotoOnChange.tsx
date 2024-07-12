// mui
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material/styles';
import { toast } from 'sonner';
import uploadFileToCloudinary from '../../lib/uploadFileToCloudinary';
import { useUpdateStudentProfileMutation } from '../../store/features/student/student.api';

type TProps = {
  name: string;
  studentId: string;
  label?: string;
  sx?: SxProps;
};

export default function UploadPhotoOnChange({ studentId, name, label, sx }: TProps) {
  const [updateProfilePicture] = useUpdateStudentProfileMutation();
  const onChange = async (file: File | undefined) => {
    const toastId = toast.loading('Uploading picture...');

    try {
      if (!file) {
        toast.error('No file selected', { id: toastId });
        return;
      }
      // upload file here
      const profilePicUrl = await uploadFileToCloudinary(file);

      if (profilePicUrl) {
        const res = await updateProfilePicture({
          id: studentId,
          payload: { avatar: profilePicUrl }
        }).unwrap();
        if (res) {
          toast.success('Picture uploaded successfully', { id: toastId });
        } else {
          toast.error('Failed to upload picture', { id: toastId });
        }
      } else {
        toast.error('Failed to upload picture', { id: toastId });
      }
    } catch (error) {
      toast.error('Error in uploading picture', { id: toastId });
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{ ...sx }}
    >
      {label || 'Upload file'}
      <Input
        type={name}
        onChange={(e) => onChange((e?.target as HTMLInputElement).files?.[0])}
        style={{ display: 'none' }}
      />
    </Button>
  );
}
