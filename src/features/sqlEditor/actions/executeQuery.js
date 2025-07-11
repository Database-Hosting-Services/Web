import { privateAxios } from "../../../api";
import { errorToast } from "../../../utils/toastConfig";

import { SQL_EDITOR_ENDPOINTS } from "../api/endpoints";

export default async function action({ request }) {
  const formData = await request.formData();
  const query = formData.get("query");
  const projectId = formData.get("projectId");

  try {
    const {
      data: { data },
    } = await privateAxios.post(SQL_EDITOR_ENDPOINTS.runQuery(projectId), {
      query,
    });

    console.log(data);
    return { result: data.result };
  } catch (err) {
    errorToast(err?.response?.data?.message || "Failed to execute query");
    return { error: err?.response?.data?.error || "Unknown error occurred" };
  }
}
