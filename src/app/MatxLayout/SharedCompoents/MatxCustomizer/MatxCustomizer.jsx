import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  setLayoutSettings,
  setDefaultSettings
} from "app/redux/actions/LayoutActions";
import PropTypes from "prop-types";
import {
  Icon,
  IconButton,
  Button,
  FormGroup,
  Tooltip,
  Switch,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Link
} from "@material-ui/core";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import Scrollbar from "react-perfect-scrollbar";
import { merge, get, set } from "lodash";
import Layout1Customizer from "./Layout1Customizer";
import Layout2Customizer from "./Layout2Customizer";
import { themeColors } from "../../MatxTheme/themeColors";
import BadgeSelected from "./BadgeSelected";
import { mainThemes, topbarThemes } from "./customizerOptions";
import { classList } from 'utils';

const styles = theme => ({
  label: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.dark,
    fontWeight: 700,
    transform: "rotate(90deg)",
    marginBottom: "2.5rem",
    padding: ".25rem .5rem",
    borderRadius: "4px",
    cursor: "pointer",
    letterSpacing: "1.5px",
    fontSize: "1rem",
    "&:hover, &.open": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    }
  },
  helpText: {
    margin: "0px .5rem 1rem",
  }
});

const MatxCustomizer = props => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  let { settings, classes, setLayoutSettings, setDefaultSettings } = props;

  const demoLayouts = [
    {
      name: "Light Sidebar",
      thumbnail: "/assets/images/screenshots/layout1-customizer.png",
      isPro: false,
      options: {
        activeLayout: "layout1",
        activeTheme: "blue",
        layout1Settings: {
          leftSidebar: {
            theme: "whiteBlue",
            bgOpacity: 0.98
          },
          topbar: {
            theme: "blueDark",
            fixed: true
          }
        },
        footer: {
          theme: "slateDark1"
        }
      }
    },
    {
      name: "Dark Sidebar",
      thumbnail: "/assets/images/screenshots/layout1-blue-customizer.png",
      isPro: false,
      options: {
        activeLayout: "layout1",
        activeTheme: "blue",
        layout1Settings: {
          leftSidebar: {
            theme: "slateDark1",
            bgOpacity: 0.92
          },
          topbar: {
            theme: "blueDark",
            fixed: true
          }
        }
      }
    },
    {
      name: "Dark Theme",
      thumbnail: "/assets/images/screenshots/layout3-customizer.png",
      isPro: false,
      options: {
        activeLayout: "layout1",
        activeTheme: "purpleDark1",
        layout1Settings: {
          leftSidebar: {
            theme: "slateDark1",
            bgOpacity: 0.92
          },
          topbar: {
            theme: "purpleDark1",
            fixed: true
          }
        },
        footer: {
          theme: "slateDark1"
        }
      }
    },
    {
      name: "Horizontal Navigation",
      thumbnail: "/assets/images/screenshots/layout4-customizer.png",
      isPro: true,
      options: {
        activeLayout: "layout2",
        activeTheme: "purple1",
        layout2Settings: {
          mode: "full"
          // topbar: {
          //   theme: "slateDark1"
          // }
        },
        footer: {
          theme: "slateDark1"
        }
      }
    }
  ];

  const updateSettings = newSettings => {
    let updatedSettings = merge({}, settings, newSettings);
    setLayoutSettings(updatedSettings);
    setDefaultSettings(updatedSettings);
  };

  const handleChange = (name, value) => {
    let { settings } = props;
    let updatedSettings = set(settings, name, value);

    updateSettings(updatedSettings);
  };

  const handleControlChange = name => event => {
    let controlValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    handleChange(name, controlValue);
  };

  const tooglePanel = () => {
    setOpen(!open);
  };
  const handleTabChange = index => {
    setTabIndex(index);
  };

  let activeTheme = { ...settings.themes[settings.activeTheme] };

  return (
    <Fragment>
      <Tooltip title="Theme Settings" placement="left">
        <span
          className={`${classes.label} ${classList({open})}`}
          onClick={tooglePanel}
        >
          DEMOS
          {/* <Icon className="spin">settings</Icon> */}
        </span>
      </Tooltip>

      {open && (
        <ThemeProvider theme={activeTheme}>
          <div
            className={`matx-customizer pb-8 ${classes.root}`}
            style={{
              backgroundColor: activeTheme.palette.background.default
            }}
          >
            <div className="flex felx-row items-center px-5 py-4 mb-4 min-h-64 elevation-z6">
              <Icon color="primary">settings</Icon>
              <h5 className="mb-0 ml-2">Theme Settings</h5>
              <IconButton onClick={tooglePanel} className="customizer-close">
                <Icon>close</Icon>
              </IconButton>
            </div>
            <div className="px-6 mb-4 flex">
              <Button
                variant="outlined"
                color={tabIndex === 0 ? "secondary" : "primary"}
                onClick={() => handleTabChange(0)}
                className="mr-4"
              >
                Demos
              </Button>
              <Button
                variant="outlined"
                color={tabIndex === 1 ? "secondary" : "primary"}
                onClick={() => handleTabChange(1)}
              >
                Settings
              </Button>
            </div>

            <Scrollbar options={{ suppressScrollX: true }} className="px-4">
              {tabIndex === 0 && (
                <div className="mb-8 mx-2">
                  <div className="text-muted">Layouts</div>

                  <div className="layout-boxes">
                    {demoLayouts.map(layout => (
                      <BadgeSelected
                        color="secondary"
                        className="layout-box"
                        badgeContent={"Pro"}
                        invisible={!layout.isPro}
                        key={layout.name}
                      >
                        <Paper
                          onClick={() => updateSettings(layout.options)}
                          elevation={4}
                        >
                          <span className="layout-name">
                            <Button variant="contained" color="secondary">
                              {layout.name}
                            </Button>
                          </span>

                          <img src={layout.thumbnail} alt={layout.name} />
                        </Paper>
                      </BadgeSelected>
                    ))}
                  </div>
                </div>
              )}

              {/* END LAYOUT */}

              {tabIndex === 1 && (
                <div>
                  <div className={classes.helpText}>
                    Set different themes to body, topbar, sidebar, 
                    footer & etc. Check out the <Link href="http://demos.ui-lib.com/matx-react-doc/layout.html" target="_blank">Documentation</Link>
                  </div>
                  <div className="mb-4 mx-2">
                    <div className="text-muted mb-4">Main theme</div>
                    <div className="colors">
                      {mainThemes.map((color, i) => (
                        <Tooltip key={i} title={color} placement="top">
                          <div
                            className="color"
                            onClick={() =>
                              updateSettings({ activeTheme: color })
                            }
                            style={{
                              backgroundColor:
                                themeColors[color].palette.primary.main
                            }}
                          >
                            {settings.activeTheme === color && (
                              <Icon>done</Icon>
                            )}
                            <div
                              className={settings.themes[color].palette.type}
                            ></div>
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  {settings.activeLayout === "layout1" && (
                    <Layout1Customizer
                      settings={settings}
                      handleChange={handleChange}
                      handleControlChange={handleControlChange}
                    />
                  )}

                  {settings.activeLayout === "layout2" && (
                    <Layout2Customizer
                      settings={settings}
                      handleChange={handleChange}
                      handleControlChange={handleControlChange}
                    />
                  )}

                  <div className="mx-2 mb-6">
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Footer</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={get(settings.footer, "show")}
                              onChange={handleControlChange("footer.show")}
                            />
                          }
                          label="Show"
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              checked={get(
                                settings.layout1Settings.footer,
                                "fixed"
                              )}
                              onChange={handleControlChange("footer.fixed")}
                            />
                          }
                          label="Fixed"
                        />
                      </FormGroup>
                    </FormControl>
                  </div>

                  <div className="mx-2 mb-6">
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Secondary sidebar
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={get(settings.secondarySidebar, "show")}
                              onChange={handleControlChange(
                                "secondarySidebar.show"
                              )}
                            />
                          }
                          label="Show"
                        />
                      </FormGroup>
                    </FormControl>
                  </div>

                  <div className="mb-4 mx-2">
                    <div className="text-muted mb-4">
                      Secondary sidebar theme
                    </div>
                    <div className="colors">
                      {topbarThemes.map((color, i) => (
                        <Tooltip key={i} title={color} placement="top">
                          <div
                            className="color"
                            onClick={() =>
                              handleChange("secondarySidebar.theme", color)
                            }
                            style={{
                              backgroundColor:
                                themeColors[color].palette.primary.main
                            }}
                          >
                            {settings.secondarySidebar.theme === color && (
                              <Icon>done</Icon>
                            )}
                            <div
                              className={settings.themes[color].palette.type}
                            ></div>
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 mx-2">
                    <div className="text-muted mb-4">Footer theme</div>
                    <div className="colors">
                      {topbarThemes.map((color, i) => (
                        <Tooltip key={i} title={color} placement="top">
                          <div
                            className="color"
                            onClick={() => handleChange("footer.theme", color)}
                            style={{
                              backgroundColor:
                                themeColors[color].palette.primary.main
                            }}
                          >
                            {settings.footer.theme === color && (
                              <Icon>done</Icon>
                            )}
                            <div
                              className={settings.themes[color].palette.type}
                            ></div>
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Scrollbar>
          </div>
        </ThemeProvider>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.layout.settings,
  setLayoutSettings: PropTypes.func.isRequired,
  setDefaultSettings: PropTypes.func.isRequired
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { setLayoutSettings, setDefaultSettings })(
    MatxCustomizer
  )
);
