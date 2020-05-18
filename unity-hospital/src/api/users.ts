import { createApi } from "./middleware";
import { fireEvent } from "./events";
const { REACT_APP_USER_API } = process.env;

const userApi = createApi(REACT_APP_USER_API as string);

const createUser = async (user: any) => {
  try {
    await userApi("/users", "POST", user);

    return user;
  } catch (e) {
    return e;
  }
};

const getUser = async (auth0User: any) => {
  const { authId, userType } = auth0User;

  try {
    const {
      data: { user }
    } = await userApi(`/users/${authId}`, "GET");

    return user;
  } catch ({ response: { status, ...e } }) {
    if (status === 404) {
      const user = await createUser(auth0User);
      await fireEvent({
        eventType: "USER_CREATE",
        eventDetails: { ...user, userType }
      });
      return user;
    }
    return e;
  }
};

export { createUser, getUser };
