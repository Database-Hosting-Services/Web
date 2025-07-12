import { privateAxios } from "../../../api";
import { errorToast, successToast } from "../../../utils/toastConfig";
import { AI_ENDPOINTS } from "../api/endpoints";

export default async function action({ request }) {
  const formData = await request.formData();
  const projectId = formData.get("projectId");

  console.log("acceptQuery action called with projectId:", projectId);

  try {
    await privateAxios.post(AI_ENDPOINTS.acceptQuery(projectId));
    successToast("Schema changes accepted successfully");
    return null; // or any other response you want to return
  } catch (err) {
    errorToast(err.response?.data?.message || "Failed to accept schema changes");
    return null;
  }
}
