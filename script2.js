
let key='77d3a9a44835177590d6fda42991e44e';
const baseUrl='https://api.themoviedb.org/3';
let trailerKey='AIzaSyAUXFm6cVpGgUHzcAT6ouVh0xX5DsYf8t0';
const utubeUrl=`https://www.youtube.com/watch?v=`;
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
    fetchById:(id)=>{`${baseUrl}/movie/movie_id/videos?api_key=${key}`},
    fetchSimilarMovies:(id)=>{`${baseUrl}/movie/similar?api_key=${key}`},
    fetchList:(id)=>`${baseUrl}/discover/movie?api_key=${key}&with_genres=${id}`,
    imgPath:`https://image.tmdb.org/t/p/original`,
    movieTrailerUrl:(mviQuery,title)=>`${baseUrl}/movie/${mviQuery}/videos?language=${title}`,
}
  function load(){
    trendingMovies();
    allcategoriesMovies(apiPaths.fetchTopRated,"Top Rated");
    allCategories();
    }
function trendingMovies(){
  allcategoriesMovies(apiPaths.fetchTrending,"Trending Now")
  .then(List=>{
    const ranInd=parseInt(Math.random()*(List.length))
    bannerSection(List[ranInd]);
  }).catch(err=>{
    console.error(err);
  })
}

async function bannerSection(movie){console.log(movie)
    await fetch( `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=${movie.original_title}`,options)
    .then(res=>res.json())
    .then(res=>{console.log(res)
      const bnr_content=document.getElementById('banner-content');
      const bnr=document.getElementById('bnr-cnt');
      bnr.style.backgroundImage=`url(${apiPaths.imgPath}${movie.backdrop_path})`;
      setTimeout(()=>document.getElementById('bnrvdo1').src=`https://www.youtube.com/embed/${res.results[0].key}?autoplay=1&mute=1`,3000); 
      setInterval(()=>document.getElementById('bnrvdo1').src=`https://www.youtube.com/embed/${res.results[0].key}?autoplay=1&mute=1`,15000); 
      // bnr.innerHTML=`<iframe width="245px" height="150px" src="https://www.youtube.com/watch?v=${res.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      
      const div=document.createElement('div');
      div.innerHTML=` 
                 <div class="banner-fadeTop"></div>
                 <h2 class="banner-title">${movie.title}</h2>
                 <p class="banner-info">Trending in movies | Released-${movie.release_date}</p>
                 <p class="banner-overview">${movie.overview && movie.overview.length >100? movie.overview.trim()+'...':movie.overview}</p>
                 <div class="action-buttons-cont">
                     <button class="action-button"><i class="bi bi-play-fill"></i>&nbsp;&nbsp;Play</button>
                     <button class="action-button"><i class="bi bi-info-circle"></i>&nbsp;&nbsp;More Info</button>
                 </div>
                 <div class="banner-fadeBottom"></div>
                 `;
             bnr_content.append(div);
    })
    //   let videoIdd=res.results[0].key;
     const bnr=document.getElementById('bnr-cnt');
     bnr.style.backgroundImage
    //  const div1=document.createElement('div');
    //  div.innerHTML=`<iframe width="245px" height="150px" src="https://www.youtube.com/watch?v=wrhDc_SuqQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    //  elements.append(div1);
    
    
}
//fetching all type of moveies.....
    function allCategories(){
        fetch(apiPaths.fetchAllCategories)
            .then(res=>res.json()).then(res=>{
                const categories=res.genres;
                if(Array.isArray(categories) && categories.length){
                    categories.forEach.slice(0.1)(category=>{
                        allcategoriesMovies(apiPaths.fetchList(category.id),category.name);
                    })   
                }
        }).catch(err=>console.log(err));
    }

    //creating list of all movies according to their types...
    function allcategoriesMovies(Url,categoryName){
        return fetch(Url)
       .then(res=>res.json()).then(res=>{
         const movies=res.results;
         if(Array.isArray(movies) && movies.length){
            buildMoviesSection(movies.slice(0,2),categoryName);
         return movies;
          }
        }).catch(err=>console.log(err));
    }

   // placing movies in html dynamically...
     function buildMoviesSection(moviesList,categoryName){
            const moviesCon=document.getElementById('movies-cont');
            const movielist=moviesList.map(item=>{
              return `
              <div class='movie-item'  onmouseenter="movieTrailer('${item.id}','${item.title}','yt${item.id}','y${item.id}')">
              <img class="movie-item-img" src="${apiPaths.imgPath}${item.backdrop_path}" alt="${item.title}">
              <div id='titl'>'${item.title}'</div>
              <div class="mvi-play"  onmouseleave="stop('yt${item.id}')"> 
              <div class='' ><img id='y${item.id}' class="immg movie-item-img" src="${apiPaths.imgPath}${item.backdrop_path}" alt="${item.title}"></div>
              <iframe id='yt${item.id}' src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
               </div>`;
            }).join('');
           const movieSessionHtml=` 
                                          <h2 class="movies-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
                                          <div class="movies-row">
                                              ${movielist}
                                           </div>`;
           const el=document.createElement('div');
           el.className='movies-section';
           el.innerHTML=movieSessionHtml;
           moviesCon.append(el);
     }
      async function movieTrailer(movieName,title,iframeId,imag){
        if(!movieName) return;
       await fetch( apiPaths.movieTrailerUrl(movieName,title),options)
        .then(res=>res.json())
        .then(res=>{ 
          let videoIdd=res.results[0].key;
          document.getElementById(imag).scr=`url("")`;
          let youTubeUrl=`https://www.youtube.com/embed/${videoIdd}`;console.log(youTubeUrl)
          setTimeout(()=>document.getElementById(imag).src=''),5000;
           document.getElementById(iframeId).src=`https://www.youtube.com/embed/${videoIdd}?autoplay=1&mute=1`;
          // window.open(youTubeUrl,'_blank');
          // const div=document.createElement('div');
          // div.innerHTML=`<iframe width="245px" height="150px" src="https://www.youtube.com/watch?v=${res.items[0].id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
          // elements.append(div);
        })
        .catch(err=>console.log(err));

      }
      function stop(iframeId){
        document.getElementById(iframeId).src=``;
      }


window.addEventListener('load',function(){
    load();
    window.addEventListener('scroll',()=>{
      const hdr=document.getElementById('header');
      if(this.window.scrollY>5){
        hdr.classList.add('black-bg')
      }else hdr.classList.remove('black-bg');
    })
})

