import { Link } from "react-router-dom";


const SimpleIdeaLister = ({mytitle, ideas}:{mytitle:string, ideas:any[]}) => {
    return (
        <div className="my-ideas">
            <div className="head">{mytitle}</div>
            <div className="contents">
                {
                    ideas.map((idea: any) => (
                        <Link to={`/idea/${idea.id}`} className="my-idea" key={idea.id}>
                            {idea.title}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default SimpleIdeaLister;