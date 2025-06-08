const loggerMessages = {
    success:{
        USER_ADDED: "User added: ",
        MESSAGE_SENT_FROM: "Message sent from ",
        PORT_IS_RUNNING_ON: "Socket.IO server running on port ",
    },
    error:{
        USER_ADD_FAILED: "Failed to add user: ",
        MESSAGE_SENT_FAILED: "Error sending message: ",
        RECEIVER_ID_NOT_FOUND: "Receiver not found for ID: ",
        SERVER_START_FAILED: "Server failed to start on port "
    }
}

export default loggerMessages;