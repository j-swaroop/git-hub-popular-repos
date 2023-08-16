// Write your code here
import "./index.css"

const LanguageFilterItem = props => {
    const {details, activeLanguage, updateActiveLanguageId} = props
    const {id, language} = details

    const activeLanguageClassName = activeLanguage? "active-language-item": ""

    const onChangeLanguage = () => {
        updateActiveLanguageId(id)
    }

    return(
        <li className="language-list-item"> 
            <button onClick={onChangeLanguage} className={`language-item ${activeLanguageClassName}`}>
                {language}
            </button>
        </li>
    )
}

export default LanguageFilterItem