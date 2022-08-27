import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import articlesService from "../services/articlesService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // context : 프로그램 접근 정보, httprequest : 브라우저에서 전달되는 데이터
    let response; // 최종 결과물 return 하는 객체

    try {
      const article = req.body;
      const result = await articlesService.create(article); // 단일 data 처리하는
      response = { body: result, status: 200 };
    } catch (err) {
      response = { body: err.message, status: 500 };
    }
  
    context.res = response;
};

export default httpTrigger;