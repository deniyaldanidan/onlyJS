import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import IdeaBar from "../Components/IdeaBar";
import { apiSlice} from "../features/api/apiSlice";
import { fetchAllIdeaType } from "../features/api/apiSliceHelper";
import '../styles/home.scss'



const Home = () => {
    const selectAllIdeasResult = apiSlice.endpoints.getAllIdeas.select();
    const {data:ideas=[], isLoading, isError, isSuccess, error} = useSelector(selectAllIdeasResult);

    const sortedIdeas:fetchAllIdeaType[] = useMemo(()=>{
        const sorted = ideas.slice();
        sorted.sort((a,b)=>b.updated_date.localeCompare(a.updated_date))
        return sorted;
    }, [ideas])

    useEffect(() => {
        // isSuccess && console.log(ideas[0])
        isError && console.log(error)
    }, [ideas, isSuccess, isError, error])

    if(isError){
        return <div className="info-bar danger">Error Happened in Home-Page</div>
    }

    return (
        isLoading ? <div className="info-bar">Fetching Ideas....</div> : (
            ideas?.length ? (
                <div className="home-page">
                    <div className="home-head">All Ideas</div>
                    <div className="ideas-list">
                        {
                            sortedIdeas.map((idea) => <IdeaBar idea={idea} key={idea.id} />)
                        }
                    </div>
                </div>
            ) : (
                <div className="info-bar"> No Ideas Found </div>
            )
        )
    )
}

export default Home;