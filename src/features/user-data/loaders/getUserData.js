import { privateAxios } from "../../../api";
import { errorToast } from "../../../utils/toastConfig";
import { USER_DATA_ENDPOINTS } from "../api/endpoints";

const loader = async () => {
  try {
    const {
      data: { data },
    } = await privateAxios.get(USER_DATA_ENDPOINTS.getUserData());

    return {
      userName: data.username,
      email: data.email,
      id: data.oid,
      image: data.image || "",
    };
  } catch (err) {
    errorToast(err?.response?.data?.message || "Failed to fetch user data");
    return null;
  }
};

export default loader;
