import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import qwest from "qwest";
import { Grid, Card, CircularProgress } from "@material-ui/core";

const api = {
  baseUrl: "https://api.soundcloud.com",
  client_id: "caf73ef1e709f839664ab82bef40fa96"
};

class InfiniteList extends Component {
  state = {
    tracks: [],
    hasMoreItems: true,
    nextHref: null
  };

  loadItems = page => {
    var self = this;

    var url = api.baseUrl + "/users/8665091/favorites";
    if (this.state.nextHref) {
      url = this.state.nextHref;
    }

    qwest
      .get(
        url,
        {
          client_id: api.client_id,
          linked_partitioning: 1,
          page_size: 10
        },
        {
          cache: true
        }
      )
      .then(function(xhr, resp) {
        if (resp) {
          var tracks = self.state.tracks;
          resp.collection.map(track => {
            if (track.artwork_url == null) {
              track.artwork_url = track.user.avatar_url;
            }

            tracks.push(track);
            return track;
          });

          if (resp.next_href) {
            self.setState({
              tracks: tracks,
              nextHref: resp.next_href
            });
          } else {
            self.setState({
              hasMoreItems: false
            });
          }
        }
      });
  };

  render() {
    const loader = (
      <div className="w-full text-center p-6" key="loader">
        <CircularProgress variant="indeterminate"></CircularProgress>
      </div>
    );

    var items = [];
    this.state.tracks.map((track, i) => {
      items.push(
        <Grid
          item
          lg={3}
          md={3}
          xs={12}
          sm={6}
          className="track"
          key={track.title}
        >
          <Card className="p-4 flex justify-center h-full" elevation={6}>
            <a href={track.permalink_url} className="text-center">
              <img
                src={track.artwork_url}
                className="border-radius-circle h-148 w-148"
                alt="albutm cover"
              />
              <p className="caption">{track.title}</p>
            </a>
          </Card>
        </Grid>
      );
      return track;
    });

    return (
      <div className="p-8 h-full-screen scroll-y">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems}
          hasMore={this.state.hasMoreItems}
          loader={loader}
          useWindow={false}
        >
          <Grid container spacing={2}>
            {items}
          </Grid>
        </InfiniteScroll>
      </div>
    );
  }
}

export default InfiniteList;
