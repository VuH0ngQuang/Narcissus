const Comment = () => {
    return (
        <div className='mx-[8%]'>
            <div className='h-12'></div>
            <div className=''>
                <form action="">
                    <br />
                    <p className="">Please tell us why (I'm crying over you, bae T.T)</p>
                    <input type="text" placeholder="Write here..." className="mt-[40px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] w-full border-[1px] border-gray-500"/>
                    <button className="mt-[20px] border w-full h-full py-2 px-4 bg-black text-white">SEND</button>
                </form>
            </div>
        </div>
    );
}
 
export default Comment;