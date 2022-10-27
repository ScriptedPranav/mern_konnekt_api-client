import "./message.css"
import {format} from 'timeago.js'

function Message({message,own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img src = "https://wallpaperaccess.com/full/2213424.jpg" className = "messageImg"/>
            <p className = "messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message