var currentPage=parseInt((window.location.href).substring((window.location.href).indexOf("pages")+6));
if(!(window.location.href).includes("pages"))
  currentPage=1;
var index;
function readTextFile()
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "/js/file.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                index = rawFile.responseText;
                //console.log(index);
            }
        }
    }
    rawFile.send(null);
}
function writeTextFile()
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/js/file', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Request finished. Do processing here.
      }
    }
    xhr.send("foo=bar&lorem=ipsum");

    console.log("adxw");
}


document.querySelector('.pre-button').addEventListener('click', function handleClick(event) {
   readTextFile();
   index=10;
   writeTextFile();
 });
document.querySelector('.next-button').addEventListener('click', function handleClick(event) {
 });

const renderPageNumberButton = () =>{
  if(currentPage>3)
  {
    var pageLinks=document.querySelectorAll(".page-link");
    for(let i=1;i<4;i++)
    {
      pageLinks[i].id = "pages_" + (currentPage-3+i);
      pageLinks[i].href = "/pages/" + (currentPage-3+i);
      pageLinks[i].innerHTML = (currentPage-3+i);
    }
  }
};
renderPageNumberButton();
var pageLinks=document.querySelectorAll(".page-link");
for(let i=0;i<pageLinks.length;i++){
  pageLinks[i].addEventListener("click", () => {
    if(pageLinks[i].id == "page_pre")
    {
      currentPage=parseInt(currentPage)-1;
      pageLinks[i].href=currentPage;
    }
    else if(pageLinks[i].id == "page_next")
    {
      currentPage=parseInt(currentPage)+1;
      if(!(window.location.href).includes("pages"))
        currentPage="pages/"+currentPage;
      pageLinks[i].href=currentPage;
    }
    else{
      currentPage=(pageLinks[i].id).substring(5);
    }
  });
};
