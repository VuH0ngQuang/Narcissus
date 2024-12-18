import {useState} from "react";
import {FEHost, host} from "../../config.js";

const Comment = ({ setShowPay, orderId, setIsCancel }) => {

    const [reason, setReason] = useState('')
    const [authToken] = useState(localStorage.getItem('authToken'))

    const handleCancel = () => {

        const cancelData = {orderId, reason}

        try {
            if (authToken === null) window.location.href = `${FEHost}/login`
            fetch(`${host}/payment/cancel-payment`, {
                headers: {
                    'Authorization': authToken,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(cancelData)
            })
                .then((response) => {
                    if (response.status === 401) window.location.href = `${FEHost}/login`
                    if (response.ok) window.location.href = `${FEHost}/failed`
                })
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
    }

    return (
        <div className='mx-[8%] scrollbar-hide'>
            <div className='h-12'></div>
            <div className=''>
                <form action="">
                    <br/>
                    <p className="">Please tell us why (I'm crying over you, bae T.T)</p>
                    <input type="text" placeholder="Write here..."
                           className="mt-[40px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] w-full border-[1px] border-gray-500"
                            onChange={(e) => setReason(e.target.value)}
                    />
                    <button type='button'
                            className="mt-[20px] border w-full h-full py-2 px-4 bg-black text-white"
                            onClick={() => {
                                setIsCancel(true)
                                handleCancel()
                            }}
                    >SEND</button>
                    <button type="button"
                            className="mt-[20px] border w-full h-full py-2 px-4 bg-red-500 text-white"
                            onClick={() => setShowPay(true)}
                    >BACK</button>
                </form>
            </div>
        </div>
    );
}

export default Comment;