import { useNProgress } from '@tanem/react-nprogress';

/**
 * Loader component used for indicating the page load in client side transitions
 * @param param0 
 * @returns 
 */
const Loader: React.FC<{ isRouteChanging: boolean }> = ({ isRouteChanging }) => {
    const { animationDuration, isFinished, progress } = useNProgress({
        isAnimating: isRouteChanging,
    })

    return (
        <>
            <style jsx>{`
                .loaderContainer {
                    opacity: ${isFinished ? 0 : 1};
                    pointer-events: none;
                    transition: opacity ${animationDuration}ms linear;
                }

                .loaderBar {
                    background: #0095f6;
                    height: 4px;
                    left: 0;
                    margin-left: ${(-1 + progress) * 100}%;
                    position: fixed;
                    top: 0;
                    transition: margin-left ${animationDuration}ms linear;
                    width: 100%;
                    z-index: 1031;
                }

                .loaderSpinner {
                    box-shadow: 0 0 10px #29d, 0 0 5px #29d;
                    display: block;
                    height: 100%;
                    opacity: 1;
                    position: absolute;
                    right: 0;
                    transform: rotate(3deg) translate(0px, -4px);
                    width: 100px;
                }
            `}</style>
            <div className="loaderContainer">
                <div className="loaderBar">
                    <div className="loaderSpinner" />
                </div>
            </div>
        </>
    )
}

export default Loader