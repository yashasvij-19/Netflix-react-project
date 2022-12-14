import React, { useState } from "react";
import axios from "./axios";
import "./Row.css"
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";

const baseurl = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}){
    const [movies,setMovies] = React.useState([]);
    const [trailerUrl,setTrailerUrl] = useState("");

    React.useEffect(() => {
async function fetchData(){
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
}
fetchData();
    },[fetchUrl])

    const opts = {
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1,
        }
    };

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl('');
        }else{
            movieTrailer(movie?.name || "")
            .then(url => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
            }).catch(error => console.log(error))
        }
    }

    return (
        <div className='row'>
          <h2>{title}</h2>
          <div className = 'row_posters'>
                {movies.map(movie => (
                    <img key={movie.id} onClick={()=>handleClick(movie)} className = {`row_poster ${isLargeRow && "row_posterLarge"}`} src={`${baseurl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
          </div>
          <YouTube videoId={trailerUrl} opts={opts}/>
        </div>
    )
}

export default Row;