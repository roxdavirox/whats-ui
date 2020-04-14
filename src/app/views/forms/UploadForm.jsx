import React, { Component } from "react";
import { Breadcrumb, SimpleCard, MatxProgressBar } from "matx";
import { Fab, Icon, Card, Grid, Divider, Button } from "@material-ui/core";

class UploadForm extends Component {
  state = {
    dragClass: "",
    files: [],
    statusList: [],
    queProgress: 0
  };

  handleFileSelect = event => {
    let files = event.target.files;
    let list = [];

    for (const iterator of files) {
      list.push({
        file: iterator,
        uploading: false,
        error: false,
        progress: 0
      });
    }

    this.setState({
      files: [...list]
    });
  };

  handleDragOver = event => {
    event.preventDefault();
    this.setState({ dragClass: "drag-shadow" });
  };

  handleDrop = event => {
    event.preventDefault();
    event.persist();

    let files = event.dataTransfer.files;
    let list = [];

    for (const iterator of files) {
      list.push({
        file: iterator,
        uploading: false,
        error: false,
        progress: 0
      });
    }

    this.setState({
      dragClass: "",
      files: [...list]
    });

    return false;
  };

  handleDragStart = event => {
    this.setState({ dragClass: "drag-shadow" });
  };

  handleSingleRemove = index => {
    let files = [...this.state.files];
    files.splice(index, 1);
    this.setState({
      files: [...files]
    });
  };

  handleAllRemove = () => {
    this.setState({ files: [], queProgress: 0 });
  };

  uploadSingleFile = index => {
    let allFiles = [...this.state.files];
    let file = this.state.files[index];

    allFiles[index] = { ...file, uploading: true, error: false };

    this.setState({
      files: [...allFiles]
    });
  };

  uploadAllFile = () => {
    let allFiles = [];

    this.state.files.map(item => {
      allFiles.push({
        ...item,
        uploading: true,
        error: false
      });

      return item;
    });

    this.setState({
      files: [...allFiles],
      queProgress: 35
    });
  };

  handleSingleCancel = index => {
    let allFiles = [...this.state.files];
    let file = this.state.files[index];

    allFiles[index] = { ...file, uploading: false, error: true };

    this.setState({
      files: [...allFiles]
    });
  };

  handleCancelAll = () => {
    let allFiles = [];

    this.state.files.map(item => {
      allFiles.push({
        ...item,
        uploading: false,
        error: true
      });

      return item;
    });

    this.setState({
      files: [...allFiles],
      queProgress: 0
    });
  };

  render() {
    let { dragClass, files, queProgress } = this.state;
    let isEmpty = files.length === 0;

    return (
      <div className="upload-form m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[{ name: "Others", path: "/" }, { name: "Upload" }]}
          />
        </div>
        <SimpleCard title="File Upload">
          <div className="flex flex-wrap mb-6">
            <label htmlFor="upload-single-file">
              <Fab
                className="capitalize"
                color="primary"
                component="span"
                variant="extended"
              >
                <div className="flex items-center">
                  <Icon className="pr-8">cloud_upload</Icon>
                  <span>Single File</span>
                </div>
              </Fab>
            </label>
            <input
              className="hidden"
              onChange={this.handleFileSelect}
              id="upload-single-file"
              type="file"
            />
            <div className="px-4"></div>
            <label htmlFor="upload-multiple-file">
              <Fab
                className="capitalize"
                color="primary"
                component="span"
                variant="extended"
              >
                <div className="flex items-center">
                  <Icon className="pr-8">cloud_upload</Icon>
                  <span>Multiple File</span>
                </div>
              </Fab>
            </label>
            <input
              className="hidden"
              onChange={this.handleFileSelect}
              id="upload-multiple-file"
              type="file"
              multiple
            />
          </div>

          <div
            className={`${dragClass} upload-drop-box mb-6 flex justify-center items-center`}
            onDragEnter={this.handleDragStart}
            onDragOver={this.handleDragOver}
            onDrop={this.handleDrop}
          >
            {isEmpty ? (
              <span>Drop your files here</span>
            ) : (
              <h5 className="m-0">
                {files.length} file{files.length > 1 ? "s" : ""} selected...
              </h5>
            )}
          </div>

          <Card className="mb-6" elevation={2}>
            <div className="p-4">
              <Grid
                container
                spacing={2}
                justify="center"
                alignItems="center"
                direction="row"
              >
                <Grid item lg={4} md={4}>
                  Name
                </Grid>
                <Grid item lg={1} md={1}>
                  Size
                </Grid>
                <Grid item lg={2} md={2}>
                  Progress
                </Grid>
                <Grid item lg={1} md={1}>
                  Status
                </Grid>
                <Grid item lg={4} md={4}>
                  Actions
                </Grid>
              </Grid>
            </div>
            <Divider></Divider>

            {isEmpty && <p className="px-4">Que is empty</p>}

            {files.map((item, index) => {
              let { file, uploading, error, progress } = item;
              return (
                <div className="px-4 py-4" key={file.name}>
                  <Grid
                    container
                    spacing={2}
                    justify="center"
                    alignItems="center"
                    direction="row"
                  >
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      {file.name}
                    </Grid>
                    <Grid item lg={1} md={1} sm={12} xs={12}>
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                      <MatxProgressBar value={progress}></MatxProgressBar>
                    </Grid>
                    <Grid item lg={1} md={1} sm={12} xs={12}>
                      {error && <Icon color="error">error</Icon>}
                      {/* {uploading && <Icon className="text-green">done</Icon>} */}
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <div>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          disabled={uploading}
                          onClick={() => this.uploadSingleFile(index)}
                        >
                          Upload
                        </Button>
                        <Button
                          className="mx-2"
                          size="small"
                          variant="contained"
                          disabled={!uploading}
                          color="secondary"
                          onClick={() => this.handleSingleCancel(index)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          className="bg-error"
                          onClick={() => this.handleSingleRemove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </Card>

          <div>
            <p className="m-0">Queue progress:</p>
            <div className="py-4">
              <MatxProgressBar value={queProgress}></MatxProgressBar>
            </div>
            <div className="flex">
              <Button
                variant="contained"
                color="primary"
                disabled={isEmpty}
                onClick={this.uploadAllFile}
              >
                Upload All
              </Button>
              <Button
                className="mx-2"
                variant="contained"
                color="secondary"
                disabled={isEmpty}
                onClick={this.handleCancelAll}
              >
                Cancel All
              </Button>
              {!isEmpty && (
                <Button
                  variant="contained"
                  className="bg-error"
                  onClick={this.handleAllRemove}
                >
                  Remove All
                </Button>
              )}
            </div>
          </div>
        </SimpleCard>
      </div>
    );
  }
}

export default UploadForm;
