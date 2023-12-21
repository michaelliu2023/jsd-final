
const uniSearch = {


    dom: {},
  
   
    initUi(){
  
      this.dom = {
        searchForm:     document.querySelector( '#searchForm' ),
        searchText:     document.querySelector( '#searchText' ),
        searchResults:  document.querySelector( '#results' ),
        pageDetails:    document.querySelector( '#details' ),
       
        backToResults:  document.querySelector( '#backToResults' ),
  
      };
  

      this.dom.searchForm.addEventListener('submit',  ev => {

        ev.preventDefault(); // Stop form from causing a page reload
        this.loadSearchResults( this.dom.searchText.value );      
      }); // submit event
  
      this.dom.searchText.focus();
  


      this.dom.searchResults.addEventListener('click', ev =>{
        
      
        if( ev.target.nodeName === 'H2' ){
          this.loadPageDetails(ev.target.innerHTML);
          

        }
      });
  
  
      this.dom.backToResults.addEventListener( 'click', ev => {
        ev.preventDefault();
        this.dom.searchResults.style.display = 'block';
        this.dom.backToResults.style.display = 'none';
        this.dom.pageDetails.style.display = 'none';
      });
  

    }, // initUi()
  

    loadSearchResults( searchText ){
  

      this.dom.searchResults.style.display = 'block';
  
      this.dom.pageDetails.style.display = 'none';
      this.dom.backToResults.style.display = 'none';
  
      this.dom.searchResults.replaceChildren(); // clear
      
  
      const loadingNode = document.createElement( 'p' );
      loadingNode.innerHTML = "Loading search results...";
      this.dom.searchResults.appendChild( loadingNode );
  
  
      
      axios.get(`http://universities.hipolabs.com/search?name=${searchText}&limit=50`)
        .then( res => {
          
          

          for(const u of res.data ){
 

            
            this.dom.searchResults.innerHTML += `
              <div class="uni">
                <h2>${u.country}</h2>
                <h3> ${u.name}  <a href="${u.web_pages}">${u.web_pages} </h3>
                
              </div>
            `;
            

            
            
          } // each uni
          
         
          
        })
        .catch( err => {
          console.warn( 'Error loading search results', err );
          // TODO: message to user in the DOM
        });
  
    
    }, // this.dom.searchResults
  


    loadPageDetails(title){
     

      
      const url = `https://api.currentsapi.services/v1/search?` +
      `keywords=${title}&language=en&published=2023&` + 
      `apiKey=_IT6V1AI84KwNVusMyqy1eh0ErJj2tRpufRppmQGR5zHTX1P`;
      

      axios.get(url)
        .then( res => {

          this.dom.pageDetails.innerHTML ='';
          for(const page of res.data.news){


            
            this.dom.pageDetails.innerHTML += `
          
            <div class="news">
                  <h2>${page.title}</h2>
                  <h3>${page.author} (${page.category})</h3>
                  <p> ${page.description} </p>
                  <a href="${page.url}">${page.url} </a>
                  
            </div>
  
          `;
          
            }

            this.dom.searchResults.style.display = 'none';
            this.dom.backToResults.style.display = 'block'; // show back button
            this.dom.pageDetails.style.display = 'block'; // unhide

        })
        .catch( err => {
          console.warn( 'Error loading details',  err )
        });
  
    }, // loadPageDetails()
  
  
  }; // uniSearch main app object
  


  uniSearch.initUi();