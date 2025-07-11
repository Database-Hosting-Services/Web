import { privateAxios } from "../../../api";
import { errorToast } from "../../../utils/toastConfig";
import { AI_ENDPOINTS } from "../api/endpoints";

export default async function action({ request }) {
  const formData = await request.formData();

  try {

    
  } catch (err) {
    errorToast(err.response?.data?.message || "Failed to send prompt");
    return null;
  }
}
