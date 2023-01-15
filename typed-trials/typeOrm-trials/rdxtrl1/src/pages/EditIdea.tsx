import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IdeaForm from "../Components/IdeaForm";



const EditIdea = ()=>{

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if (!location.state?.idea?.id){
            console.log("Invalid Request");
            navigate("/")
        }
    }, [location, navigate])

    return <IdeaForm edit={true} initialTitle={location.state.idea.title} initialDescription={location.state.idea.description} ideaId={location.state.idea.id} />
}


export default EditIdea;