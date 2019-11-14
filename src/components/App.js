import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.search = this.search.bind(this);
  }

  fetch() {
    axios.get("http://localhost:9090/posts").then(response => {
      this.setState({ posts: response.data.reverse() });
    });
  }

  componentDidMount() {
    this.fetch();
  }

  search(text) {
    axios.get(`http://localhost:9090/posts?q=${encodeURI(text)}`).then(res => {
      this.setState({ posts: res.data.reverse() });
    });
  }

  updatePost(id, text) {
    axios
      .put(`http://localhost:9090/posts/${id}`, { text })
      .then(() => this.fetch());
  }

  deletePost(id) {
    axios.delete(`http://localhost:9090/posts/${id}`).then(() => this.fetch());
  }

  createPost(text) {
    axios
      .post("http://localhost:9090/posts/", { text })
      .then(() => this.fetch());
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header search={this.search} />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map(post => (
            <Post
              key={post.id}
              id={post.id}
              text={post.text}
              date={post.date}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
