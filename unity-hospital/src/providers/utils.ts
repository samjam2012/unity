import { User } from "../interfaces/auth";

export const normalizeUser = (rawUserObj: any) => {
  const parseName = (name: string) => {
    let firstName = name.split(" ")[0];
    let lastName = name.split(" ")[1];

    if (!lastName) {
      lastName = firstName;
      firstName = "";
    }

    return {
      firstName,
      lastName
    };
  };

  const userObject = {};
  for (const key in rawUserObj) {
    if (key.endsWith("/role")) {
      userObject["userType"] = rawUserObj[key].toUpperCase();
      continue;
    } else if (key.endsWith("/loginCount")) {
      userObject["loginCount"] = rawUserObj[key];
    }

    switch (key) {
      case "sub":
        userObject["authId"] = rawUserObj[key].split("auth0|")[1];
        break;
      case "email_verified":
        userObject["emailVerified"] = rawUserObj[key];
        break;
      case "name":
        const { firstName, lastName } = parseName(rawUserObj[key]);
        userObject["firstName"] = firstName;
        userObject["lastName"] = lastName;
        break;
      case "updated_at":
        userObject["updatedAt"] = rawUserObj[key];
        break;
      default:
        userObject[key] = rawUserObj[key];
        break;
    }
  }

  const {
    authId,
    email,
    firstName,
    lastName,
    userType,

    emailVerified,
    loginCount,
    updatedAt
  } = userObject as any;

  const normalizedUserObj: User = {
    authId,
    email,
    firstName,
    lastName,
    userType,

    emailVerified,
    loginCount,
    updatedAt
  };

  return normalizedUserObj;
};
