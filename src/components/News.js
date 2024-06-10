import React, { Component } from "react";
import { useParams } from "react-router-dom";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };

    this.articleUrls = new Set(); // Track unique article URLs

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - DailyNews`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    await this.fetchNews();
    this.props.setProgress(100);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      document.title = `${this.capitalizeFirstLetter(
        this.props.category
      )} - DailyNews`;
      this.setState({ page: 1, articles: [], loading: true });
      this.articleUrls.clear(); // Clear the article URLs set for new category
      this.props.setProgress(10);
      await this.fetchNews();
      this.props.setProgress(100);
    }
  }

  async fetchNews(page = this.state.page) {
    const { category, pageSize, setProgress } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f1e66d62082d4df591269b61f8e04aa0&page=${page}&pageSize=${pageSize}`;
    if (category) {
      url += `&category=${category}`;
    }
    setProgress(30);

    try {
      const response = await fetch(url);
      setProgress(50);
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        this.setState({ loading: false });
        setProgress(100);
        return;
      }
      const data = await response.json();
      setProgress(70);

      const newArticles = data.articles.filter(
        (article) => !this.articleUrls.has(article.url)
      );
      newArticles.forEach((article) => this.articleUrls.add(article.url));

      this.setState({
        articles: this.state.articles.concat(newArticles),
        totalResults: data.totalResults,
        loading: false,
      });
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
      setProgress(100);
    }
  }

  fetchMoreData = () => {
    this.setState({ page: this.state.page + 1 }, () => this.fetchNews());
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ marginTop: "80px" }}>
          DailyNews - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={
                      element.title ? element.title.slice(0, 45) : "No Title"
                    }
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : "No Description"
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
        </InfiniteScroll>
      </div>
    );
  }
}

const CategoryNews = () => {
  const { categoryName } = useParams();
  return <News pageSize={5} category={categoryName} setProgress={() => {}} />;
};

export default CategoryNews;

// Inline CSS styles
const styles = `
  .App {
    text-align: center;
  }
  
  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }
  
  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }
  
  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    position: sticky; /* Make the header sticky */
    top: 0; /* Stick it to the top */
    z-index: 1000; /* Ensure it appears above other content */
    padding-top: 20px; /* Add some`;
