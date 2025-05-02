import { Server } from "socket.io";
import dotenv from "dotenv";
import { emitters, emits } from "./src/emitterEndpoints/emitters.js";
import { socketMessages, loggerMessages } from "./src/messages/index.js";
import {
  addUser,
  getUser,
  removeUser,
  getUsers,
} from "./src/socketFunctions/functions.js";
import logger from "./src/utils/logger.js";

dotenv.config();

const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN;

if (!PORT || !ORIGIN) {
  logger.error(socketMessages.MISSING_PORT_OR_ORIGIN);
  throw new Error(socketMessages.MISSING_PORT_OR_ORIGIN);
}

//Enable CORS for this origin
const io = new Server({
  cors: {
    origin: ORIGIN,
  },
});

//Emitter Actions with Winston Logger Integrated
io.on(emitters.CONNECTION, (socket) => {
  logger.info(`${socketMessages.USER_CONNECTED}${socket.id}`);

  //On a User Addition
  socket.on(emitters.ADD_USER, (userData) => {
    try {
      addUser(userData, socket.id);
      io.emit(emits.GET_USERS, getUsers());
      logger.info(
        `${loggerMessages.USER_ADDED}${JSON.stringify(userData.name)}`
      );
    } catch (error) {
      logger.error(
        `${loggerMessages.USER_ADD_FAILED}${JSON.stringify(userData)} - ${
          error.message
        }`
      );
    }
  });

  //Message or Data transfer from one user to another
  socket.on(emitters.SEND_MESSAGE, (data) => {
    try {
      const receiver = getUser(data.receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit(emits.GET_MESSAGE, data);
        logger.info(
          `${loggerMessages.MESSAGE_SENT_FROM}${data.senderId} - ${data.receiverId}`
        );
      } else {
        logger.warn(
          `${loggerMessages.RECEIVER_ID_NOT_FOUND}${data.receiverId}`
        );
      }
    } catch (error) {
      logger.error(
        `${loggerMessages.MESSAGE_SENT_FAILED}${JSON.stringify(data)} - ${
          error.message
        }`
      );
    }
  });

  //On user Disconnect
  socket.on(emitters.DISCONNECT, () => {
    try {
      logger.info(`${socketMessages.USER_DISCONNECTED}${socket.id}`);
      removeUser(socket.id);
      io.emit(emits.GET_USERS, getUsers());
    } catch (error) {
      logger.error(
        `${loggerMessages.USER_DISCONNECT_ERROR}${socket.id} - ${error.message}`
      );
    }
  });
});

try {
  io.listen(PORT);
  logger.info(`${loggerMessages.PORT_IS_RUNNING_ON}${PORT}`);
} catch (error) {
  logger.error(
    `${loggerMessages.SERVER_START_FAILED}${PORT} - ${error.message}`
  );
}
