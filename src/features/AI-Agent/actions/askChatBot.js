import { privateAxios } from "../../../api";
import { errorToast } from "../../../utils/toastConfig";
import { AI_ENDPOINTS } from "../api/endpoints";

export default async function action({ request }) {
  const formData = await request.formData();
  const question = formData.get("question");
  const projectId = formData.get("projectId");

  try {
    const {
      data: { data },
    } = await privateAxios.post(AI_ENDPOINTS.askChatBot(projectId), {
      question,
    });

    return { responseText: data.response_text };
  } catch (err) {
    errorToast(err.response?.data?.message || "Failed to send question");
    return null;
  }
}
