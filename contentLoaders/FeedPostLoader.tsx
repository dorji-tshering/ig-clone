import ContentLoader from "react-content-loader"

const FeedPostLoader = () => {
    return (
        <div className="shadow-mainShadow mb-6 rounded-lg bg-white">
            <ContentLoader 
                speed={2}
                width="100%"
                height="400px"
                style={{padding: '20px'}}
            >
                <circle cx="15" cy="20" r="15" /> 
                <rect x="50" y="16" rx="2" ry="2" width="20%" height="10" /> 
                <rect x="80%" y="16" rx="2" ry="2" width="20%" height="10" /> 
                <rect x="0" y="55" rx="5" ry="5" width="100%" height="250" />
                <rect x="0" y="325" rx="2" ry="2" width="80%" height="10" /> 
                <rect x="0" y="350" rx="2" ry="2" width="80%" height="10" /> 
            </ContentLoader>
        </div>
    )
}

export default FeedPostLoader