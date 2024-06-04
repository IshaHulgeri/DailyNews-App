import React, { Component } from "react";
import { useParams } from "react-router-dom";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchNews();
    }
  }

  async fetchNews() {
    const { category, pageSize } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f1e66d62082d4df591269b61f8e04aa0&page=1&pageSize=${pageSize}`;
    if (category) {
      url += `&category=${category}`;
    }
    this.setState({ loading: true });

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">DailyNews - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const CategoryNews = () => {
  const { categoryName } = useParams();
  return <News pageSize={5} category={categoryName} />;
};

export default CategoryNews;
