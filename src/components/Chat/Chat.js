import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import './Chat.scss'

export function Chat({socket, room}) {
	const [ message, setMessage ] = useState("")
	const [ chat, setChat ] = useState([])


	useEffect(
		() => {
			socket.on("new message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
				console.log(name, message)
				const chatBox = document.querySelector('.render-chat')
				chatBox.scrollTop = chatBox.scrollHeight
			})
		},
		[ chat, socket ]
	)

	const onTextChange = (e) => {
		setMessage(e.target.value)
	}

	const onMessageSubmit = (e) => {
		console.log(room)
		socket.emit("message", { message: message, id: socket.id, room: room })
		e.preventDefault()
		setMessage("")
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h4 className="chat-msg">
					{name}: <span>{message}</span>
				</h4>
			</div>
		))
	}

	return (
		<div className="card">
			<div className="render-chat">
				{renderChat()}
			</div>
			<form onSubmit={onMessageSubmit}>
				<div>
					<input
						name="message"
						placeholder="Send a message"
						onChange={(e) => onTextChange(e)}
						value={message}
					/>
				</div>
			</form>
			
		</div>
	)
}

export default Chat