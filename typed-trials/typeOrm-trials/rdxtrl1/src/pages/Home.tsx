import { useEffect, useMemo } from "react";
import IdeaBar from "../Components/IdeaBar";
import { useGetAllIdeasQuery } from "../features/api/apiSlice";
import { fetchAllIdeaType } from "../features/api/apiSliceHelper";
import '../styles/home.scss'



const Home = () => {
    const { data: ideas = [], isLoading, isSuccess, isError, error, refetch } = useGetAllIdeasQuery();


    const sortedIdeas:fetchAllIdeaType[] = useMemo(()=>{
        const sorted = ideas.slice();
        sorted.sort((a,b)=>b.updated_date.localeCompare(a.updated_date))
        return sorted;
    }, [ideas])

    useEffect(() => {
        // isSuccess && console.log(ideas[0])
        isError && console.log(error)
    }, [ideas, isSuccess, isError, error, refetch])

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