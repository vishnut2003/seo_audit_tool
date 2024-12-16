import "./TripleDotStyle.css";

const TripleDotLoading = ({lightTheme}: {
    lightTheme?: boolean
}) => {
    return (
        <div className="bouncing-loader">
            <div style={{backgroundColor: lightTheme ? 'white' : '#3c50e0'}}></div>
            <div style={{backgroundColor: lightTheme ? 'white' : '#3c50e0'}}></div>
            <div style={{backgroundColor: lightTheme ? 'white' : '#3c50e0'}}></div>
        </div>
    )
}

export default TripleDotLoading