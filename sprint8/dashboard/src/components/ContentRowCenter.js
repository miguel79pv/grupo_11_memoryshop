import React from 'react';
import LastMovieInDb from './LastMovieInDb';
import GenresInDb from './MarcasInDb';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Product in DB -->*/}
            <LastMovieInDb />
            {/*<!-- End content row last product in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <GenresInDb />

        </div>
    )
}

export default ContentRowCenter;