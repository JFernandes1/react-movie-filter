import React, { Component } from "react";
import "../styles/styles.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      searchString: "",
      filtered: [],
      genre: [],
      type: "",
      year: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("https://hubspotwebteam.github.io/CodeExercise/src/js/data/data.json")
      .then(response => response.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          data: json.media,
          filtered: json.media,
          genre: json.media.genre,
          year: json.media.genre
        });
      })
      .catch(error => console.log("parsing failed", error));
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({
      searchString: value,
      filtered: this.state.data.filter(e =>
        Object.values(e)
          .join("  ")
          .toLowerCase()
          .match(value)
      )
    });
  }

  render() {
    var { isLoaded, data } = this.state;
    const searchString = this.state.searchString.trim().toLowerCase();
    let text = this.state.data;
    //GENRE
    const genres = this.state.data
      .map(item => item.genre)
      .reduce((acc, val) => acc.concat(val), []);
    const genreSet = [...new Set(genres)];

    //END OF GENRE

    const years = this.state.data
      .map(item => item.year)
      .reduce((acc, val) => acc.concat(val), []);
    years.sort();
    const yearSet = [...new Set(years)];

    if (searchString.length > 0) {
      text = text.filter(info => {
        return info.title.toLowerCase().match(searchString);
      });
    }

    return (
      <div className="movie-container">
        <nav>
          <div className="grid">
            <div className="dropdowns grid__item grid__item--md-span-6">
              <select
                className="select-dropdown"
                name="categories"
                placeholder="genre"
                onChange={this.handleChange}
              >
                {" "}
                <option default value="">
                  Genres
                </option>
                {genreSet.map(genre => (
                  <option value={genre} placeholder="genre">
                    {genre}
                  </option>
                ))}
              </select>
              <select
                className="select-dropdown"
                name="categories"
                onChange={this.handleChange}
              >
                <option default value="">
                  Years
                </option>
                {yearSet.map(year => (
                  <option value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="grid__item grid__item--md-span-6">
              <input
                type="text"
                id="searchbar"
                value={this.state.searchString}
                onChange={this.handleChange}
                placeholder="Search"
                name="device"
              ></input>
            </div>
          </div>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                id="books"
                value={"book"}
                onChange={this.handleChange}
                name="device"
              ></input>
              books
            </label>

            <label>
              <input
                type="radio"
                id="movies"
                value={"movie"}
                onChange={this.handleChange}
                name="device"
              ></input>
              movies
            </label>
          </div>
          <br />
        </nav>
        <div className="grid">
          {this.state.filtered.map(info => (
            <div className="display grid__item grid__item--md-span-3">
              <img className="img-poster" src={info.poster} />
              <br />
              <span className="title"> {info.title} </span>
              <span className="year">({info.year})</span>
              <br />

              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
