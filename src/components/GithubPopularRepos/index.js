import {Component} from "react"
import Loader from 'react-loader-spinner'
import LanguageFilterItem from "../LanguageFilterItem"
import RepositoryItem from "../RepositoryItem"
import "./index.css"

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const fetchConstants = {
  loader: "LOADER",
  success: "SUCCESS",
  failure: "FAILURE"

}

class GithubPopularRepos extends Component{
  state = {
    activeLanguageId: languageFiltersData[0].id,
    reposData: [],
    fetchResult: fetchConstants.loader,
    
  }

  componentDidMount(){
    this.getRepositories()
  }

  onFailure = () => {
    this.setState({fetchResult: fetchConstants.failure})
  }

  getRepositories = async () => {
    const {activeLanguageId, reposData} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    
    const response = await fetch(url)
    if (response.ok === true){
      const data = await response.json()
      const fetchedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        starsCount: eachItem.stars_count,
        name: eachItem.name,
        issuesCount: eachItem.issues_count
      }))
      this.setState({reposData: fetchedData, fetchResult: fetchConstants.success})
    }
    else if (response.status === 401){
      this.onFailure()
    }

  }

  updateActiveLanguageId = id => {
    this.setState({
      activeLanguageId: id,
      fetchResult: fetchConstants.loader
    }, this.getRepositories)
  }

  fetchingFailedView = () => {
    return(
      <>
        <img src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view" className="failure-img" />
        <p className="failure-text"> Something Went Wrong </p>
      </>
    )
  }

  renderRepositoryItems = () => {
    const {reposData} = this.state
    return(
      <ul className="respository-items-container">
        {reposData.map(eachItem => <RepositoryItem details={eachItem} key={eachItem.id} />)}
      </ul>
    )
  }
 
  renderLanguageFilterItems = () => {
    const {activeLanguageId, reposData} = this.state
    return(
      <ul className="languages-list-items">
          {languageFiltersData.map(eachItem => 
            <LanguageFilterItem details={eachItem} key={eachItem.id} 
              activeLanguage={eachItem.id === activeLanguageId} updateActiveLanguageId={this.updateActiveLanguageId}
            /> 
          )}
      </ul>
    )
  }

  renderLoader = () => {
    return(
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    )
  }

  renderContent = () => {
    const {fetchResult} = this.state
    switch(fetchResult){
      case (fetchConstants.loader):
        return this.renderLoader()
      case (fetchConstants.success):
        return this.renderRepositoryItems()
      case (fetchConstants.failure):
        return this.fetchingFailedView()
      default:
        return null
    }
  }

  render(){
    const {activeLanguageId, reposData, isLoading, isFetchingFailed} = this.state
    return(
      <div className="repos-container">
        <div className="responsive-container">
          <h1 className="heading"> Popular </h1>
          {this.renderLanguageFilterItems()}
          {this.renderContent()}
          
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos




