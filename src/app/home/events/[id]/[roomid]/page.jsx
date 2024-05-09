"use client";
import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { getUsername } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

const Room = ({ params }) => {
    const containerRef = useRef(null);
    const router = useRouter()

    useEffect(() => {
        const myLiveStream = async () => {
            const username = await getUsername()
            if (username) {
                const appID = Number(process.env.NEXT_PUBLIC_APP_ID);
                const serverSecret = process.env.NEXT_PUBLIC_SERVER_SECRET;
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, params.roomid, Date.now().toString(), username);

                const zc = ZegoUIKitPrebuilt.create(kitToken);

                zc.joinRoom({
                    container: containerRef.current,
                    scenario: {
                        mode: ZegoUIKitPrebuilt.LiveStreaming
                    },
                    showScreenSharingButton: true
                });

            }
            else {
                router.push('/login')
            }

        };

        if (containerRef.current) {
            myLiveStream();
        }
    }, [params.roomid]);

    return (
        <div>
            <div ref={containerRef} />
        </div>
    );
};

export default Room;
