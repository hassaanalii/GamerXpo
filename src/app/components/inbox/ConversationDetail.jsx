"use client"
import { useEffect, useState, useRef } from "react";
import StyledButton from "../styledbuttons/StyledButton";
import useWebSocket, { ReadyState } from "react-use-websocket";

const ConversationDetail = ({ token, userId, messages, conversation }) => {
    const [newMessage, setNewMessage] = useState("")
    const messagesDiv = useRef(null)

    const myUser = conversation.users?.find((user) => user.id == userId)
    const otherUser = conversation.users?.find((user) => user.id != userId)
    const [realtimeMessages, setRealTimeMessages] = useState([])

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true,
    },
    )

    useEffect(() => {
        console.log('connection established', readyState)

    }, [readyState])

    useEffect(() => {
        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
            const message = {
                id: '',
                name: lastJsonMessage.name,
                body: lastJsonMessage.body,
                sent_to: otherUser,
                created_by: myUser,
                conversationId: conversation.id,
            }

            setRealTimeMessages((realtimeMessages) => [...realtimeMessages, message]);
        }

        scrollToBottom();

    }, [lastJsonMessage])

    const onSendClick = async () => {
        console.log("heheh")
        console.log(newMessage)
        console.log(myUser)
        console.log(otherUser)
        sendJsonMessage({
            event: 'chat_message',
            data: {
                body: newMessage,
                name: myUser?.username,
                sent_to_id: otherUser?.id,
                conversation_id: conversation.id
            }
        })

        setNewMessage('');

        setTimeout(() => {
            scrollToBottom()
        }, 50);

    }

    const scrollToBottom = () => {
        if (messagesDiv.current) {
            messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
        }
    }

    console.log(messages)
    console.log(realtimeMessages)
    console.log(myUser)
    return (
        <>
            <div className="flex flex-col m-auto mt-[60px] w-[70%] rounded-lg border border-gray-300">
                <div ref={messagesDiv} className="max-h-[400px] overflow-auto flex flex-col space-y-4 px-[100px] pt-5 ">
                    {/* <div className="w-[80%] py-4 px-6 rounded-xl bg-gray-200">
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

                </div> */}
                    {messages.map((message, index) => (
                        <div key={index}
                            className={`w-[80%] py-4 px-5 rounded-lg ${message.created_by.username == myUser?.username ? 'ml-[20%] bg-cgreen/30' : 'bg-gray-200'}`}
                        >
                            <p className="font-bold font-poppins text-[18px]">{message.created_by.username}</p>
                            <p className="font-poppins text-[13px]">{message.body}</p>
                        </div>
                    ))}
                    {realtimeMessages.map((message, index) => (
                        <div key={index}
                            className={`w-[80%] py-4 px-5 rounded-lg ${message.created_by.username == myUser?.username ? 'ml-[20%] bg-cgreen/30' : 'bg-gray-200'}`}
                        >
                            <p className="font-bold font-poppins text-[18px]">{message.created_by.username}</p>
                            <p className="font-poppins text-[13px]">{message.body}</p>
                        </div>
                    ))}

                </div>
                <div className="px-[100px] ">
                    <div className="mt-4 py-4 px-6 flex items-center justify-center  space-x-4 rounded-xl">
                        <input
                            type="text"
                            placeholder="Type your message...."
                            className="w-full py-2 px-5 bg-gray-200 rounded-xl font-poppins text-[13px]"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <StyledButton text="Send" className="px-4 py-2 rounded-md bg-cgreen text-white font-poppins text-[13px] " onClick={onSendClick} />

                    </div>
                </div>
            </div>
        </>

    )
}
export default ConversationDetail;