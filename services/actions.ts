"use server";

export async function handleData({ formData }: { formData: FormData }) {
  const query = formData.get("query");
  const queryData = {
    input_query: query,
    input_query_type: "",
    sort_by: "default",
    status: [],
    exact_match: false,
    date_query: false,
    owners: [],
    attorneys: [],
    law_firms: [],
    mark_description_description: [],
    classes: [],
    page: 1,
    rows: 10,
    sort_order: "desc",
    states: [],
    counties: [],
  };
  const response = await fetch(
    `https://vit-tm-task.api.trademarkia.app/api/v3/us`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryData }),
    }
  );
  const result = await response.json();
  return result;
}
