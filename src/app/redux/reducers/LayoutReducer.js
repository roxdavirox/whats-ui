import {
  SET_LAYOUT_SETTINGS,
  SET_DEFAULT_LAYOUT_SETTINGS,
  SET_PERFECT_SCROLLBAR
} from "../actions/LayoutActions";
import { MatxLayoutSettings } from "../../MatxLayout/settings";

const initialState = {
  settings: {
    ...MatxLayoutSettings
  },
  defaultSettings: {
    ...MatxLayoutSettings
  }
};

const LayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LAYOUT_SETTINGS:
      return {
        ...state,
        settings: { ...action.data }
      };
    case SET_DEFAULT_LAYOUT_SETTINGS:
      return {
        ...state,
        defaultSettings: { ...action.data }
      };
    case SET_PERFECT_SCROLLBAR:
      return {
        ...state,
        settings: {
          ...state.settings,
          perfectScrollbar: action.perfectScrollbar
        }
      };
    default:
      return { ...state };
  }
};

export default LayoutReducer;
