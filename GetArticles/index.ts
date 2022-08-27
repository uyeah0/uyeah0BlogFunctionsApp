import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import articlesService from "../services/articlesService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  let response;

  try {
    let articles = await articlesService.readAll();
    response = { body: articles, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};

export default httpTrigger;