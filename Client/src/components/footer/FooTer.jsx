
function FooTer() {
    let date = new Date().getFullYear();
    return (
        <footer className="bg-gray-50 dark:bg-[#162336] py-16 border-t-2 border-solid border-gray-100 dark:border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-28">
                <div className="flex justify-center">
                    <p className="text-gray-800 dark:text-gray-300  text-center text-sm">&copy; {date} - Dairy Company</p>
                </div>
            </div>
        </footer>
    )
}

export default FooTer