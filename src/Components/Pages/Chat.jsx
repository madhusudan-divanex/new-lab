import { faMicrophone, faPaperclip, faPaperPlane, faPhone, faSearch, faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { getApiData, getSecureApiData, securePostData } from "../../Services/api";
import AudioWaveform from "../AudioWaveform";
import base_url from "../../../baseUrl";
import '../../assets/css/chat.css'
import { toast } from "react-toastify";
function Chat() {
    const ringtoneRef = useRef(null);
    const callingRef = useRef(null)
    const [callSeconds, setCallSeconds] = useState(0);
    const callTimerRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const [recording, setRecording] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const [recordSeconds, setRecordSeconds] = useState(0);
    const recordTimerRef = useRef(null);
    const [previewFile, setPreviewFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [callerName, setCallerName] = useState()
    const [outgoingCall, setOutgoingCall] = useState(false);


    const [chatList, setChatList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [typingUser, setTypingUser] = useState(false);
    const socketRef = useRef(null);
    const fileInputRef = useRef(null);
    const bottomRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const [searchUsers, setSearchUsers] = useState([]);

    //Call
    const pcRef = useRef(null);
    const localStreamRef = useRef(null);
    const pendingCandidatesRef = useRef([]);
    const remoteAudioRef = useRef(null);

    const [incomingCall, setIncomingCall] = useState(null);
    const [callType, setCallType] = useState(null);
    const [callActive, setCallActive] = useState(false);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const myUserId = localStorage.getItem("userId");
    const SERVER_BASE_URL = base_url;


    const formatTime = (sec) => {
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = sec % 60;

        return [
            h > 0 ? String(h).padStart(2, "0") : null,
            String(m).padStart(2, "0"),
            String(s).padStart(2, "0"),
        ]
            .filter(Boolean)
            .join(":");
    };


    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreviewFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };




    const uploadAudio = async (file) => {
        if (!selectedChat) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await securePostData("api/chat/upload", formData);

        socketRef.current.emit("send-message", {
            toUserId: selectedChat.participants[0]._id,
            message: "",
            file: {
                ...res.file,
                isAudio: true,
            },
        });

        setMessages((prev) => [
            ...prev,
            {
                sender: { _id: myUserId },
                file: { ...res.file, isAudio: true },
                createdAt: new Date(),
            },
        ]);
    };




    const toggleRecording = async () => {
        if (recording) {
            mediaRecorderRef.current.stop();
            clearInterval(recordTimerRef.current);
            recordTimerRef.current = null;
            setRecording(false);
            return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
            if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, {
                type: "audio/webm",
            });

            setRecordedAudio(audioBlob); // ✅ STORE, NOT SEND
        };

        mediaRecorderRef.current.start();
        setRecording(true);
        setRecordSeconds(0);
        recordTimerRef.current = setInterval(() => {
            setRecordSeconds((s) => s + 1);
        }, 1000);

    };







    const startCallTimer = () => {
        stopCallTimer(); // safety

        callTimerRef.current = setInterval(() => {
            setCallSeconds((prev) => prev + 1);
        }, 1000);
    };


    const stopCallTimer = () => {
        if (callTimerRef.current) {
            clearInterval(callTimerRef.current);
            callTimerRef.current = null;
        }
        setCallSeconds(0);
    };




    const stopRingtone = () => {
        if (ringtoneRef.current) {
            ringtoneRef.current.pause();
            ringtoneRef.current.currentTime = 0;
        }
    };
    const stopOutgoingTone = () => {
        if (callingRef.current) {
            callingRef.current.pause();
            callingRef.current.currentTime = 0;
        }
    };




    //Call
    const initPeerConnection = (toUserId) => {
        pcRef.current = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        pcRef.current.onicecandidate = (e) => {
            if (e.candidate) {
                socketRef.current.emit("ice-candidate", {
                    toUserId,
                    candidate: e.candidate,
                });
            }
        };

        pcRef.current.ontrack = (e) => {
            const stream = e.streams[0];
            // console.log("Tracks:", e.streams[0].getTracks());
            // 🔊 ALWAYS attach audio
            if (remoteAudioRef.current) {
                remoteAudioRef.current.srcObject = stream;
                remoteAudioRef.current.play().catch(() => { });
            }

            // 🎥 Attach video ONLY if element exists
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
            }
        };
    };

    const startCall = async (type) => {
        if (!selectedChat) return;

        setCallType(type);
        setOutgoingCall(true);
        initPeerConnection(selectedChat.participants[0]._id);
        setCallerName(selectedChat.participants[0].name)

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: type === "video",
        });

        if (type === "video" && localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
        }
        localStreamRef.current = stream;
        stream.getTracks().forEach((t) => pcRef.current.addTrack(t, stream));

        const offer = await pcRef.current.createOffer();
        await pcRef.current.setLocalDescription(offer);

        socketRef.current.emit("call-user", {
            toUserId: selectedChat.participants[0]._id,
            callType: type,
            offer,
        });
    };

    const acceptCall = async () => {
        stopRingtone();
        stopOutgoingTone()
        startCallTimer();
        initPeerConnection(incomingCall.fromUserId);

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: callType === "video",
        });

        if (callType === "video" && localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
        }

        localStreamRef.current = stream;

        stream.getTracks().forEach((t) => pcRef.current.addTrack(t, stream));

        await pcRef.current.setRemoteDescription(incomingCall.offer);
        const answer = await pcRef.current.createAnswer();
        await pcRef.current.setLocalDescription(answer);

        socketRef.current.emit("answer-call", {
            toUserId: incomingCall.fromUserId,
            answer,
        });

        setIncomingCall(null);
        setCallActive(true);
        ;
    };

    const endCallCleanup = () => {
        stopCallTimer();
        pcRef.current?.close();
        pcRef.current = null;

        localStreamRef.current?.getTracks().forEach((t) => t.stop());
        localStreamRef.current = null;

        setCallActive(false);
        setIncomingCall(null);

    };

    const rejectCall = () => {
        socketRef.current.emit("reject-call", {
            toUserId: incomingCall.fromUserId
        });
        stopRingtone();
        setOutgoingCall(false);
        stopOutgoingTone()
        endCallCleanup();
    };

    const endCall = () => {
        socketRef.current.emit("end-call", {
            toUserId: selectedChat.participants[0]._id
        });
        stopRingtone();
        setOutgoingCall(false);
        stopOutgoingTone()
        endCallCleanup();
    };
    useEffect(() => {
        if (!socketRef.current) return;

        const socket = socketRef.current;

        socket.on("call-rejected", ({ fromUserId }) => {
            console.log("Call rejected by:", fromUserId);

            stopRingtone();
            stopOutgoingTone()
            setOutgoingCall(false);
            endCallCleanup();
        });

        return () => {
            socket.off("call-rejected");
        };
    }, []);
    useEffect(() => {
        if (!socketRef.current) return;

        const socket = socketRef.current;
        socket?.on("call-busy", ({ message }) => {
            alert(message);
            setOutgoingCall(false);
            endCallCleanup();
        });

        return () => {
            socketRef.current?.off("call-busy");
        };
    }, []);

    // ================= SOCKET INIT =================
    useEffect(() => {
        socketRef.current = io(base_url, {
            auth: { token: localStorage.getItem("token") },
        });

        socketRef.current.on("receive-message", (msg) => {
            getSecureApiData("api/chat/conversations").then((res) => {
                setChatList(res.data);
                if (selectedChat == null) {
                    setSelectedChat(res.data[0])
                    openChat(res.data[0])
                }
            });
            setMessages((prev) => [...prev, msg]);
        });

        socketRef.current.on("user-typing", () => setTypingUser(true));
        socketRef.current.on("user-stop-typing", () => setTypingUser(false));

        //Call
        socketRef.current.on("incoming-call", ({ fromUserId, offer, callType, name }) => {
            setIncomingCall({ fromUserId, offer });
            setCallerName(name)
            setCallType(callType);
        });

        socketRef.current.on("call-answered", async ({ answer }) => {
            await pcRef.current.setRemoteDescription(answer);
            pendingCandidatesRef.current.forEach((c) =>
                pcRef.current.addIceCandidate(c)
            );
            pendingCandidatesRef.current = [];
            setCallActive(true);
            startCallTimer();
        });

        socketRef.current.on("ice-candidate", async (candidate) => {
            if (pcRef.current?.remoteDescription) {
                await pcRef.current.addIceCandidate(candidate);
            } else {
                pendingCandidatesRef.current.push(candidate);
            }
        });

        socketRef.current.on("call-rejected", () => {
            stopRingtone();
            stopOutgoingTone()
            endCallCleanup();
            setOutgoingCall(false)
            return toast.error("Call rejected by user");
        });


        socketRef.current.on("call-ended", () => {
            stopRingtone();
            endCallCleanup();
        });


        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    // ================= LOAD CHAT LIST =================
    useEffect(() => {
        getSecureApiData("api/chat/conversations").then((res) => {
            setChatList(res.data);
            // if(selectedChat==null){
            //     setSelectedChat(res.data[0])
            // }
        });
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (callActive || incomingCall) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [callActive, incomingCall]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ================= OPEN CHAT =================
    const openChat = async (chat) => {
        setSelectedChat(chat);
        const res = await getSecureApiData(`api/chat/messages/${chat._id}`);
        setMessages(res.data);
    };

    // ================= SEND MESSAGE =================
    const sendMessage = async () => {
        if (!selectedChat) return;

        // 🔊 AUDIO priority
        if (recordedAudio) {
            const audioFile = new File(
                [recordedAudio],
                `audio-${Date.now()}.webm`,
                { type: "audio/webm" }
            );
            await uploadAudio(audioFile);
            setRecordedAudio(null);
            return;
        }

        // 🖼 IMAGE + TEXT
        if (previewFile) {
            const formData = new FormData();
            formData.append("file", previewFile);

            const res = await securePostData("api/chat/upload", formData);

            socketRef.current.emit("send-message", {
                toUserId: selectedChat.participants[0]._id,
                message: message || "",
                file: res.file,
            });

            setMessages((prev) => [
                ...prev,
                {
                    sender: { _id: myUserId },
                    message: message || "",
                    file: res.file,
                    createdAt: new Date(),
                },
            ]);

            // 🧹 cleanup
            setPreviewFile(null);
            setPreviewUrl(null);
            setMessage("");
            return;
        }

        // 💬 ONLY TEXT
        if (!message.trim()) return;

        socketRef.current.emit("send-message", {
            toUserId: selectedChat.participants[0]._id,
            message,
        });

        setMessages((prev) => [
            ...prev,
            { sender: { _id: myUserId }, message, createdAt: new Date() },
        ]);

        setMessage("");
    };

    // const sendMessage = () => {
    //   if (!message.trim() || !selectedChat) return;

    //   socketRef.current.emit("send-message", {
    //     toUserId: selectedChat.participants[0]._id,
    //     message,
    //   });

    //   setMessages((prev) => [
    //     ...prev,
    //     { sender: { _id: myUserId }, message, createdAt: new Date() },
    //   ]);

    //   setMessage("");
    // };

    // ================= FILE UPLOAD =================
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !selectedChat) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await securePostData("api/chat/upload", formData);

        socketRef.current.emit("send-message", {
            toUserId: selectedChat.participants[0]._id,
            message: message || "",   // ✅ text also
            file: res.file,
        });

        setMessages((prev) => [
            ...prev,
            {
                sender: { _id: myUserId },
                message: message || "",
                file: res.file,
                createdAt: new Date(),
            },
        ]);

        setMessage(""); // clear input after send
    };
    // const handleFileUpload = async (e) => {
    //   const file = e.target.files[0];
    //   if (!file || !selectedChat) return;

    //   const formData = new FormData();
    //   formData.append("file", file);

    //   const res = await api.post("/chat/upload", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });

    //   socketRef.current.emit("send-message", {
    //     toUserId: selectedChat.participants[0]._id,
    //     message: "",
    //     file: res.data.file,
    //   });

    //   setMessages((prev) => [
    //     ...prev,
    //     { sender: { _id: myUserId }, file: res.data.file, createdAt: new Date() },
    //   ]);
    // };

    const startChatWithUser = async (user) => {
        // create or get conversation
        const res = await securePostData("api/chat/create", {
            userId: user._id,
        });
        const conversation = res.data;

        setSearchText("");
        setSearchUsers([]);

        setSelectedChat(conversation);

        const msgRes = await getSecureApiData(`api/chat/messages/${conversation._id}`);

        setMessages(msgRes.data);

        // add to chat list if new
        setChatList((prev) => {
            const exists = prev.find((c) => c._id === conversation._id);
            return exists ? prev : [conversation, ...prev];
        });
    };
    let typingTimeout;

    const handleTyping = (value) => {
        socketRef.current.emit("typing", {
            toUserId: selectedChat.participants[0]._id,
        });

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            socketRef.current.emit("stop-typing", {
                toUserId: selectedChat.participants[0]._id,
            });
        }, 1000);
    };

    return (
        <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                <div className="row">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h3 className="innr-title"> Chat</h3>
                            <div className="admin-breadcrumb">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb custom-breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#" className="breadcrumb-link">
                                                Dashboard
                                            </a>
                                        </li>
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Chat
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-3 pe-lg-0 mb-3">
                        <div className="chat-left-usr-bx">
                            <div>
                                <h6>Message</h6>

                                <div className="custom-frm-bx">
                                    <input
                                        type="text"
                                        className="form-control px-5"
                                        placeholder="Search user..."
                                        value={searchText}
                                        onChange={async (e) => {
                                            const value = e.target.value;
                                            setSearchText(value);

                                            if (value.length < 2) {
                                                setSearchUsers([]);
                                                return;
                                            }

                                            const res = await getSecureApiData(`api/comman/search?q=${value}`);
                                            setSearchUsers(res.data);
                                        }}
                                    />
                                    <div className="chat-search-bx">
                                        <a href="#" className="chat-search-btn">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </a>
                                    </div>
                                </div>

                                {searchUsers?.length > 0 && (
                                    <div className="search-user-results">
                                        {searchUsers?.map((user) => (
                                            <div
                                                key={user._id}
                                                className="chat-usr-card"
                                                onClick={() => startChatWithUser(user)}
                                            >
                                                <div className="chat-usr-info">
                                                    <h5>{user.name}</h5>
                                                    <small>{user.email}</small>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {chatList?.map((chat) => (
                                    <a href="#" key={chat._id}>
                                        <div
                                            className="chat-usr-card nw-chat-usr-card"
                                            onClick={() => openChat(chat)}
                                        >
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="chat-usr-avatr-crd">
                                                    <div className="chat-usr-avatr-bx">
                                                        <img src="/profile.png" alt="" />
                                                    </div>
                                                    <div className="chat-usr-info">
                                                        <h5>{chat.participants[0]?.name}</h5>
                                                        <p>{chat.lastMessage}</p>
                                                    </div>
                                                </div>

                                                {chat.unreadCount > 0 && (
                                                    <div className="chat-count-bx me-lg-3">
                                                        <span className="chat-count-title">
                                                            {chat.unreadCount}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 ps-lg-0">
                        <div className="right-chat-card chat-tp-header">
                            <div className="lab-tp-title patient-bio-tab  d-flex align-items-center justify-content-between py-2">
                                <div className="">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="chat-usr-avatr-crd">
                                            <div className="chat-usr-avatr-bx nw-chat-add-live ">
                                                <img src="/chat-logo.jpg" alt="" />
                                            </div>

                                            <div className="chat-usr-info">
                                                <h5 className="mb-0">{selectedChat?.participants[0]?.name || "Select Chat"}</h5>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="add-nw-bx d-flex gap-3">
                                    <button onClick={() => startCall("voice")} className="text-black calling-btn">
                                        <FontAwesomeIcon icon={faPhone} style={{ color: "#AC39D4" }} />
                                    </button>

                                    <button onClick={() => startCall("video")} className="text-black calling-btn">
                                        <FontAwesomeIcon icon={faVideo} style={{ color: "#AC39D4" }} />
                                    </button>

                                </div>

                            </div>

                            <div className="all-chating-content-bx">
                                <div className="chat-container">
                                    {messages?.map((msg, i) => {
                                        const isMe = msg.sender._id === myUserId;
                                        return (
                                            <div
                                                key={i}
                                                className={`d-flex align-items-start mb-4 ${isMe ? "justify-content-end" : ""
                                                    }`}
                                            >
                                                <div>
                                                    <div
                                                        className={`chat-bubble ${isMe ? "nw-right" : "nw-left"
                                                            }`}
                                                    >
                                                        {msg.message && (
                                                            <p className={isMe && "text-white"}>{msg.message}</p>
                                                        )}
                                                        {msg.file && (
                                                            msg.file.type?.startsWith("audio/") ? (
                                                                <audio
                                                                    controls
                                                                    src={`${SERVER_BASE_URL}${msg.file.url}`}
                                                                    style={{ width: "240px" }}
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={`${SERVER_BASE_URL}${msg.file.url}`}
                                                                    alt={msg.file.name}
                                                                    style={{
                                                                        maxWidth: "220px",
                                                                        borderRadius: "8px",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() =>
                                                                        window.open(
                                                                            `${SERVER_BASE_URL}${msg.file.url}`,
                                                                            "_blank"
                                                                        )
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {typingUser && <p className="typing-text">Typing...</p>}
                                    <div ref={bottomRef} />
                                </div>
                                <div className="">
                                    {recording && (
                                        <div className="recording-indicator mb-2">
                                            <span className="text-danger fw-bold">
                                                🔴 Recording… {recordSeconds}s
                                            </span>
                                            <small className="d-block text-muted">
                                                Tap mic to stop
                                            </small>
                                        </div>
                                    )}

                                    {recordedAudio && (
                                        <div className="audio-preview mb-2">
                                            <small className="text-success d-block mb-1">
                                                🎧 Audio ready to send
                                            </small>

                                            <AudioWaveform audioBlob={recordedAudio} />

                                            <button
                                                className="btn btn-sm btn-outline-danger mt-1"
                                                onClick={() => setRecordedAudio(null)}
                                            >
                                                ❌ Cancel Audio
                                            </button>
                                        </div>
                                    )}

                                    <div className="custom-frm-bx mb-0">
                                        <input
                                            type="text"
                                            className="form-control px-5"
                                            value={message}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setMessage(value);

                                                if (value.length > 0) {
                                                    handleTyping(value);
                                                }
                                            }}
                                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                        />

                                        <div className="chat-papperclip-bx">
                                            {/* 📎 FILE */}
                                            <button
                                                type="button"
                                                className="papperclip-btn"
                                                onClick={() => fileInputRef.current.click()}
                                            >
                                                <FontAwesomeIcon icon={faPaperclip} />
                                            </button>

                                            {/* 🎤 MIC */}
                                            <button
                                                type="button"
                                                className={`mic-btn ${recording ? "recording" : ""}`}
                                                onClick={toggleRecording}
                                            >
                                                {recording ? "⏹️" : <FontAwesomeIcon icon={faMicrophone} style={{color:'#00B4B5'}}/>}
                                            </button>
                                        </div>
                                        {previewUrl && (
                                            <div className="image-preview mb-2">
                                                <img
                                                    src={previewUrl}
                                                    alt="preview"
                                                    style={{
                                                        maxWidth: "200px",
                                                        borderRadius: "8px",
                                                        display: "block",
                                                        marginBottom: "5px",
                                                    }}
                                                />
                                                <small className="text-muted">🖼 Image ready to send</small>
                                                <button
                                                    className="btn btn-sm btn-outline-danger mt-1"
                                                    onClick={() => {
                                                        setPreviewFile(null);
                                                        setPreviewUrl(null);
                                                    }}
                                                >
                                                    ❌ Remove
                                                </button>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            hidden
                                            ref={fileInputRef}
                                            onChange={handleFileSelect}
                                        />

                                        <div className="chat-papper-plane-bx">
                                            <button onClick={sendMessage} className="chat-papper-plane-btn"><FontAwesomeIcon icon={faPaperPlane} className="paper-plane-icon" /></button>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>



            </div>
            {(incomingCall || callActive || outgoingCall) && (
                <div className="call-modal">
                    <div className="call-header">
                        <h4>
                            {incomingCall
                                ? "Incoming"
                                : outgoingCall
                                    ? "Calling..."
                                    : "Ongoing"} {callType} Call
                        </h4>
                        {callActive && (
                            <span className="call-timer">
                                ⏱ {formatTime(callSeconds)}
                            </span>
                        )}
                        <p>{callerName || "User"}</p>
                    </div>

                    {/* BODY */}
                    <div className="call-body">
                        {callType === "video" ? (
                            <>
                                <video
                                    ref={remoteVideoRef}
                                    autoPlay
                                    playsInline
                                    className="remote-video"
                                />
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    muted
                                    playsInline
                                    className="local-video"
                                />
                            </>
                        ) : (
                            <div className="voice-call-ui">
                                <img src="/profile.png" className="caller-avatar" />
                                <div className="voice-wave"></div>
                                <p>{incomingCall ? "Ringing..." : "Call in progress"}</p>
                            </div>
                        )}
                    </div>

                    {/* FOOTER */}
                    <div className="call-footer">
                        {incomingCall ? (
                            <>
                                <button className="btn accept" onClick={acceptCall}>
                                    Accept
                                </button>
                                <button className="btn reject" onClick={rejectCall}>
                                    Reject
                                </button>
                            </>
                        ) : (
                            <button className="btn end" onClick={endCall}>
                                End Call
                            </button>
                        )}
                    </div>

                    {incomingCall && (
                        <audio
                            ref={ringtoneRef}
                            autoPlay
                            loop
                            src="/ringtone.mp3"
                        />
                    )}
                    {outgoingCall && (
                        <audio
                            ref={callingRef}
                            autoPlay
                            loop
                            src="./calling.m4a"
                        />
                    )}
                </div>
            )}
            <audio ref={remoteAudioRef} autoPlay />
        </>
    )
}

export default Chat