import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    const defaultImageUrl =
      "https://images.hindustantimes.com/tech/img/2024/04/22/1600x900/GTA_6_launch_5_things_inspired_by_San_Andreas_that_1713767161268_1713767161846.jpg";

    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={imageUrl || defaultImageUrl}
            className="card-img-top"
            onError={(e) => {
              e.target.src = defaultImageUrl; // Replace with default image on error
            }}
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
              rel="noreferrer"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
