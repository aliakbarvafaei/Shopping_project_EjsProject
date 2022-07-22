var currentPage=parseInt((window.location.href).substring((window.location.href).indexOf("pages")+6));
if(!(window.location.href).includes("pages"))
  currentPage=1;
var index=0;
var numSlider= screen.width<1000? 3:4;
var categories_item = document.querySelectorAll('.categories-item');
var cards_Slider=document.querySelectorAll(".card_slider");
var pageLinks=document.querySelectorAll(".page-link");
var timer=setInterval(function () {nextSlide();}, 3000);
var selected_products=[];

// category
for(let i=0;i<categories_item.length;i++){
  categories_item[i].addEventListener('click',()=> {
    for(let k=0;k<categories_item.length;k++){
      categories_item[k].classList.remove('selected-category');
    }
    categories_item[i].classList.add('selected-category');
  })
}


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

// cart-product
const renderCartProducts= ()=>{
  var parent=document.querySelector('.shopping-cart-items');
  var totalPrice=document.querySelector('.main-color-text');
  if(selected_products.length==0)
  {
    parent.innerHTML="<p></p><p>There is not any Product</p>";
    totalPrice.innerHTML='$0';
  }
  else{
    parent.innerHTML="";
    var sum=0;
    for(let i=0;i<selected_products.length;i++)
    {
      var New = document.createElement("li");
      New.innerHTML=`<title style="display:none;">${selected_products[i].id}</title><img src="${selected_products[i].img}" alt="item1" />
      <div class="detail-product-cart">
        <span class="item-name">${selected_products[i].title.substring(0,18)}...</span>
        <span class="item-price"><span class="quantity">${selected_products[i].quantity}x</span><span class="price"> $${selected_products[i].price}</span></span>
      </div>
      <div class="plus-minus-cart">
        <i class="fa fa-minus minus-button-cart" aria-hidden="true"></i>
        <input type="button" disabled name="" value="${selected_products[i].quantity}" class="range-product-cart">
        <i class="fa fa-plus plus-button-cart" aria-hidden="true"></i>
      </div>`;
      New.classList.add("item-cart");
      parent.appendChild(New);
      sum+=parseFloat(selected_products[i].price*selected_products[i].quantity);
    }
    totalPrice.innerHTML=`$${sum}`;
  }
};

