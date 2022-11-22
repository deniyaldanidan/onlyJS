import { useNavigate } from "react-router-dom"
import { H2BTN } from "../styledComponents/Btns";
import Wrapper from "../styledComponents/Wrapper";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
    <Wrapper>
        <h1>UnAuthorized</h1>
        <H2BTN onClick={()=>navigate(-1)}>Go Back</H2BTN>
    </Wrapper>

  )
}

export default Unauthorized