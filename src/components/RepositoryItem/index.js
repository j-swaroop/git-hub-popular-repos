// Write your code here
import "./index.css"

const RepositoryItem = props => {
    const {details} = props
    const {id, name, avatarUrl, forksCount, starsCount, issuesCount} = details

    return(
        <li className="respos-item-container">
            <img className="avatar" src={avatarUrl} alt={name}/>
            <h1 className="repos-name"> {name} </h1>
            <div className="container">
                <img src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png" 
                    alt="stars" className="star-logo" />
                <p className="stars-count"> {starsCount} stars</p>
            </div> 

            <div className="container">
                <img src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png" 
                    alt="forks" className="star-logo" />
                <p className="stars-count"> {forksCount} forks</p>
            </div> 

            <div className="container">
                <img src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png" 
                    alt="open issues" className="star-logo" />
                <p className="stars-count"> {issuesCount} open issues</p>
            </div> 
        </li>
    )
}

export default RepositoryItem