/* show and hide cart */
document.querySelector('#cart').addEventListener('click', function handleClick(event) {
  /* hide cart */
  if((((event.target).classList.contains('fa-shopping-cart')) || event.target.id=="cart" ||  event.target.id=="cart-icon") && document.querySelector('.container-cart').style.display=='block'){
    document.querySelector('.container-cart').style.display='none';
  }
  else {
    /* show cart */
    renderCartProducts();
    document.querySelector('.container-cart').style.display='block';

    /* minus quantity of product in cart */
    document.querySelectorAll('.minus-button-cart').forEach((item, i) => {
      item.addEventListener('click',(event)=>{
        if(((event.target).parentElement).children[1].value==1)
        {
          for(let i=0;i<selected_products.length;i++)
          {
            if(selected_products[i].id==((((event.target).parentElement).parentElement).children[0].innerHTML))
            {
              selected_products.splice(i, 1);
              break;
            }
          }
        }
        else{
          for(let i=0;i<selected_products.length;i++)
          {
            if(selected_products[i].id==((((event.target).parentElement).parentElement).children[0].innerHTML)){
              selected_products[i].quantity=parseInt(selected_products[i].quantity)-1;
              break;
            }
          }
          ((event.target).parentElement).children[1].value=parseInt(((event.target).parentElement).children[1].value)-1;
        }

        /* update quantity of slider product */
        document.querySelectorAll('.card_slider').forEach((items, i) => {
            if(items.children[0].innerHTML==((((event.target).parentElement).parentElement).children[0].innerHTML))
            {
              if(parseInt(items.children[3].children[1].children[1].value)>1)
                items.children[3].children[1].children[1].value=parseInt(items.children[3].children[1].children[1].value)-1;
              else{
                items.children[3].children[1].style.display="none";
                items.children[3].children[0].style.display="block";
              }
            }
        });

        /* update quantity of main-product */
        var post_main_product=document.querySelector('#main-products').children[2].children;
        for(let i=0;i<post_main_product.length;i++){
          if(post_main_product[i].children[0].innerHTML==((((event.target).parentElement).parentElement).children[0].innerHTML))
          {
            if(parseInt(post_main_product[i].children[3].children[1].children[1].value)>1)
              post_main_product[i].children[3].children[1].children[1].value=parseInt(post_main_product[i].children[3].children[1].children[1].value)-1;
            else{
              post_main_product[i].children[3].children[1].style.display="none";
              post_main_product[i].children[3].children[0].style.display="block";
            }
          }
        }
      });
    });

    /* add quantity of product in cart */
    document.querySelectorAll('.plus-button-cart').forEach((item, i) => {
      item.addEventListener('click',(event)=>{
          for(let i=0;i<selected_products.length;i++)
          {
            if(selected_products[i].id==((((event.target).parentElement).parentElement).children[0].innerHTML)){
              selected_products[i].quantity=parseInt(selected_products[i].quantity)+1;
              break;
            }
          }
          ((event.target).parentElement).children[1].value=parseInt(((event.target).parentElement).children[1].value)+1;

          /* update quantity of slider product */
          document.querySelectorAll('.card_slider').forEach((items, i) => {
              if(items.children[0].innerHTML==((((event.target).parentElement).parentElement).children[0].innerHTML))
              {
                  items.children[3].children[1].children[1].value=parseInt(items.children[3].children[1].children[1].value)+1;
              }
          });

          /* update quantity of main-product */
          var post_main_product=document.querySelector('#main-products').children[2].children;
          for(let i=0;i<post_main_product.length;i++){
            if(post_main_product[i].children[0].innerHTML==((((event.target).parentElement).parentElement).children[0].innerHTML))
            {
                post_main_product[i].children[3].children[1].children[1].value=parseInt(post_main_product[i].children[3].children[1].children[1].value)+1;
            }
          }
      });
    });
  }
});

/* add product to cart */
document.querySelectorAll('.button-addToCart').forEach((item, i) => {
  item.addEventListener('click',(event)=>{

    /* hide button-addToCart and show numbers */
    var x=false;
    for(let i=0;i<selected_products.length;i++)
    {
      if(selected_products[i].id== (((event.target).parentElement).parentElement).children[0].innerHTML)
      {
        selected_products[i].quantity+=1;
        ((event.target).parentElement).children[1].style.display="flex";
        item.style.display="none";
        x=true;
        break;
      }
    }
    if(x==false){
      const id_product= (((event.target).parentElement).parentElement).children[0].innerHTML;
      const img_src= (((event.target).parentElement).parentElement).children[1].src;
      const title_product= (((event.target).parentElement).parentElement).children[2].children[0].innerHTML;
      const price_product= (((event.target).parentElement).parentElement).children[2].children[1].innerHTML;
      selected_products.push({ id:id_product, img:img_src, title:title_product, price:price_product.substring(1), quantity:parseInt(1) });
      ((event.target).parentElement).children[1].style.display="flex";
      item.style.display="none";
    }

    /* if product selected in main-product then update quantity of slider product */
    if((((event.target).parentElement).parentElement).parentElement.parentElement.id=="main-products"){
      document.querySelectorAll('.card_slider').forEach((items, i) => {
          if(items.children[0].innerHTML==(((event.target).parentElement).parentElement).children[0].innerHTML)
          {
            if(items.children[3].children[0].style.display!="none")
            {
              items.children[3].children[0].style.display="none";
              items.children[3].children[1].style.display="flex";
            }
            else {
              items.children[3].children[1].children[1].value=parseInt(items.children[3].children[1].children[1].value)+1;
            }
          }
      });
    }

    /* if product selected in slider product then update quantity of main-product */
    else{
      var post_main_product=document.querySelector('#main-products').children[2].children;
      for(let i=0;i<post_main_product.length;i++){
        if(post_main_product[i].children[0].innerHTML==(((event.target).parentElement).parentElement).children[0].innerHTML)
        {
          if(post_main_product[i].children[3].children[0].style.display!="none")
          {
            post_main_product[i].children[3].children[0].style.display="none";
            post_main_product[i].children[3].children[1].style.display="flex";
          }
          else {
            post_main_product[i].children[3].children[1].children[1].value=parseInt(post_main_product[i].children[3].children[1].children[1].value)+1;
          }
        }
      }
    }
  });
});

