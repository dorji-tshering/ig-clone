import { useNProgress } from '@tanem/react-nprogress';

/**
 * Loader component used for indicating the page load in client side transitions
 * @param param0 
 * @returns 
 */
const Loader = () => {
    return (
        <>
            <style jsx>{`
               .loader {
                    --height-of-loader: 4px;
                    --loader-color: #0071e2;
                    width: 100%;
                    height: var(--height-of-loader);
                    position: absolute;
                    overflow: hidden;
               }
               .loader::before {
                    content: "";
                    position: absolute;
                    background: var(--loader-color);
                    top: 0;
                    left: 0;
                    width: 0%;
                    height: 100%;
                    border-radius: 30px;
                    animation: moving 1s ease-in-out infinite;
               }
               @keyframes moving {
                    50% {
                        width: 100%;
                    }
                    100% {
                        width: 0;
                        right: 0;
                        left: unset;
                    }
               }
            `}</style>
            <div className="loader z-[9000] before:bg-instaBlue bg-instaBlue/10"></div>
        </>
    )
}

export default Loader