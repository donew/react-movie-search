import React, {Component} from 'react';
import defaultImage from '.././assets/default-poster.jpg'

class DefaultPoster extends Component {
    render() {
        // Putting each list to state and rerendering every time to keep it refreshed
        this.setMovieState = () => {
            this.state = ({
                title: this.props.movieDetail.Title,
                year: this.props.movieDetail.Year,
                id: this.props.movieDetail.imdbID,
                type: this.props.movieDetail.Type,
                image: this.props.movieDetail.Poster,
                actors: this.props.movieDetail.Actors
            })
        }
        return (
            //Common Container of movies Details/List 
            // Article will have flexible class in case we need to show list or single.
            <article
                className={this.props.isDefault
                ? ''
                : 'list'}>

                {this.setMovieState()}
                <section data-ref={this.state.id}>
                    <h2>{this.state.title}</h2>
                    {/*Default image and movie poster
                    'Poster' is default search term for default image check
                    */}
                    <img
                        src={this.state.image === "N/A"
                        ? defaultImage
                        : this.state.image}
                        title={this.state.title}
                        alt={this.state.title}/>
                    <ul>
                        <li className="title">{this.state.title}</li>
                        <li>{this.state.year}</li>
                        <li>{this.state.actors}</li>
                    </ul>
                </section>
            </article>
        );
    }
}

export default DefaultPoster;