import loader from "../images/loadingGif.jpg"

const ScreenLoader = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center" 
        style={{backgroundImage: loader}}>
            <img src={loader} alt="loading" className="w-72 h-80 no-repeat bg-cover" />
        </div>
    )
}

export default ScreenLoader
