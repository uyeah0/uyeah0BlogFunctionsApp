import { CosmosClient } from "@azure/cosmos";

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const articleService = {
    init() { // db 영역 초기화
      try {
        this.client = new CosmosClient(CONNECTION_STRING); 
        this.database = this.client.database("uyeah0nodeBlogDB");
        this.container = this.database.container("articles"); // 비정형 데이터 가능
      } catch (err) {
        console.log(err.message);
      }
    },
    async create(articleToCreate) { // 단일 게시글 정보 
      const { resource } = await this.container.items.create(articleToCreate);
      return resource;
    },
    async readAll(): Promise<string> { // 모두 읽기
      const iterator = this.container.items.readAll(); // 읽기만 함
      const { resources } = await iterator.fetchAll(); // json으로 나옴
      return resources;
    },
    async read(id,ipaddress): Promise<string> { // 단일 게시글 불러오기
      const item = this.container.item(id,ipaddress); // item을 해주면 이에 맞는 하나를 return
      const article = await item.read();
      return article.resource;
    },
    async update(article) { // 수정 데이터 json으로 받기
      const { resource } = await this.container.item(article.id)
        .replace(article); // 수정한 것을 조회한 것으로 바꿔줌
      return resource;
    },
    async delete(id,ipaddress) { // 해당하는 조건 삭제
      const result = await this.container.item(id,ipaddress).delete();
    },
  };
  
  articleService.init(); 
  
  export default articleService; 