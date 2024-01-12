# 启动本地服务  

启动本地服务  

```bash
npm install

npm run dev
```
# 部署  

`
非常建议创建个vercel账号部署到vercel，个人使用额度几乎是用不完的。点一下下面按钮就开始部署了
`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgofxas%2Fnext-telegraph-image&amp;project-name=next-telegraph-image&amp;repository-name=next-telegraph-image)  

# 跨域接口测试  

```javascript

function testCors() {
  var ipt = document.createElement("input");
  ipt.type = "file";
  ipt.onchange = (e) => {
    const form = new FormData();
    form.append("file",ipt.files[0])
    fetch("http://localhost:3000/upload", {
      body: form,
      method: "POST",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };
  ipt.click()
}

```  
## 图片预览问题  
直接使用的nextjs rewrites 配置代理到源图地址。 因为走[nousedfile]这个路由的时候 会遇到GZIP压缩图片问题。导致图片显示不完整。  

# 开启资源审查 

在 `https://moderatecontent.com/`申请了key以后填写到`.env.production` 开启审查  
本地环境是 `.env.local` 文件  

[立即申请资源审查KEY](https://moderatecontent.com/signup) 


## 资源审查不可以原因！！！  
在vercel环境下。middleware使用了 edge runtime，无法读取 node环境变量。所以还是建议fork过去之后 在代码里面修改。