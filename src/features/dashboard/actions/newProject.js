import { redirect } from "react-router-dom";
import { errorToast, successToast } from "../../../utils/toastConfig";
import { PROJECTS_ENDPOINTS } from "../api/endpoints";
import { privateAxios } from "../../../api";

export default async function action({ request }) {
  const formData = await request.formData();
  const projectName = formData.get("projectName");
  const projectDescription = formData.get("projectDescription");

  try {
    const { data } = await privateAxios.post(
      PROJECTS_ENDPOINTS.createProject(),
      {
        name: projectName,
        description: projectDescription,
      },
    );

    console.log(data.data);

    successToast("Project created successfully!");

    return redirect("/dashboard");
  } catch (err) {
    errorToast(err?.response?.data?.message || "Failed to create project");
    return redirect("/dashboard");
  }
}
