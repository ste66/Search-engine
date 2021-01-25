window.onload = () => {
    // any code will be written here gonna be executed after the full page loaded

    const searchInput = document.querySelector("#searchInput")

// add key up event listener
searchInput.addEventListener("keyup", e => {
// console.log(e);
if(e.keyCode === 13){

    // reset pagging to 1
    pageNumInput.value= 1
    // call search function here
    search()
}
})

// add***

// get search button
const searchBtn = document.querySelector('#searchBtn')

// add click event on search button
searchBtn.addEventListener('click', () => {

    // rest pagging to 1
    pageNumInput.value = 1
    // call search function here
    search()
})
const resultDiv = document.querySelector('#resultDiv');
// get Select color element================================================
const selectColor = document.querySelector('#colorSelect')

 // get Select Category element=================================================
 const selectCategory = document.querySelector('#categorySelect')

 // get Select per-page element=================================================
 const selectPerPage = document.querySelector('#perPageSelect')

  // get Page number Input=================================================
  const pageNumInput = document.querySelector('#pageNumInp')

// get next Button=================================================
const nextBtn = document.querySelector('#nextBtn')
    
// get prev button=================================================
const prevBtn = document.querySelector('#prevBtn')  

    
// get pagging  navbar=================================================
const paggingNav = document.querySelector('#paggingNav')  
 

// addEventListener to selectColor so it will run search after changing the color Directly
selectColor.addEventListener(`change`, () => {
    search();

  });
   
    // addEventListener to selectCategory so it will run search after changing the category Directly
    selectCategory.addEventListener(`change`, () => {
        search()
    
    });
    // addEventListener to selectPerPage so it will run search after changing the per-page Directly
    selectPerPage.addEventListener(`change`, () => {
    search();

});

// add keyup listener to page number input
pageNumInput.addEventListener('keyup', e => {
    if (e.keyCode === 13){
        search();
    }
})

// add change event listener to page number input
pageNumInput.addEventListener(`change`, () => {
    search()
})

// add click event listener to next page
nextBtn.addEventListener('click', e => {
    e.preventDefault();
    const pageNum = parseInt(pageNumInput.value) ;
    pageNumInput.value = pageNum +1;
    search()
 })

 // add click event listener to prev button
 prevBtn.addEventListener('click', e => {
    e.preventDefault();
    const pageNum = parseInt(pageNumInput.value) ;
    pageNumInput.value = pageNum -1;
    search()
 })

 // the following variable represent about the number of search  result
 let resultNumber = 0;


// search function

function search (){

// check page number value
if (parseInt(pageNumInput.value) > 1) {
    prevBtn.parentElement.classList.remove('disabled')
}else {
    prevBtn.parentElement.classList.add('disabled')
}


    // console.log(selectColor.value);
    const keyWord = searchInput.value
    const url = ' https://pixabay.com/api/?key=12000491-41fc68d8c365df909e022ceb6&q=' + keyWord + (selectColor.value ? '&colors= '  + selectColor.value : ' ')  + (selectCategory.value ? '&category= '  + selectCategory.value : ' ') + (selectPerPage.value ? '&per_page= '  + selectPerPage.value : ' ') +(pageNumInput.value ? '&page=' + pageNumInput.value : ' ')

    fetch(url).then(response => {

        // check response code
        if(response.status === 200) {
            response.json().then(data => {
                // data to deal with
                console.log(data.hits);

                    // disable / enable next button
                    const pagesNumber = Math.ceil( data . total / parseInt(selectPerPage.value))
                    // console.log(pagesNumber);

                    if(pagesNumber <= parseInt(pageNumInput.value)){
                        nextBtn.parentElement.classList.add('disable')
                    } else {
                        nextBtn.parentElement.classList.remove('disable')
                    }

                // show / hide pagging Nav
                resultNumber = data.total
                if (resultNumber > parseInt(selectPerPage.value)) {
                    paggingNav.classList.remove('d-none')
                } else {
                    paggingNav.classList.add('d-none')
                }

                let cardsElement = ' ';
                data.hits.forEach(hit =>{
                    cardsElement += `<div class="card pr-1 col-md-3" >
                    <img class="card-img-top" src="${hit.previewURL}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${hit.user}</h5>
                        <p class="card-text">${hit.tags}.</p>
                        <a href="#" class="btn btn-primary" onclick=" showModal ('${hit.largeImageURL}')">Show</a>
                    </div>
                </div>`
                });
                resultDiv.innerHTML = cardsElement;
            }).catch(error => {
                console.log(error);
            })
        } else {
            console.log(response.status);
        }
        }).catch(error => {
            console.log(error);
        })
}

}
/**
 * show image modal
 * @param {string} imageUrl 
 */
/*  showModal function*/
function showModal (imageUrl) {
    $('#imageModal').modal('show');
    document.querySelector('#largeImage').src = imageUrl
    }