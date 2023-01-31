import { Button } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import c from "./style.module.scss";

const BackButton: React.FC<{ className?: string }> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate('/')} className={`${c.button} ${className}`}>
      &lt; Back
    </Button>
  );
};
export default BackButton;
