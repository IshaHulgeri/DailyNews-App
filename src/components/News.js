import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    console.log("hello i am constructor from news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1, // Initialize page number
      totalResults: 0, // Initialize totalResults
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=f1e66d62082d4df591269b61f8e04aa0&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handlePrevClick = async () => {
    console.log("Previous");
    if (this.state.page > 1) {
      let prevPage = this.state.page - 1;
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f1e66d62082d4df591269b61f8e04aa0&page=${prevPage}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

      this.setState({
        page: prevPage,
        articles: parsedData.articles,
      });
    }
  };

  handleNextClick = async () => {
    console.log("Next");
    const nextPage = this.state.page + 1;
    const totalPages = Math.ceil(this.state.totalResults / 20); // Calculate total pages

    if (nextPage <= totalPages) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f1e66d62082d4df591269b61f8e04aa0&page=${nextPage}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

      this.setState({
        page: nextPage,
        articles: parsedData.articles,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2>DailyNews - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
