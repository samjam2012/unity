import { userApi } from ".";

const createUser = async (user: any) => {
  try {
    const { data } = await userApi("/users", "POST", user);

    console.log(data);
  } catch (e) {
    return e;
  }
};

const getUser = async (authId: string) => {
  try {
    const {
      data: { user }
    } = await userApi(`/users/${authId}`, "GET");
    return user;
  } catch (e) {
    return e;
  }
};

export { createUser, getUser };
