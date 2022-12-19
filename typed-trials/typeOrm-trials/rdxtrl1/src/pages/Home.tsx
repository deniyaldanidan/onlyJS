import { useSelector } from "react-redux";
import IdeaBar from "../Components/IdeaBar";
import { selectIdeas } from "../features/ideas/IdeaSlice";
import '../styles/home.scss'



const Home = () => {
    const ideas = useSelector(selectIdeas);

    return (
        ideas?.length ? (
            <div className="home-page">
                <div className="home-head">All Ideas</div>
                <div className="ideas-list">
                    {
                        ideas.map((idea)=><IdeaBar idea={idea} key={idea.id} />)
                    }
                </div>
            </div>
        ) : (
            <div className="info-bar"> No Ideas Found </div>
        )
    )
}

export default Home;