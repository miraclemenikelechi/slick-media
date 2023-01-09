const Movie = ({ movies }) => {
    return (
        <div className='movie-container'>
            {
                movies.map(function (movie) {
                    const { Title, imdbID, Poster } = movie;
                    return (
                        <div key={imdbID} >
                            <img
                                src={Poster !== "N/A" ?
                                    Poster :
                                    "https://via.placeholder.com/300"}
                                alt={Title} />
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Movie;