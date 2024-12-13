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
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M6.938 4.5L3 8.062v7.876L6.938 21h10.124L21 15.938V8.062L17.062 4.5H6.938z" />
                        </svg>
                    </div>
                    <p className="mt-4 text-[30px] font-semibold"><b>Payment failed</b></p>
                    <p className="text-[37px]"><i>Please try again!</i></p>
                    <div className="mt-6 flex space-x-4">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Back to Homepage
                        </button>
                        <button
                            onClick={() => null}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                            View Order
                        </button>
                    </div>
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
                    <div className="mt-6 flex space-x-4">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Back to Homepage
                        </button>
                        <button
                            onClick={() => null}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                            View Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { PayFailed, PaySuccessful };
