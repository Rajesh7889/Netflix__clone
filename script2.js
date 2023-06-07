let key='77d3a9a44835177590d6fda42991e44e';
const baseUrl='https://api.themoviedb.org/3';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2QzYTlhNDQ4MzUxNzc1OTBkNmZkYTQyOTkxZTQ0ZSIsInN1YiI6IjY0NzU2ZjBjYzI4MjNhMDBjNDIxNzFjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XXCQz5IO_7qSJQWCO6dWKi0SzDe17Y8Yw8j4udPEppk'
    }
  };
const apiPaths={
    fetchAllCategories:`${baseUrl}/genre/movie/list?api_key=${key}`,
    fetchTrending:`${baseUrl}/trending/movie/day?api_key=${key}`,
    fetchLatest:`${baseUrl}/movie/latest?api_key=${key}`,
    fetchTopRated:`${baseUrl}/movie/top_rated?api_key=${key}`,
    fetchVideos:`${baseUrl}/movie/videos?api_key=${key}`,
    fetchTV:`${baseUrl}//genre/tv/list?api_key=${key}`,
    fetchById:(id)=>{`${baseUrl}/movie/movie_id/videos?api_key=${key}`},
    fetchSimilarMovies:(id)=>{`${baseUrl}/movie/similar?api_key=${key}`},
    fetchList:(id)=>`${baseUrl}/discover/movie?api_key=${key}&with_genres=${id}`,
    imgPath:`https://image.tmdb.org/t/p/original`,
}
  function load(){
    allCategories();
    }

//fetching all type of moveies.....
    function allCategories(){
        fetch(apiPaths.fetchAllCategories,options)
            .then(res=>res.json()).then(res=>{
                const categories=res.genres;
                if(Array.isArray(categories) && categories.length){
                    categories.forEach(category=>{
                        allcategoriesMovies(apiPaths.fetchList(category.id),category);
                    })   
                }
        }).catch(err=>console.log(err));
    }

    //creating list of all movies according to their types...
    function allcategoriesMovies(Url,category){
       fetch(Url)
       .then(res=>res.json()).then(res=>{
         const movies=res.results;
         if(Array.isArray(movies) && movies.length){
            buildMoviesSection(movies,category.name);
         }
        }).catch(err=>console.log(err));
         
    }

    //placing movies in html dynamically...
     function buildMoviesSection(moviesList,categoryName){
            const moviesCon=document.getElementById('movie-containor');
            const movielist=moviesList.map(item=>{
              return `<img class="movies-img " src="${apiPaths.imgPath}${item.backdrop_path}" alt="${item.title}">`;
            }).join('');
           const movieSessionHtml=`
                                   <div class="row movie-session">
                                      <div class="col-12">
                                         <h4 class="movie-session-heading ">${categoryName} <span class="explore">Explore All</span></h4>
                                         </div>
                                      </div>
                                   <div class="row movies-row ">
                                     <div class="col-2 ">${movielist}</div>
                                   </div>`;
           const el=document.createElement('div');
           el.className='session';
           el.innerHTML=movieSessionHtml;
           moviesCon.append(el);
     }



window.addEventListener('load',function(){
    load();
})