
const UserDetailForm = () => {

  return (
     <div className="divide-y-2 divide-black">
          <div className="h-12"></div>
          <div className="">  
            <div class="border-b-2 border-black pb-2 ">
              <h2 class="text-6xl ml-10 mt-5 mb-5">User Details</h2>
            </div>  

            <div className="flex justify-center">
              <div>
                <div className="">
                  <label className="block text-lg font-semibold text-gray-700 mb-4 mt-4 ml-4">Name</label>
                  <div className="bg-gray-200 p-2 rounded text-gray-700 w-[500px]">Huỳnh Hữu Nghĩa</div>                  
                  <div className="flex justify-between mr-4">
                    <a href="#" className="text-indigo-600 text-base inline-block mt-1 underline hover:text-red-500 hover:underline ml-auto">Change</a>
                  </div>
                </div>

                <div className="">
                  <label className="block text-lg font-semibold text-gray-700 mb-4 mt-4 ml-4">Email</label>
                  <div className="bg-gray-200 p-2 rounded text-gray-700 w-[500px]">Huỳnh Hữu Nghĩa</div>
                  <div className="flex justify-between mr-4">
                    <a href="#" className="text-indigo-600 text-base inline-block mt-1 underline hover:text-red-500 hover:underline ml-auto">Change</a>
                  </div>
                </div>

                <div className="">
                  <label className="block text-lg font-semibold text-gray-700 mb-4 mt-4 ml-4">Address</label>
                  <div className="bg-gray-200 p-2 rounded text-gray-700 w-[500px] h-36 overflow-y-auto text-base leading-6 break-words"></div>
                 <div className="flex justify-between mr-4">
                    <a href="#" className="text-indigo-600 text-base inline-block mt-1 underline hover:text-red-500 hover:underline ml-auto">Change</a>
                  </div>
                </div>

                <div className="">
                  <label className="block text-lg font-semibold text-gray-700 mb-4 mt-4 ml-4">PhoneNo.</label>
                  <div className="bg-gray-200 p-2 rounded text-gray-700 w-[500px]">Huỳnh Hữu Nghĩa</div>
                  <div className="flex justify-between mr-4">
                    <a href="#" className="text-indigo-600 text-base inline-block mt-1 underline hover:text-red-500 hover:underline ml-auto">Change</a>
                  </div>
                </div>

                <div className="flex justify-end mb-8 mt-8">
                  <button className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-200 flex items-center">
                    SAVE CHANGE
                  </button>
                </div>

                <div className="flex justify-end mb-8 mt-8">
                  <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 mr-6">
                    LOG OUT
                  </button>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                    ACCESS
                  </button>
                </div>
              </div>
            </div>

          </div> 
    </div>
  );
};

export default UserDetailForm;
