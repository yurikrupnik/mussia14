// import styles from './app.module.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { ReactComponent as Logo } from './logo.svg';
// import star from './star.svg';

export function App() {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography>Gello</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button>Guys</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
