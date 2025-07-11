import { privateAxios } from "../../../api";
import { errorToast } from "../../../utils/toastConfig";
import { AI_ENDPOINTS } from "../api/endpoints";

import { getTableDataAndEdges } from "../../schema-visualizer/utils";
import { tmpFetchedTables2, tmpGymManagementData } from "../../schema-visualizer/data/tmp";

const tmpText = `
## First Step
- Do that
- then that
- and everything will be ok

## Second step
\`npm i hello-world bommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm\`

## Third step
[ ] good
[ ] nice
`;

export default async function action({ request }) {
  const formData = await request.formData();
  const prompt = formData.get("question");
  const projectId = formData.get("projectId");

  await new Promise((resolve) => {
    setTimeout(() => resolve(""), 2000);
  });

  // const theTables = JSON.parse(tmpGymManagementData);
  // console.log(theTables);
  

  return {
    responseText: tmpText,
    newSchema: getTableDataAndEdges(tmpFetchedTables2),
  };

  try {
    const {
      data: { data },
    } = await privateAxios.post(AI_ENDPOINTS.sendPrompt(projectId), {
      prompt,
    });

    console.log(data);

    return {
      responseText: data.response,
      newSchema: getTableDataAndEdges(data.schema_changes),
    };
  } catch (err) {
    errorToast(
      err.response?.data?.message || err.message || "Failed to send prompt",
    );
    return { responseText: "## Error, please try again later", newSchema: [] };
  }
}
