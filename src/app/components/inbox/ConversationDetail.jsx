"use client"
import StyledButton from "../styledbuttons/StyledButton";

const ConversationDetail = () => {
    const onSendClick = () => {
        console.log("onSendClick")
    }
    return (
        <>
            <div className="max-h-[400px] overflow-auto flex flex-col space-y-4 px-[100px]">
                <div className="w-[80%] py-4 px-6 rounded-xl bg-gray-200">
                    <p className="font-bold text-gray-500 font-poppins">
                        JohnDoe
                    </p>
                    <p className="font-poppins">
                        JohnDoesdasdasdassdadsa
                    </p>

                </div>
                <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200">
                    <p className="font-bold text-gray-500 font-poppins">
                        JohnDoe
                    </p>
                    <p className="font-poppins">
                        JohnDoesdasdasdassdadsa
                    </p>

                </div>

            </div>
            <div className="px-[100px]">
                <div className="mt-4 py-4 px-6 flex items-center justify-center border border-gray-300 space-x-4 rounded-xl">
                    <input
                        type="text"
                        placeholder="Type your message...."
                        className="w-full py-2 px-5 bg-gray-200 rounded-xl font-poppins text-[13px]"
                    />
                    <StyledButton text="Send" className="px-4 py-2 rounded-md bg-cgreen text-white font-poppins text-[13px] "  onClick={onSendClick}/>

                </div>
            </div>
        </>

    )
}
export default ConversationDetail;