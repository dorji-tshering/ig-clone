import ContentLoader from "react-content-loader"

const PostLoader = () => {
    return (
        <div className="bg-white px-5 mb-5 py-8 rounded-lg shadow-mainShadow">
            <ContentLoader 
                speed={2}
                width='100%'
                height={300}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <circle cx="15" cy="20" r="15" /> 
                <rect x="50" y="15" rx="2" ry="2" width="140" height="10" /> 
                <rect x="0" y="60" rx="10" ry="10" width="100%" height="180" />
                <rect x="0" y="260" rx="2" ry="2" width="200" height="10" /> 
                <rect x="0" y="280" rx="2" ry="2" width="200" height="10" /> 
            </ContentLoader>
        </div>
        
    )
}

export default PostLoader