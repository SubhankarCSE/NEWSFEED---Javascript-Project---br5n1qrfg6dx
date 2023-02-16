
const latest_News = document.getElementById("latest");
const loadnews = document.getElementById("loadnews");
const categoryNews = document.getElementById("categoryNews");
const category = document.getElementById("all-category");
const allNews = document.querySelector(".allNews");
const categoryWise = document.querySelectorAll(".category-wise");
const homeList =document.querySelector('.home-list');
const open =document.querySelector('.fa-bars');
open.addEventListener('click',()=>{
    open.classList.add('hideBar');
    homeList.classList.remove('hideBar');
})
homeList.addEventListener('click',()=>{
  homeList.classList.add('hideBar');
    open.classList.remove('hideBar');
})
// ------------------------------all news call----------------------------------------------

latest_News.addEventListener("click",()=>{
       getData("all"); 
   
})
loadnews.addEventListener("click",()=>{
  location.reload();

})
// ------------------------------load news----------------------------------------------
    const addNews = JSON.parse(localStorage.getItem("loadNews")) || []; 
  const addDownloadNews = (author,title,content,imageUrl,readMoreUrl,date,id)=>{
  addNews.push({
    author,
    title,
    content,
    imageUrl,
    readMoreUrl,
    date,
    id,
  });
  localStorage.setItem("loadNews",JSON.stringify(addNews));
  };
  addNews.forEach((el)=>{
    const {author,title,content,imageUrl,readMoreUrl,date,id} = el;
     loadBox(author,title,content,imageUrl,readMoreUrl,date,id);
  })
  let count = 0;
  function removestudents(deleteitem){
    addNews.forEach((el)=>{
             const{id} = el;
             if(id == deleteitem){
              addNews.splice(count,1);
              location.reload();
             }
             count++;
    })
    count=0;
    localStorage.setItem("loadNews",JSON.stringify(addNews));
  }
  function loadBox(author,title,content,imageUrl,readMoreUrl,date,id){
    let section = document.createElement("section");
    section.classList.add('news-display');
    let div1 = document.createElement("div");
    div1.classList.add("image-box");
    let img = document.createElement("img")
    img.src=imageUrl;
    div1.appendChild(img);
    let div2 = document.createElement("div");
    div2.classList.add("other-details");
    let p1 = document.createElement("p");
    p1.classList.add("authorname");
    p1.innerText = `BY :`+ author;
    let p2 = document.createElement("p");
    p2.classList.add("title");
    p2.innerText =`Topic :`+title;
    let p3 = document.createElement("p");
    p3.classList.add("content");
    p3.innerText = content;
    let a = document.createElement("a");
    a.href =readMoreUrl;
    a.classList.add("read-more");
    a.target = "_blank";
    a.innerText = "read more";
    let div3 = document.createElement("div");
    div3.classList.add("date-like");
    let p4 = document.createElement("p");
    p4.classList.add("date");
    p4.innerText = date;
    let i2 = document.createElement("i");
    i2.classList.add("fa-solid");
    i2.classList.add("fa-trash");
    i2.addEventListener("click",()=>{
     removestudents(id);
    })
    for(let el of [p4,i2]){
        div3.appendChild(el);
    }
    for(let ele of [p1,p2,p3,a,div3]){
        div2.appendChild(ele);
    }
    for(let element of [div1,div2]){
        section.appendChild(element);
    }
    allNews.appendChild(section);
  }
// -----------------------------------category --------------------------------------
categoryNews.addEventListener("click",()=>{
  category.classList.toggle("hide-category");
})

categoryWise.forEach((item)=>{
 item.addEventListener('click',()=>{
    getData(item.innerText);
    })
})

// -----------------------------------get data api--------------------------------------

async function getData(topicNews){
        allNews.innerHTML="";
      fetch(`https://inshorts.deta.dev/news?category=${topicNews}`)
      .then(response => response.json())
       .then(allData => dataItem(allData))
           
}
function dataItem(allData){
    const data = allData.data;
    data.map(el => takeValue(el));
}
function takeValue(el){
   const {author,title,content,imageUrl,readMoreUrl,date,id} = el;
   createBox(author,title,content,imageUrl,readMoreUrl,date,id);
}
const addLikes = JSON.parse(localStorage.getItem("addLikes")) || []; 
function addLikesBtn(id){
addLikes.forEach((el)=>{
   if(el==id){
     return true;
    }
 })
 return false;
}
  function createBox(author,title,content,imageUrl,readMoreUrl,date,id){
        let section = document.createElement("section");
        section.classList.add('news-display');
        let div1 = document.createElement("div");
        div1.classList.add("image-box");
        let img = document.createElement("img")
        img.src=imageUrl;
        div1.appendChild(img);
        let div2 = document.createElement("div");
        div2.classList.add("other-details");
        let p1 = document.createElement("p");
        p1.classList.add("authorname");
        p1.innerText = `BY :`+ author;
        let p2 = document.createElement("p");
        p2.classList.add("title");
        p2.innerText =`Topic :`+title;
        let p3 = document.createElement("p");
        p3.classList.add("content");
        p3.innerText = content;
        let a = document.createElement("a");
        a.href =readMoreUrl;
        a.classList.add("read-more");
        a.target = "_blank";
        a.innerText = "read more";
        let div3 = document.createElement("div");
        div3.classList.add("date-like");
        let p4 = document.createElement("p");
        p4.classList.add("date");
        p4.innerText = date;
        let i = document.createElement("i");
        i.classList.add("fa-solid");
        i.classList.add("fa-heart");
        const result = addLikesBtn(id);
         checkLikes(result);
         function checkLikes(value){
          if(value == true){
         i.classList.add("faheartchange");
        }
         else{
           i.classList.remove("faheartchange");
         }
        }
        i.addEventListener("click",()=>{
         let value = addLike(id);
         checkLikes(value);

         function checkLikes(value){
           if(value == true){
          i.classList.add("faheartchange");
         }
          else{
            i.classList.remove("faheartchange");
          }
         }
        })
        let i2 = document.createElement("i");
        i2.classList.add("fa-solid");
        i2.classList.add("fa-download");
        i2.addEventListener("click",()=>{
          i2.classList.add("hide-download")
          addDownloadNews(author,title,content,imageUrl,readMoreUrl,date,id) ;
        })
        for(let el of [p4,i,i2]){
            div3.appendChild(el);
        }
        for(let ele of [p1,p2,p3,a,div3]){
            div2.appendChild(ele);
        }
        for(let element of [div1,div2]){
            section.appendChild(element);
        }
        allNews.appendChild(section);
    }
    const addLike = (idItem)=>{
     let counter = 0;
      let round = false;
      addLikes.forEach((id)=>{
               if(id == idItem){
                addLikes.splice(counter,1);
                round = true;
               }
               counter++;
      })
      counter=0;
      if(round==true){
        localStorage.setItem("addLikes",JSON.stringify(addLikes));
        return false;
      }
      else{
        addLikes.push(idItem);
        localStorage.setItem("addLikes",JSON.stringify(addLikes));
        return true;
      }
    };


