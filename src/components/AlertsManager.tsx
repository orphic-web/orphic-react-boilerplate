import { Container } from '@mui/material';
import { useAppSelector } from '../store/Hooks';
import CustomAlert from './CustomAlert';

const AlertMessages: React.FC = () => {
  const alertQueue = useAppSelector((state) => state.alert.queue) as any[];

  return <Container
    sx={{
      width: '100%',
      position: 'fixed',
      bottom: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '10px',
    }}
  >
    {
      alertQueue?.map((alert, key) => <div
        key={key}
        style={{
          minWidth: '325px',
        }}
      >
        <CustomAlert alert={alert} id={alert.id} severity={alert.severity} message={alert.message} />
      </div>)
    }
  </Container>;
};

export default AlertMessages;