/* minus quantity product */
document.querySelectorAll('.minus-button').forEach((item, i) => {
  item.addEventListener('click',(event)=>{

    /* update quantity of product */
    if(((event.target).parentElement).children[1].value==1)
    {
      for(let i=0;i<selected_products.length;i++)
      {
        if(selected_products[i].id==((((event.target).parentElement).parentElement).parentElement).children[0].innerHTML){
          selected_products.splice(i, 1);
          break;
        }
      }
      ((event.target).parentElement).parentElement.children[0].style.display="block";
      ((event.target).parentElement).style.display="none";
    }
    else{
      for(let i=0;i<selected_products.length;i++)
      {
        if(selected_products[i].id==((((event.target).parentElement).parentElement).parentElement).children[0].innerHTML){
          selected_products[i].quantity=parseInt(selected_products[i].quantity)-1;
          break;
        }
      }
      ((event.target).parentElement).children[1].value=parseInt(((event.target).parentElement).children[1].value)-1;
    }

    /* if product selected in main-product then update quantity of slider product */
    if((((event.target.parentElement).parentElement).parentElement).parentElement.parentElement.id=="main-products"){
      document.querySelectorAll('.card_slider').forEach((items, i) => {
          if(items.children[0].innerHTML==(((event.target.parentElement).parentElement).parentElement).children[0].innerHTML)
          {
            if(parseInt(items.children[3].children[1].children[1].value)>1)
              items.children[3].children[1].children[1].value=parseInt(items.children[3].children[1].children[1].value)-1;
            else {
              items.children[3].children[0].style.display="block";
              items.children[3].children[1].style.display="none";
            }
          }
      });
    }

    /* if product selected in slider product then update quantity of main-product */
    else{
      var post_main_product=document.querySelector('#main-products').children[2].children;
      for(let i=0;i<post_main_product.length;i++){
        if(post_main_product[i].children[0].innerHTML==(((event.target.parentElement).parentElement).parentElement).children[0].innerHTML)
        {
          if(parseInt(post_main_product[i].children[3].children[1].children[1].value)>1)
            post_main_product[i].children[3].children[1].children[1].value=parseInt(post_main_product[i].children[3].children[1].children[1].value)-1;
          else{
            post_main_product[i].children[3].children[1].style.display="none";
            post_main_product[i].children[3].children[0].style.display="block";
          }
        }
      }
    }
  });
});

/* add quantity product */
document.querySelectorAll('.plus-button').forEach((item, i) => {
  item.addEventListener('click',(event)=>{

      /* update quantity of product */
      for(let i=0;i<selected_products.length;i++)
      {
        if(selected_products[i].id==((((event.target).parentElement).parentElement).parentElement).children[0].innerHTML){
          selected_products[i].quantity=parseInt(selected_products[i].quantity)+1;
          break;
        }
      }
      ((event.target).parentElement).children[1].value=parseInt(((event.target).parentElement).children[1].value)+1;

      /* if product selected in main-product then update quantity of slider product */
      if((((event.target.parentElement).parentElement).parentElement).parentElement.parentElement.id=="main-products"){
        document.querySelectorAll('.card_slider').forEach((items, i) => {
            if(items.children[0].innerHTML==(((event.target.parentElement).parentElement).parentElement).children[0].innerHTML)
            {
                items.children[3].children[1].children[1].value=parseInt(items.children[3].children[1].children[1].value)+1;
            }
        });
      }

      /* if product selected in slider product then update quantity of main-product */
      else{
        var post_main_product=document.querySelector('#main-products').children[2].children;
        for(let i=0;i<post_main_product.length;i++){
          if(post_main_product[i].children[0].innerHTML==(((event.target.parentElement).parentElement).parentElement).children[0].innerHTML)
          {
              post_main_product[i].children[3].children[1].children[1].value=parseInt(post_main_product[i].children[3].children[1].children[1].value)+1;
          }
        }
      }
  });
});
