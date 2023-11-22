import Card from 'react-bootstrap/Card';
// Importing the useSelector and useDispatch functions to select the required
// slices of state.
import { useSelector} from "react-redux";

const InfoCard = () => {
   let ateMode = useSelector((state) => state.ate.dutAteModeStatus);     
  return (
    <Card bg='dark'  text='light' style={{ width: '18rem' }}>
      <Card.Header style={{color:"orange"}} >DUT INFO</Card.Header>
      <Card.Body>
        <Card.Text >
            ATE Mode Status: {ateMode?"ON":"OFF"}
        </Card.Text>
         <Card.Text>
            Serial Connection:
        </Card.Text>
      </Card.Body>
    </Card>
  );
}


export default InfoCard;
