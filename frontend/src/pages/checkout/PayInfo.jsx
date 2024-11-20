const PayFailed = () => {
     return (
        <div>
            <div className='h-12'></div>
            <div className="min-h-screen flex flex-col">
                <div className="flex flex-grow flex-col justify-center items-center">
                    <div className="w-[200px] h-[200px] rounded-full bg-red-500 flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="white"
                            className="w-60 h-60"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01m-6.938 4p3.856C18.627 21 21 18.627 21 15.938V8.062C21 5.373 18.627 3 15.938 3H8.062C5.373 3 3 5.373 3 8.062v7.876C3 18.627 5.373 21 8.062 21z" />
                        </svg>
                    </div>
                    <p className="mt-4 text-[30px] font-semibold"><b>Payment failed</b></p>
                    <p className="text-[37px]"><i>Please try again!</i></p>
                </div>
            </div>
        </div>
     );
}
 
const PaySuccessful = () => {
    return (
        <div>
            <div className='h-12'></div>
            <div className="min-h-screen flex flex-col">
                <div className="flex flex-grow flex-col justify-center items-center">
                    <div className="w-[200px] h-[200px] rounded-full bg-green-500 flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="white"
                            className="w-60 h-60"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p className="mt-4 text-[30px] font-semibold"><b>Payment successful</b></p>
                </div>
            </div>
        </div>
    );
}

export { PayFailed, PaySuccessful };