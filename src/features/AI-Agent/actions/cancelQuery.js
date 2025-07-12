import { privateAxios } from "../../../api";
import { errorToast, successToast } from "../../../utils/toastConfig";
import { AI_ENDPOINTS } from "../api/endpoints";

export default async function action({ request }) {
  const formData = await request.formData();
  const projectId = formData.get("projectId");

  console.log("cancelQuery action called with projectId:", projectId);
  
  try {
    await privateAxios.post(AI_ENDPOINTS.cancelQuery(projectId));
    successToast("Schema changes canceled successfully");
    return null; // or any other response you want to return
  } catch (err) {
    errorToast(err.response?.data?.message || "Failed to cancel schema changes");
    return null;
  }
}
