var currentPage=parseInt((window.location.href).substring((window.location.href).indexOf("pages")+6));
if(!(window.location.href).includes("pages"))
  currentPage=1;
var index=0;
var numSlider= screen.width<1000? 3:4;
var categories_item = document.querySelectorAll('.categories-item');
var cards_Slider=document.querySelectorAll(".card_slider");
var pageLinks=document.querySelectorAll(".page-link");
var timer=setInterval(function () {nextSlide();}, 3000);

// category
for(let i=0;i<categories_item.length;i++){
  categories_item[i].addEventListener('click',()=> {
    for(let k=0;k<categories_item.length;k++){
      categories_item[k].classList.remove('selected-category');
    }
    categories_item[i].classList.add('selected-category');
  })
}

// show or hide password
document.querySelectorAll('.password-display').forEach((item, i) => {
  item.addEventListener('click',(event)=>{
    item.classList.toggle("fa-eye");
    item.classList.toggle("fa-eye-slash");
    const type=(event.target).parentElement.parentElement.children[0].getAttribute("type") === "password" ? "text" : "password";
    (event.target).parentElement.parentElement.children[0].setAttribute("type", type);
  });
});

// set scroll
window.scrollBy(0, parseFloat(document.getElementById("scollIndex").innerHTML));

// for toast massege
$('.autoToast').toast("show");

// slider
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
renderSlider("middle");

// page number
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

$(document).on('click', '.dropdown-menu', function (e) {
  e.stopPropagation();
});

/* show and hide cart */
document.querySelector('#cart-icon').addEventListener('click', function handleClick(event) {

    /* minus quantity of product in cart */
    document.querySelectorAll('.minus-button-cart').forEach((item, i) => {
      item.addEventListener('click',(event)=>{
        const action_post=item.parentElement.parentElement.parentElement.action;
        item.parentElement.parentElement.parentElement.action+=`/minus/${window.pageYOffset}`;
        item.parentElement.parentElement.parentElement.submit();
        setTimeout(()=>{item.parentElement.parentElement.parentElement.action=action_post;},500);
      });
    });
    /* add quantity of product in cart */
    document.querySelectorAll('.plus-button-cart').forEach((item, i) => {
      item.addEventListener('click',(event)=>{
        const action_post=item.parentElement.parentElement.parentElement.action;
        item.parentElement.parentElement.parentElement.action+=`/add/${window.pageYOffset}`;
        item.parentElement.parentElement.parentElement.submit();
        setTimeout(()=>{item.parentElement.parentElement.parentElement.action=action_post;},500);
      });
    });
});

/* add product to cart */
document.querySelectorAll('.button-addToCart').forEach((item, i) => {
  item.addEventListener('click',(event)=>{
        const action_post=item.parentElement.parentElement.action;
        item.parentElement.parentElement.action+=`/add/${window.pageYOffset}`;
        item.parentElement.parentElement.submit();
        setTimeout(()=>{item.parentElement.parentElement.action=action_post;},500);
  });
});

/* minus quantity product */
document.querySelectorAll('.minus-button').forEach((item, i) => {
  item.addEventListener('click',(event)=>{
    const action_post=item.parentElement.parentElement.parentElement.action;
    item.parentElement.parentElement.parentElement.action+=`/minus/${window.pageYOffset}`;
    item.parentElement.parentElement.parentElement.submit();
    setTimeout(()=>{item.parentElement.parentElement.parentElement.action=action_post;},500);
  });
});

/* add quantity product */
document.querySelectorAll('.plus-button').forEach((item, i) => {
  item.addEventListener('click',(event)=>{
    const action_post=item.parentElement.parentElement.parentElement.action;
    item.parentElement.parentElement.parentElement.action+=`/add/${window.pageYOffset}`;
    item.parentElement.parentElement.parentElement.submit();
    setTimeout(()=>{item.parentElement.parentElement.parentElement.action=action_post;},500);
  });
});
