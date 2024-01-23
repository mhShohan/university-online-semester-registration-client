import Swal, { SweetAlertOptions } from 'sweetalert2';

type TProps = {
  icon?: string;
  title?: string;
  text?: string;
};

const toastMessage = (props: TProps) => {
  Swal.fire(props as SweetAlertOptions);
};

export default toastMessage;
