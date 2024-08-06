import { useParams } from 'react-router-dom';

const EditInzerat = () => {
  const { id } = useParams();
  return <div>EditInzerat{id}</div>;
};

export default EditInzerat;
