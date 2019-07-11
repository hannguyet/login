import { notification } from 'antd';

const { error, success } = notification;

export const showErrorMessage = ({
  title = 'Error',
  description = 'Server Internal Error'
}) => {
  error({
    message: title,
    description
  });
};

export const showSuccessMessage = ({ title = 'Success', description = '' }) => {
  success({
    message: title,
    description
  });
};
