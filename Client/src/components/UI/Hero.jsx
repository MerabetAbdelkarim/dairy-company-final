
function Hero({titel}) {
    return (
        <div className="flex  justify-center items-center w-full h-[100px] bg-cover bg-center bg-no-repeat  my-4 bg-[url('/src/assets/images/bg-cows.jpg')]">
            <h1 className="text-white text-3xl font-semibold ">{titel}</h1>
        </div>
    )
}

export default Hero