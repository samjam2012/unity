import { createApi } from "./middleware";
import moment from "moment";

const { REACT_APP_EVENT_API } = process.env;
export const eventApi = createApi(REACT_APP_EVENT_API as string);

const fireEvent = async ({ eventType, eventDetails }) => {
  const generateEventBody = () => {
    const { id, userType, loginCount } = eventDetails;
    switch (eventType) {
      case "USER_CREATE":
        return { userId: id, userType };
      case "LOGIN":
        return { userId: id, userType, loginCount };
      default:
        return null;
    }
  };

  const eventBody = generateEventBody();
  const dateTime = moment().utc().format();

  if (!eventBody) {
    return console.log("Event type unknown, dropping event: ", eventType);
  }

  const event = {
    eventType,
    eventBody,
    dateTime
  };

  try {
    const { data } = await eventApi("/events", "POST", event);
    return data;
  } catch (error) {
    return error;
  }
};

const getEventsInRange = async ({ eventType }) => {
  try {
    const floorTime = moment().subtract(7, "days").utc().format();

    const { data: events } = await eventApi("/events/range", "POST", {
      event_type: eventType,
      floor_time: floorTime
    });

    return events;
  } catch (error) {
    return error;
  }
};

const healthCheck = async () => {
  try {
    const { data } = await eventApi("/ping");

    return data;
  } catch (error) {}
};

const getUsageStats = async () => {
  try {
    const {
      data: { creates, logins }
    } = await eventApi("/events/usage");

    const sortedCreates = creates.sort((a, b) =>
      a.dateTime > b.dateTime ? 1 : b.dateTime > a.dateTime ? -1 : 0
    );

    let userTypeMap = {};
    for (let create of creates) {
      const key = create.eventBody.userType;
      if (!userTypeMap[key]) {
        userTypeMap[key] = 1;
      } else {
        userTypeMap[key]++;
      }
    }

    let currentMax = 0;
    let mostCommonUserType = "";
    for (let type of Object.keys(userTypeMap)) {
      if (userTypeMap[type] > currentMax) {
        currentMax = userTypeMap[type];
        mostCommonUserType = type;
      }
    }

    let maxLoginCount = 0;
    for (let login of logins) {
      if (login.eventBody.loginCount > maxLoginCount) {
        maxLoginCount = login.eventBody.loginCount;
      }
    }

    const firstUserCreateDt = sortedCreates[0].dateTime;
    const currentDay = moment().format("YYYY-MM-DDTHH:mm:ss");
    const firstDay = moment(firstUserCreateDt).format("YYYY-MM-DDTHH:mm:ss");
    const deltaDays = moment(currentDay).diff(firstDay, "days");

    const activityData = [
      `Avg New Daily Users - ${(creates.length / deltaDays).toFixed(2)}`,
      `Avg Daily Logins - ${(logins.length / deltaDays).toFixed(2)}`,
      `Highest Login Count - ${maxLoginCount}`
    ];
    const userData = [
      `Variety of User Types - ${Object.keys(userTypeMap).join(", ")}`,
      `User Type Mode - ${mostCommonUserType}`
    ];

    return { activityData, userData };
  } catch (error) {
    return error;
  }
};

export { healthCheck, fireEvent, getEventsInRange, getUsageStats };
