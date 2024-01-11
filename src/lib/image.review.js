export default async function checkimg(url) {
  const fetchUrl = `https://api.moderatecontent.com/moderate/?key=${process.env.IMGKEY}&url=https://telegra.ph/${url.pathname}${url.search}`;
  const response = await fetch(fetchUrl);
  let moderate_data = await response.json();
  if (moderate_data.rating_label == "adult") {
    return true;
  }
  return false;
}
