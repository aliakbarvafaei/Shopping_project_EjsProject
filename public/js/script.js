var currentPage=parseInt((window.location.href).substring((window.location.href).indexOf("pages")+6));
if(!(window.location.href).includes("pages"))
  currentPage=1;
var index=0;
var numSlider= screen.width<1000? 3:4;
var categories_item = document.querySelectorAll('.categories-item');
var cards_Slider=document.querySelectorAll(".card_slider");
var pageLinks=document.querySelectorAll(".page-link");
var timer=setInterval(function () {nextSlide();}, 3000);

for(let i=0;i<categories_item.length;i++){
  categories_item[i].addEventListener('click',()=> {
    for(let k=0;k<categories_item.length;k++){
      categories_item[k].classList.remove('selected-category');
    }
    categories_item[i].classList.add('selected-category');
  })
}

document.querySelector('.pre-button').addEventListener('click', function handleClick(event) {
  clearInterval(timer);
  timer=setInterval(function () {nextSlide();}, 3000);;
  preSlide();
});
document.querySelector('.next-button').addEventListener('click', function handleClick(event) {
  clearInterval(timer);
  timer=setInterval(function () {nextSlide();}, 3000);;
  nextSlide();
});

const nextSlide= ()=>{
  index++;
  if(index>=cards_Slider.length)
    index=0;
  renderSlider("left");
};
const preSlide= ()=>{
  index--;
  if(index<0)
    index=cards_Slider.length-1;
  renderSlider("right");
};

const renderSlider = (dir) =>{
  for(let i=index-1;i<cards_Slider.length+index+1;i++)
  {
    if(i>=index-1 && i<index+numSlider+1){
      if(i<0 || (i==index+numSlider && dir!="right") || (i==index-1 && dir!="left")){
        if(index-1<0 && i<0){
          cards_Slider[cards_Slider.length-1].classList.add("fade-out-left");
          setTimeout(()=>{cards_Slider[cards_Slider.length-1].style.display="none"},1000);
        }
        continue;
      }
      const temp=cards_Slider[i%cards_Slider.length];
      temp.style.display="block";
      temp.classList.remove("ToRight");
      temp.classList.remove("ToLeft");
      temp.classList.remove("fade-in-left");
      temp.classList.remove("fade-out-left");
      temp.classList.remove("fade-in-right");
      temp.classList.remove("fade-out-right");
      if(dir=="left"){
        if(i==index-1){
          temp.classList.add("fade-out-left");
          setTimeout(()=>{temp.style.display="none";},1000);
        }
        else if(i==index+numSlider-1)
          temp.classList.add("fade-in-left");
        else
          temp.classList.add("ToLeft");
      }
      else if(dir=="right"){
        if(i==index+numSlider){
          temp.classList.add("fade-out-right");
          setTimeout(()=>{temp.style.display="none";},1000);
        }
        else if(i==index)
          temp.classList.add("fade-in-right");
        else
          temp.classList.add("ToRight");
      }
      if(i>0)
        cards_Slider[(i-1)%cards_Slider.length].after(temp);
      else
        document.querySelectorAll(".row_posts")[1].append(temp);
    }
  }
};

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


renderPageNumberButton();
renderSlider("middle");
