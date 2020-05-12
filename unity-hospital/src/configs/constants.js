// Constants.js
const prod = {
  url: {
    API_URL: "https://unity-hospital.com/api-events",
    API_URL_USERS: "https://unity-hospital.com/api-users"
  }
};
const dev = {
  url: {
    EVENT_API_URL: "http://localhost:8080/api-events",
    USER_API_URL: "http://localhost:8080/api-users"
  }
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;
