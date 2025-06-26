import { redirect } from "react-router-dom";
import { successToast } from "../../../utils/toastConfig";

export default async function action({ request }) {
  const formData = await request.formData();
  const projectName = formData.get("projectName");
  const projectDescription = formData.get("projectDescription");

  // Perform any necessary actions with the project data
  console.log("Project Name:", projectName);
  console.log("Project Description:", projectDescription);

  successToast("Project created successfully!");

  return redirect("/dashboard");
}
